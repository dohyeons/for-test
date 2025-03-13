import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

export type FormDataType = {
  name: string;
  location: string;
  image: File;
  type: string;
  dateTime: string;
  registrationEnd: string;
  capacity: number;
};

export const useCreateGathering = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axiosInstance.post("/gatherings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gatherings"] }); // 기존 데이터 무효화 & 새로고침
    },
    onError: (error) => {
      console.error("모임 생성 오류:", error);
    },
  });
};
