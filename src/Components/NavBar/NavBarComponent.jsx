import { useState, useEffect, useRef, useContext } from "react";
import { MoonIcon, SunIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { ThemeContext } from "../../context/ThemeContext";

const fontFamilies = {
  "Sans Serif": "Inter, sans-serif",
  Serif: "Lora, serif",
  Monospace: "Inconsolata, monospace",
};

const NavBarComponent = () => {
  const [isDarkMode, setIsDarkMode] = useContext(ThemeContext);
  const [selectedFont, setSelectedFont] = useState("Sans Serif");
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const dropDownItems = Object.entries(fontFamilies).map(([label, _]) => ({
    label,
    key: label,
  }));

  useEffect(() => {
    document.documentElement.style.fontFamily = fontFamilies[selectedFont];
  }, [selectedFont]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownRef]);

  return (
    <nav className="flex flex-row justify-between items-center gap-4 mb-14 sm:gap-0">
      <img src="/logo.svg" alt="Logo" className="w-[28px] sm:w-[32px]" />

      <div className="flex flex-row justify-center items-center gap-3 sm:gap-6">
        {/* Dropdown */}
        <div className="relative inline-block" ref={dropDownRef}>
          <button
            className="px-4 py-2 focus:outline-purple flex items-center 
            justify-between gap-2 min-w-[8rem]  dark:border-gray-600 
             dark:bg-gray-800 
            text-black dark:text-white 
            hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(!isOpen)}>
            <span className="font-bold">{selectedFont}</span>
            <ChevronDownIcon className="h-5 w-5" />
          </button>

          {isOpen && (
            <ul
              className="absolute left-0 w-full rounded-xl z-10
             shadow-lg dark:shadow-purple text-left dark:bg-blackLight">
              {dropDownItems.map((item) => (
                <li
                  key={item.key}
                  className="px-4 py-2 
                  cursor-pointer 
                  hover:text-purple dark:hover:text-purple
                  text-black dark:text-white"
                  onClick={() => {
                    setSelectedFont(item.key);
                    setIsOpen(false);
                  }}>
                  {item.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="text-3xl -ml-4 text-platinum">|</div>

        {/* Theme Toggle */}
        <div className="flex items-center gap-2">
          <button
            className="relative inline-block w-16 h-8 rounded-full 
            focus:outline-purple transition-colors duration-300 
            bg-purple"
            onClick={() => setIsDarkMode(!isDarkMode)}>
            <span
              className={`absolute top-1/2 left-1 transform -translate-y-1/2 
              w-6 h-6 rounded-full transition-transform duration-300
              ${isDarkMode ? "translate-x-8" : ""} 
              bg-platinum`}></span>
          </button>
          {isDarkMode ? (
            <MoonIcon className="h-6 w-6 text-white" />
          ) : (
            <SunIcon className="h-6 w-6 text-gray-700" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;
