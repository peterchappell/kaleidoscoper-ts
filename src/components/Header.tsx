import React, { useState } from "react";

import Modal from "./Modal";

import { ReactComponent as KaleidoscoperLogo } from "../images/kaleidoscoper-logo.svg";

const Header: React.FC = () => {
  const [isAboutShowing, setIsAboutShowing] = useState(false);

  const openModal = (): void => {
    setIsAboutShowing(true);
  };

  const closeModal = (): void => {
    setIsAboutShowing(false);
  };

  return (
    <header className="p-3 bg-black flex justify-between items-center">
      <div className="flex items-center flex-row-reverse">
        <h1 className="font-bold text-xl">Kaleidoscoper</h1>
        <KaleidoscoperLogo
          className="w-10 h-10 mr-2 cursor-pointer"
          onClick={openModal}
          title="About Kaleidoscoper"
        />
      </div>
      <Modal isOpen={isAboutShowing} closeHandler={closeModal}>
        <div className="flex items-center mb-4">
          <KaleidoscoperLogo className="w-10 h-10 mr-2" aria-hidden="true" />
          <h2 className="text-lg font-bold">About Kaleidoscoper</h2>
        </div>
        <p className="text-sm">
          Kaleidoscoper is a hobby project built by{" "}
          <a
            href="https://peterchappell.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 hover:text-green-600"
          >
            Pete Chappell
          </a>
          . If you&apos;re so inclined, you can look at its{" "}
          <a
            href="https://github.com/peterchappell/kaleidoscoper"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 hover:text-green-600"
          >
            source code
          </a>
          .
        </p>
        <h3 className="mt-4 mb-2 text-xs font-semibold">
          A note about privacy
        </h3>
        <p className="text-xs">
          No information about you is intentionally stored by this site. No
          social media, analytics or tracking services are in use on this site.
          There is a chance that the hosting or random image providers collect
          some information but what they could track is pretty minimal. Privacy
          is super important but this site is probably the least of your
          concerns.
        </p>
      </Modal>
    </header>
  );
};

export default Header;
