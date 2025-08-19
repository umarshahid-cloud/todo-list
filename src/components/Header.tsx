import React from "react";
import CheckIcon from "../assets/checkIcon";

const Header: React.FC = () => {
  return (
    <header className="relative top-2 flex justify-center sm:justify-start mb-2 px-4">
      <div className="flex items-center gap-3 text-3xl font-bold">
        <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-md text-lg font-bold shadow-lg">
          <CheckIcon />
        </div>
        <span className="text-white">TODO</span>
      </div>
    </header>
  );
};

export default Header;
