import { useCheckAuth } from "@/app/(common)/_home/_hooks/useCheckAuth";
import { useUserStore } from "@/stores/useUserStore";

export function useAuth() {
  const { checkAuth, isAuthModalOpen, setAuthModalOpen } = useCheckAuth();
  const shouldOpenCreateModal = useUserStore((state) => state.shouldOpenCreateModal);
  const setShouldOpenCreateModal = useUserStore((state) => state.setShouldOpenCreateModal);

  return {
    checkAuth,
    isAuthModalOpen,
    setAuthModalOpen,
    shouldOpenCreateModal,
    setShouldOpenCreateModal,
  };
}
