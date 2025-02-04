import { useEffect, useRef } from "react";
import { useNavBarStore } from "../../store/navBarStore";
import { ArrowDown, Moon, Sun } from "lucide-react";

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
        {/* Dropdown for fonts.*/}
        <div className="relative inline-block" ref={dropDownRef}>
          <button
            aria-label="Change font style"
            className="px-4 py-2 flex items-center rounded-full outline-none focus:outline-2 focus:outline-offset-2 focus:outline-purple
            justify-between gap-2 min-w-[8rem]"
            onClick={() => setIsOpen(!isOpen)}>
            <span className="font-bold">{selectedFont}</span>
            <ArrowDown size={20} />
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
                  "
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

        <div className="text-3xl -ml-4 font-mono">|</div>

        {/* Theme Switching. */}
        <div className="flex items-center gap-2">
          <button
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            className="relative inline-block w-16 h-8 rounded-full 
            outline-none focus:outline-2 focus:outline-offset-2 focus:outline-purple 
            bg-purple hover:bg-violet-600"
            onClick={() => setIsDarkMode(!isDarkMode)}>
            <span
              className={`absolute top-1/2 left-1 transform -translate-y-1/2 
              w-6 h-6 rounded-full transition-transform duration-300
              ${isDarkMode ? "translate-x-8" : ""} 
              bg-white`}></span>
          </button>
          {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;
