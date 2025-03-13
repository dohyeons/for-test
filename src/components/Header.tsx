"use client";

import { useGetUserInfo } from "@/app/(common)/mypage/_hooks/useGetUserInfo";
import axiosInstance from "@/lib/axiosInstance";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { useUserStore } from "@/stores/useUserStore";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [token, setToken] = useState<string | undefined>(undefined);
  const { data } = useGetUserInfo(token);
  const [profileBtn, setProfileBtn] = useState(false);
  const favorites = useFavoritesStore((state) => state.favorites);
  const favoritesCount = favorites.length;
  const queryClient = useQueryClient();
  const profileRef = useRef<HTMLDivElement>(null);

  function getCookie(name: string): string | undefined {
    if (typeof document === "undefined") return undefined;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return undefined;
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileBtn(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const tokenFromCookie = getCookie("token");
    setToken(tokenFromCookie);
  }, []);

  useEffect(() => {
    setProfileBtn(false);
  }, [pathname]);

  const getLinkClass = (path: string) => (pathname === path ? "header-link active" : "header-link");

  const handleLogout = () => {
    const paths = ["/", "/gathering", "/mypage", "/favorites", "/reviews"];
    paths.forEach((path) => {
      document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=${path}`;
    });
    setToken(undefined);
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("user-storage");
    }
    setProfileBtn(false);
    queryClient.removeQueries({ queryKey: ["user"] });
    useUserStore.getState().clearUser();
    signout();
    if (pathname === "/") {
      window.location.reload();
    } else {
      router.push("/");
    }
  };

  const signout = async () => {
    try {
      const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}auths/signout`);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  return (
    <header className="sticky top-0 z-50 h-[56px] bg-primary-color px-4 md:h-[60px]">
      <div className="m-auto flex h-full max-w-[1200px] flex-row items-center justify-between">
        <nav className="flex h-full flex-row items-center gap-3 md:gap-6">
          {/* 768px 이하에서 보이는 로고 */}
          <Link href={"/"} className="block md:hidden">
            <Image src={"/images/mobile_logo.svg"} alt={"모바일 로고"} width={40} height={40} />
          </Link>
          {/* 768px 이상에서 보이는 로고 */}
          <Link href={"/"} className="hidden md:block">
            <Image src={"/images/desktop_logo.svg"} alt={"데스크탑 로고"} width={108} height={40} />
          </Link>
          <Link href={"/"} className={getLinkClass("/")}>
            모임 찾기
          </Link>
          <Link href={"/favorites"} className={`${getLinkClass("/favorites")} gap-1`}>
            찜한 모임{" "}
            {favoritesCount !== 0 ? (
              <b className="rounded-full bg-black px-2 text-xs font-semibold text-white">
                {favoritesCount > 0 && `${favoritesCount}`}
              </b>
            ) : (
              ""
            )}
          </Link>
          <Link href={"/reviews"} className={getLinkClass("/reviews")}>
            모든 리뷰
          </Link>
        </nav>
        {token ? (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setProfileBtn((prev) => !prev);
              }}
              className="flex items-center justify-center"
            >
              <Avatar size={"md"} imageUrl={data?.image} />
            </button>
            {profileBtn ? (
              <div className="absolute right-0 top-[calc(100%+8px)] h-20 w-[110px] rounded-xl bg-white shadow-md xl:top-[calc(100%+10px)]">
                <Link
                  href={"/mypage"}
                  className="flex h-10 w-full items-center px-4 text-base font-medium text-gray-800"
                >
                  마이페이지
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="flex h-10 w-full items-center px-4 text-left text-base font-medium text-gray-800"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <Link href={"/sign-in"} className="header-link flex items-center gap-2">
            <span>로그인</span>
          </Link>
        )}
      </div>
    </header>
  );
}
