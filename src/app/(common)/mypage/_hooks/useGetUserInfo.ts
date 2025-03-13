import { getUser } from "@/app/api/getUser";
import { UserType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUserInfo = (token?: string) => {
  return useQuery<UserType>({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 300000,
    enabled: Boolean(token),
  });
};
