import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesStore = {
  favorites: string[]; // 찜한 모임 id
  isLoaded: boolean; // zustand 상태가 로드되었는지 확인
  setLoaded: (value: boolean) => void;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      isLoaded: false,
      setLoaded: (value: boolean) => set({ isLoaded: value }), // 상태 로드 여부 설정
      addFavorite: (id) => set((state) => ({ favorites: [...state.favorites, id] })),
      removeFavorite: (id) => set((state) => ({ favorites: state.favorites.filter((item) => item !== id) })),
      toggleFavorite: (id) => {
        const { favorites } = get();
        if (favorites.includes(id)) {
          set({ favorites: favorites.filter((item) => item !== id) });
        } else {
          set({ favorites: [...favorites, id] });
        }
      },
    }),
    {
      name: "favorites-storage",
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Hydration error:", error);
        } else {
          state?.setLoaded(true); // 스토어가 로드되었음을 설정
        }
      },
    },
  ),
);
