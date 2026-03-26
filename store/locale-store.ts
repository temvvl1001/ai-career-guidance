import { create } from "zustand";
import { persist } from "zustand/middleware";

type Locale = "en" | "mn";

interface LocaleStore {
  locale: Locale;
  toggleLocale: () => void;
}

export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set, get) => ({
      locale: "en",
      toggleLocale: () =>
        set({ locale: get().locale === "en" ? "mn" : "en" }),
    }),
    { name: "locale" }
  )
);