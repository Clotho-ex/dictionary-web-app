import { Search } from "lucide-react";
import React from "react";

const SearchBarComponent = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <input
          type="text"
          name="text"
          id="text"
          placeholder="Search"
          className="bg-whiteSmoke rounded-xl p-2.5  w-full placeholder:text-black placeholder:text-bold placeholder:text-heading-S  focus:outline-none focus:ring-2 focus:ring-purple text-black text-lg"
        />
        <button className="flex items-center justify-center bg-whiteSmoke rounded-xl p-2.5 ml-[-3rem] focus:outline-none focus:ring-2 focus:ring-purple">
          <Search color="#a445ed" strokeWidth={1.75} />
        </button>
      </div>
    </>
  );
};

export default SearchBarComponent;
