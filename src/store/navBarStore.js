import { create } from "zustand";

const fontFamilies = {
  "Sans Serif": "Inter, sans-serif",
  Serif: "Lora, serif",
  Monospace: "Inconsolata, monospace",
};

const applyTheme = (isDark) => {
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.classList.toggle("light", !isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

const initialTheme = localStorage.getItem("theme") === "dark";
applyTheme(initialTheme);

export const useNavBarStore = create((set) => ({
  isDarkMode: initialTheme,

  setIsDarkMode: (value) =>
    set(() => {
      applyTheme(value);
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
