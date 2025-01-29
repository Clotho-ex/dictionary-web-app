import { useEffect, useRef } from "react";
import { MoonIcon, SunIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { useNavBarStore } from "../../store/navBarStore";

const NavBarComponent = () => {
  const {
    isDarkMode,
    setIsDarkMode,
    selectedFont,
    setSelectedFont,
    isOpen,
    setIsOpen,
  } = useNavBarStore();

  const dropDownRef = useRef(null);

  const dropDownItems = ["Sans Serif", "Serif", "Monospace"].map((label) => ({
    label,
    key: label,
  }));

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
            className="px-4 py-2 flex items-center rounded-full outline-none focus:outline-2 focus:outline-offset-2 focus:outline-purple
            justify-between gap-2 min-w-[8rem] 
             dark:bg-gray-800 
            text-black dark:text-white"
            onClick={() => setIsOpen(!isOpen)}>
            <span className="font-bold">{selectedFont}</span>
            <ChevronDownIcon className="h-5 w-5" />
          </button>

          {isOpen && (
            <ul
              className="absolute left-0 min-w-[8rem] rounded-xl z-10
             shadow-lg dark:shadow-purple text-left bg-white dark:bg-blackLight">
              {dropDownItems.map((item) => (
                <li
                  key={item.key}
                  className="px-4 py-2 
                  cursor-pointer font-bold
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

        <div className="text-3xl -ml-4 text-black dark:text-platinum font-mono">|</div>

        {/* Theme Toggle */}
        <div className="flex items-center gap-2">
          <button
            className="relative inline-block w-16 h-8 rounded-full 
            outline-none focus:outline-2 focus:outline-offset-2 focus:outline-purple 
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
