"use client";

import { clearAuthModalState, restoreAuthModalState } from "@/app/(common)/_home/_hooks/useCheckAuth";
import { getUser, User } from "@/app/api/getUser";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useUserStore } from "@/stores/useUserStore";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: "onChange" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const initialTokenExists = useRef(false);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const queryClient = useQueryClient();

  type UseFormSetError<T> = (name: keyof T, error: { type: string; message?: string }) => void;

  type FormValues = {
    email: string;
    password: string;
    root?: string;
  };

  type LoginError = {
    field: keyof FormValues | "root";
    message: string;
  };

  const LOGIN_ERROR_MAP: Record<number, LoginError> = {
    401: { field: "password", message: "비밀번호가 아이디와 일치하지 않습니다." },
    404: { field: "email", message: "존재하지 않는 아이디입니다." },
    500: { field: "root", message: "서버 오류가 발생했습니다." },
  };

  const handleLoginError = (error: unknown, setError: UseFormSetError<FormValues>) => {
    // error 객체에서 status 정보를 안전하게 추출
    const err = error as { status?: number; response?: { status?: number } };
    const status = err?.status || err?.response?.status;

    const loginError: LoginError = LOGIN_ERROR_MAP[status as number] || {
      field: "root",
      message: "로그인 중 오류가 발생했습니다.",
    };
    setError(loginError.field as keyof FormValues, {
      type: "manual",
      message: loginError.message,
    });
  };

  // 유효성 검사 스키마 분리
  const validateForm = (data: FormValues) => {
    const errors: Partial<Record<keyof FormValues, string>> = {};

    if (!data.email) {
      errors.email = "아이디를 입력해주세요.";
    }
    if (data.password.length < 8) {
      errors.password = "비밀번호는 최소 8자 이상입니다.";
    }

    return errors;
  };

  // 로그인 성공 처리 로직 분리
  const handleLoginSuccess = async (
    token: string,
    queryClient: QueryClient,
    setUser: (user: User) => void,
    router: ReturnType<typeof useRouter>,
  ) => {
    // 토큰 저장
    document.cookie = `token=${token}; path=/;`;

    try {
      const userInfo = await queryClient.fetchQuery<User>({
        queryKey: ["user"],
        queryFn: getUser,
      });

      // 사용자 정보를 먼저 업데이트한 후 모달 상태 업데이트 및 네비게이션
      const shouldOpenModal = restoreAuthModalState();
      setUser(userInfo);
      if (shouldOpenModal) {
        useUserStore.getState().setShouldOpenCreateModal(true);
      }
      clearAuthModalState();
      router.push("/");
    } catch (error) {
      console.error("유저 정보를 불러오는 중 에러 발생:", error);
      // 에러 발생 시 저장된 토큰 삭제 (만료된 토큰 방지)
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      throw error;
    }
  };

  const handleLogin = async (data: FormValues) => {
    clearErrors();

    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([field, message]) => {
        setError(field as keyof FormValues, { type: "manual", message });
      });
      return;
    }
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    try {
      const result = await postSignIn(data);
      if (result.token) {
        await handleLoginSuccess(result.token, queryClient, setUser, router);
      } else {
        handleLoginError(result, setError);
      }
    } catch (error) {
      handleLoginError(error, setError);
    }
  };

  const postSignIn = async (data: FormValues) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}auths/signin`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    initialTokenExists.current = document.cookie.split(";").some((cookie) => cookie.trim().startsWith("token="));
    if (initialTokenExists.current) {
      alert("비정상적인 접근입니다.");
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
      <div className="flex w-full flex-col lg:max-w-[608px] xl:max-w-[510px]">
        <form onSubmit={handleSubmit(handleLogin)} className="flex w-full flex-col rounded-3xl bg-white p-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                router.push("/");
              }}
            >
              <Image src={"/images/auth_icon.svg"} alt={""} width={50} height={50} />
            </button>
            <p className="text-center text-xl font-semibold text-gray-800">로그인</p>
          </div>
          <div className="m-auto w-full max-w-[500px]">
            <div className="flex flex-col gap-2 pt-8">
              <label htmlFor="email" className="text-sm font-semibold text-gray-800">
                아이디
              </label>
              <Input
                id={"email"}
                type={"email"}
                placeholder="이메일을 입력해주세요."
                register={register("email", { required: "아이디를 입력해주세요." })}
                helperText={errors.email?.message}
              />
            </div>
            <div className="flex flex-col gap-2 pt-6">
              <label htmlFor="password" className="text-sm font-semibold text-gray-800">
                비밀번호
              </label>
              <div className="relative">
                <Input
                  id={"password"}
                  type={passwordVisible ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요."
                  register={register("password", { required: "비밀번호는 최소 8자 이상입니다." })}
                  helperText={errors.password?.message}
                />
                <button
                  type="button"
                  className="absolute right-4 top-[8.8px]"
                  onClick={() => setPasswordVisible((prev) => !prev)}
                >
                  <img
                    src={passwordVisible ? "/images/password_on.svg" : "/images/password_off.svg"}
                    alt="비밀번호 보기 토글"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>
            <Button disabled={!isValid} className="mt-10 w-full" type="submit">
              로그인
            </Button>
            <div className="flex-ro mt-6 flex justify-center">
              <p className="text-[15px] font-medium text-gray-800">모임팟이 처음이신가요?</p>
              <Link
                href={"/sign-up"}
                className="border-b border-primary-color text-[15px] font-medium text-primary-color"
              >
                회원가입
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
