import { useState, useEffect } from "react";
import { Switch, Divider, Dropdown, Space, Typography } from "antd";
import { MoonFilled, SunFilled, DownOutlined } from "@ant-design/icons";

const NavBarComponent = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // true for initial dark mode
  const [selectedFont, setSelectedFont] = useState("Sans Serif");

  const fontFamilies = {
    "Sans Serif": "Inter, sans-serif",
    Serif: "Lora, serif",
    Monospace: "Inconsolata, monospace",
  };

  const items = [
    {
      label: "Sans Serif",
      key: "Sans Serif",
    },
    {
      label: "Serif",
      key: "Serif",
    },
    {
      label: "Monospace",
      key: "Monospace",
    },
  ];

  const handleFontChange = ({ key }) => {
    setSelectedFont(key);
  };

  useEffect(() => {
    document.documentElement.style.fontFamily = fontFamilies[selectedFont];
  }, [selectedFont]);

  const dropdownStyle = {
    width: "120px", // Adjust this value to your needs
  };

  return (
    <nav className="flex flex-row sm:flex-row justify-between items-center p-4 sm:p-6 bg-white shadow-md gap-4 sm:gap-0">
      {/* Logo - responsive sizing */}
      <img
        src="/logo.svg"
        alt="Logo image of a book."
        className="w-[28px] sm:w-[32px]"
      />

      {/* Controls container */}
      <div className="flex flex-row justify-center items-center gap-3 sm:gap-6">
        {/* Dropdown with responsive width */}
        <Dropdown
          menu={{
            items,
            onClick: handleFontChange,
            selectable: true,
            selectedKeys: [selectedFont],
            style: {
              ...dropdownStyle,
              "@media (max-width: 640px)": {
                width: "100px",
              },
            },
          }}
          trigger={["click"]}>
          <Typography.Link className="text-black">
            <Space className="w-[120px] sm:w-[140px] justify-between">
              <span className="text-sm sm:text-base">{selectedFont}</span>
              <DownOutlined className="text-[#a424a7] text-xs sm:text-sm -ml-16" />
            </Space>
          </Typography.Link>
        </Dropdown>

        {/* Responsive divider */}
        <Divider
          type="vertical"
          className="bg-black h-[2rem] hidden sm:block"
        />

        {/* Theme switch container */}
        <div className="flex items-center gap-2">
          <Switch
            checkedChildren={<span className="text-xs sm:text-sm">Dark</span>}
            unCheckedChildren={
              <span className="text-white font-bold text-xs sm:text-sm">
                Light
              </span>
            }
            checked={isDarkMode}
            onChange={setIsDarkMode}
            className="focus:outline-none custom-switch scale-90 sm:scale-100"
          />
          {isDarkMode ? (
            <MoonFilled className="text-base sm:text-lg text-[#A445ED]" />
          ) : (
            <SunFilled className="text-base sm:text-lg text-[#3A3A3A]" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;
