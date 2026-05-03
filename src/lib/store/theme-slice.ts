// lib/store/theme-slice.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light", // Default theme
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "theme-storage", // نام برای localStorage
      storage: createJSONStorage(() => localStorage), // استفاده از localStorage استاندارد
      onRehydrateStorage: () => (state) => {
        // وقتی داده از localStorage لود شد، وضعیت hydration را فعال کن
        state?.setHasHydrated(true);
      },
    },
  ),
);
