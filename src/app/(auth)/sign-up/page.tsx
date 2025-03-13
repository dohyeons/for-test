"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { Popup } from "@/components/Popup";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  companyName: string;
  password: string;
  passwordCheck?: string;
};

type UseFormSetError<T> = (name: keyof T, error: { type: string; message?: string }) => void;

export default function SignUp() {
  // 회원가입 성공시 modal
  const [isModal, setIsModal] = useState(false);
  const router = useRouter();
  // 홈버튼 눌렀을때 나오는 modal
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const [LoginProgress, setLoginProgress] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: "onChange" });

  // 유효성 검사 함수
  const validateSignUpForm = (data: FormValues) => {
    const errors: Partial<Record<keyof FormValues, string>> = {};

    if (!data.name) {
      errors.name = "이름을 입력해주세요";
    }
    if (!data.email) {
      errors.email = "이메일을 입력해주세요.";
    }
    if (!data.companyName) {
      errors.companyName = "회사명을 정확하게 입력해주세요";
    }
    if (data.password.length < 8) {
      errors.password = "비밀번호를 입력해주세요.";
    }
    if (data.passwordCheck !== data.password) {
      errors.passwordCheck = "비밀번호가 일치하지 않습니다.";
    }

    return errors;
  };

  const handleSignUpSuccess = (result: { message: string }, setIsModal: (isModal: boolean) => void) => {
    if (result.message === "사용자 생성 성공") {
      setIsModal(true);
    }
  };

  const handleSignUpError = (error: unknown, setError: UseFormSetError<FormValues>) => {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      setError("email", { type: "manual", message: "중복된 이메일입니다." });
    }
  };

  // 회원가입 처리 함수
  const handleSignUp = async (data: FormValues) => {
    // 기존 에러 모두 클리어
    clearErrors();
    // 유효성 검사 실행
    const validationErrors = validateSignUpForm(data);
    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([field, message]) => {
        setError(field as keyof FormValues, { type: "manual", message });
      });
      return;
    }
    setLoginProgress(true);
    try {
      const result = await postSignUp({
        name: data.name,
        email: data.email,
        companyName: data.companyName,
        password: data.password,
      });
      // 성공 처리: 회원가입 성공 메시지에 따라 모달 노출
      handleSignUpSuccess(result, setIsModal);
    } catch (error) {
      handleSignUpError(error, setError);
    } finally {
      setLoginProgress(false);
    }
  };

  const postSignUp = async (data: FormValues) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}auths/signup`, data);
    return response.data;
  };

  useEffect(() => {
    if (!LoginProgress) {
      const tokenExists = document.cookie.split(";").some((cookie) => cookie.trim().startsWith("token="));
      if (tokenExists) {
        alert("비정상적인 접근입니다.");
        router.push("/");
      }
    }
  }, [LoginProgress]);

  // 비밀번호 변경시 보이는 icon
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordCheckVisible, setPasswordCheckVisible] = useState(false);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
      <div className="flex w-full flex-col lg:max-w-[608px] xl:max-w-[510px]">
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="m-auto flex w-full flex-col rounded-3xl bg-white px-4 py-8 md:max-w-[608px] xl:m-0 xl:max-w-[510px] xl:px-14"
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                setIsOpenPopup(true);
              }}
              className="flex flex-col items-center justify-center gap-4"
            >
              <Image src={"/images/auth_icon.svg"} alt={""} width={50} height={50} />
            </button>
            <p className="text-center text-xl font-semibold text-gray-800">회원가입</p>
          </div>
          <div className="m-auto w-full max-w-[500px]">
            <div className="flex flex-col gap-2 pt-8">
              <label htmlFor="userName" className="text-sm font-semibold text-gray-800">
                이름
              </label>
              <Input
                id={"userName"}
                type={"text"}
                placeholder="이름을 입력해주세요"
                register={register("name", { required: "이름을 입력해주세요" })}
                helperText={errors.name?.message}
              />
            </div>
            <div className="flex flex-col gap-2 pt-8">
              <label htmlFor="email" className="text-sm font-semibold text-gray-800">
                아이디
              </label>
              <Input
                id={"email"}
                type={"email"}
                placeholder="이메일을 입력해주세요."
                register={register("email", { required: "이메일을 입력해주세요." })}
                helperText={errors.email?.message}
              />
            </div>
            <div className="flex flex-col gap-2 pt-8">
              <label htmlFor="company" className="text-sm font-semibold text-gray-800">
                회사명
              </label>
              <Input
                id={"company"}
                type={"text"}
                placeholder="회사명을 입력해주세요"
                register={register("companyName", { required: "회사명을 정확하게 입력해주세요" })}
                helperText={errors.companyName?.message}
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
                  register={register("password", { required: "비밀번호를 입력해주세요." })}
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
            <div className="flex flex-col gap-2 pt-6">
              <label htmlFor="passwordCheck" className="text-sm font-semibold text-gray-800">
                비밀번호 확인
              </label>
              <div className="relative">
                <Input
                  id={"passwordCheck"}
                  type={passwordCheckVisible ? "text" : "password"}
                  placeholder="비밀번호를 다시 한 번 입력해주세요."
                  register={register("passwordCheck", { required: "비밀번호가 일치하지 않습니다." })}
                  helperText={errors.passwordCheck?.message}
                />
                <button
                  type="button"
                  className="absolute right-4 top-[8.8px]"
                  onClick={() => setPasswordCheckVisible((prev) => !prev)}
                >
                  <img
                    src={passwordCheckVisible ? "/images/password_on.svg" : "/images/password_off.svg"}
                    alt="비밀번호 보기 토글"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>
            <Button disabled={!isValid} className="mt-10 w-full">
              확인
            </Button>
            <div className="flex-ro mt-6 flex justify-center">
              <p className="text-[15px] font-medium text-gray-800">이미 회원이신가요?</p>
              <Link
                href={"/sign-in"}
                className="border-b border-primary-color text-[15px] font-medium text-primary-color"
              >
                로그인
              </Link>
            </div>
          </div>
        </form>
        <Popup
          isOpen={isOpenPopup}
          type="confirm"
          onClose={() => {
            setIsOpenPopup(false);
          }}
          onClick={() => {
            router.push("/");
          }}
        >
          <p>
            정말 나가시겠어요? <br />
            작성된 내용이 모두 삭제됩니다.
          </p>
        </Popup>
        {isModal ? (
          <>
            <Modal
              isOpen={isModal}
              onClose={() => {
                setIsModal(false);
                router.push("/sign-in");
              }}
            >
              <div className="w-full min-w-[252px]">
                <p className="py-12 text-center text-base font-medium text-gray-900">가입이 완료 되었습니다.</p>
                <div className="m-auto flex w-[120px]">
                  <Button
                    size="sm"
                    onClick={() => {
                      setIsModal(false);
                      router.push("/sign-in");
                    }}
                    className="w-full"
                  >
                    확인
                  </Button>
                </div>
              </div>
            </Modal>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
