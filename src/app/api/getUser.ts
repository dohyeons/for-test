import axiosInstance from "@/lib/axiosInstance";
import { isAxiosError } from "axios";

export type User = {
  teamId: number;
  id: number;
  email: string;
  name: string;
  companyName: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export const getUser = async (): Promise<User> => {
  try {
    const response = await axiosInstance.get<User>("auths/user");
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const { response, request } = error;
      if (response) {
        // 서버에서 응답은 있었음
        const { status, data } = response;
        if (status === 404) {
          if (data.message === "사용자를 찾을 수 없습니다.") {
            throw new Error("사용자를 찾을 수 없습니다.");
          }
        }
      } else if (request) {
        throw new Error("서버로부터 응답이 없습니다. 네트워크 상태를 확인해주세요.");
      }
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};
