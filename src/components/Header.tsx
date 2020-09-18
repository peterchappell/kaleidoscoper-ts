import React from "react";

import { ReactComponent as KaleidoscoperLogo } from "../images/kaleidoscoper-logo.svg";

const Header: React.FC = () => {
  return (
    <header className="p-3 bg-black flex justify-between items-center">
      <div className="flex items-center">
        <KaleidoscoperLogo className="w-10 h-10 mr-2" />
        <h1 className="font-bold text-xl">Kaleidoscoper</h1>
      </div>
    </header>
  );
};

export default Header;
