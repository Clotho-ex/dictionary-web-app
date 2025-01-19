import { useState } from "react";
import { Switch, Divider, Dropdown, Space, Typography } from "antd";
import { MoonFilled, SunFilled, DownOutlined } from "@ant-design/icons";

const NavBarComponent = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // true for initial dark mode
  const [selectedFont, setSelectedFont] = useState("Sans Serif");

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

  const dropdownStyle = {
    width: "120px", // Adjust this value to your needs
  };

  return (
    <nav className="flex justify-between items-center p-4">
      <img src="/logo.svg" alt="Logo image of a book." />
      <div className="flex gap-6 justify-center items-center">
        <Dropdown
          menu={{
            items,
            onClick: handleFontChange,
            selectable: true,
            selectedKeys: [selectedFont],
            style: dropdownStyle,
          }}
          trigger={["click"]}>
          <Typography.Link className="text-black">
            <Space className="w-[120px] justify-between">
              {selectedFont}
              <DownOutlined className="text-[#a424a7] -ml-16" />
            </Space>
          </Typography.Link>
        </Dropdown>

        <Divider type="vertical" className="bg-black h-8" />

        <div className="flex items-center gap-2">
          <Switch
            checkedChildren="Dark"
            unCheckedChildren={
              <span className="text-white font-bold">Light</span>
            }
            checked={isDarkMode}
            onChange={setIsDarkMode}
            className="focus:outline-none custom-switch"
          />
          {isDarkMode ? (
            <MoonFilled className="text-lg text-[#A445ED]" />
          ) : (
            <SunFilled className="text-lg text-[#3A3A3A]" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;
