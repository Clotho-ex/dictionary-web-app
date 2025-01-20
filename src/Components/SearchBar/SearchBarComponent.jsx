import { SearchOutlined } from "@ant-design/icons";
import React from "react";

const SearchBarComponent = () => {
  return (
    <>
      <input
        type="text"
        name="text"
        id="text"
        placeholder="Search"
        className="bg-platinum rounded-xl p-2.5 mt-[1.5rem] w-full lg:w-[840px] placeholder:text-black placeholder:text-bold focus:outline-gray text-black text-lg"
      />
      <SearchOutlined />
    </>
  );
};

export default SearchBarComponent;
