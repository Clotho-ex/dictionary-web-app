import { useState, useEffect, useRef } from "react";
import { MoonIcon, SunIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const fontFamilies = {
  "Sans Serif": "Inter, sans-serif",
  Serif: "Lora, serif",
  Monospace: "Inconsolata, monospace",
};

const NavBarComponent = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
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
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

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

  const dropDownButtonClasses = `px-4 py-2 rounded focus:outline-purple flex items-center justify-between gap-2 min-w-[9rem] ${
    isDarkMode
      ? "border-gray-600 bg-gray-800 text-white hover:bg-gray-700"
      : "border-gray-300 bg-white text-black hover:bg-gray-100"
  }`;

  const dropDownListClasses = `absolute left-0 w-full mt-1 rounded shadow-lg z-10 ${
    isDarkMode
      ? "bg-platinum divide-y-2 divide-violet-500 border-2 border-violet-500"
      : "bg-white divide-y-2 divide-violet-500 border-2 border-violet-500"
  }`;

  const toggleButtonClasses = `relative inline-block w-16 h-8 rounded-full focus:outline-purple transition-colors duration-300 ${
    isDarkMode ? "bg-purple" : "bg-purple"
  }`;

  const toggleCircleClasses = `absolute top-1/2 left-1 transform -translate-y-1/2 w-6 h-6 rounded-full transition-transform duration-300 ${
    isDarkMode ? "translate-x-8 bg-platinum" : "bg-platinum"
  }`;

  return (
    <nav className="flex flex-row justify-between items-center gap-4 mb-14 sm:gap-0">
      <img src="/logo.svg" alt="Logo" className="w-[28px] sm:w-[32px]" />

      <div className="flex flex-row justify-center items-center gap-3 sm:gap-6">
        <div className="relative inline-block" ref={dropDownRef}>
          <button
            className={dropDownButtonClasses}
            onClick={() => setIsOpen(!isOpen)}>
            <span className="font-bold">{selectedFont}</span>
            <ChevronDownIcon className="h-5 w-5" />
          </button>
          {isOpen && (
            <ul className={dropDownListClasses}>
              {dropDownItems.map((item) => (
                <li
                  key={item.key}
                  className={`px-4 py-2 hover:bg-gray-${
                    isDarkMode ? "700" : "100"
                  } cursor-pointer ${isDarkMode ? "text-black" : "text-black"}`}
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
        <div className="text-3xl text-platinum">|</div>

        <div className="flex items-center gap-2">
          <button
            className={toggleButtonClasses}
            onClick={() => setIsDarkMode(!isDarkMode)}>
            <span className={toggleCircleClasses}></span>
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
