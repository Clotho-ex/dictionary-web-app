import { create } from "zustand";

const fontFamilies = {
  "Sans Serif": "Inter, sans-serif",
  Serif: "Lora, serif",
  Monospace: "Inconsolata, monospace",
};

export const useNavBarStore = create((set) => ({
  isDarkMode: localStorage.getItem("theme") === "dark",
  setIsDarkMode: (value) =>
    set(() => {
      document.documentElement.classList.toggle("dark", value);
      document.documentElement.classList.toggle("light", !value);
      localStorage.setItem("theme", value ? "dark" : "light");
      return { isDarkMode: value };
    }),

  selectedFont: "Sans Serif",
  setSelectedFont: (font) => {
    document.documentElement.style.fontFamily = fontFamilies[font];
    set(() => ({ selectedFont: font }));
  },

  isOpen: false,
  setIsOpen: (isOpen) => set(() => ({ isOpen })),
}));
