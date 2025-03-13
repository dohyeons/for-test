import axiosInstance from "@/lib/axiosInstance";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

const updateUserInfo = async (formData: FormData) => {
  try {
    const { data } = await axiosInstance.put(`/auths/user`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    // axiosError
    if (isAxiosError(error)) {
      // 응답 자체는 온 경우
      if (error.response) {
        if (error.response?.status === 404) {
          throw new Error("사용자를 찾을 수 없습니다.");
        }
        if (error.response?.status >= 500) {
          throw new Error("서버에 문제가 발생했습니다.");
        }
      }
    }
    throw new Error("데이터 업데이트에 실패했습니다.");
  }
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserInfo,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
    },
  });
};
