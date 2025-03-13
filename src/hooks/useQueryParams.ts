import { useSearchParams } from "next/navigation";

/**
 * 현재 URL의 모든 쿼리 파라미터를 객체로 변환하는 커스텀 훅
 *
 * @example
 * // URL: /gathering?sortBy=createdAt&sortOrder=desc
 * const queryParams = useQueryParams();
 * console.log(queryParams); // { sortBy: "createdAt", sortOrder: "desc" }
 */
export const useQueryParams = () => {
  const params = useSearchParams();
  return Object.fromEntries(params);
};
