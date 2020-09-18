import React, { useState, useEffect } from "react";

import Modal from "./Modal";

import { ReactComponent as KaleidoscoperLogo } from "../images/kaleidoscoper-logo.svg";

const Header: React.FC = () => {
  const [isAboutShowing, setIsAboutShowing] = useState(false);
  // TODO: Figure out how to extend the Event type so that is includes the prompt method.
  // Should really be using an Event type rather than "any" here.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [installPromptEvent, setInstallPromptEvent] = useState<any>();
  const [isInstallStarted, setIsInstallStarted] = useState(false);

  const installHandler = (): void => {
    if (installPromptEvent) {
      installPromptEvent.prompt();
      setIsInstallStarted(true);
    }
  };

  const openModal = (): void => {
    setIsAboutShowing(true);
  };

  const closeModal = (): void => {
    setIsAboutShowing(false);
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      setInstallPromptEvent(event);
    });
  }, []);

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
            href="https://github.com/peterchappell/kaleidoscoper-ts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 hover:text-green-600"
          >
            source code
          </a>
          .
        </p>
        {!!installPromptEvent && !isInstallStarted && (
          <div className="bg-gray-200 rounded-md border-gray-400 border-2 border-solid p-4 mt-4">
            <p className="mb-4 font-semibold text-sm">
              Access Kaleidoscoper more easily by installing it as a free app!
            </p>
            <button
              onClick={installHandler}
              type="button"
              className=" bg-green-700 text-white rounded-full py-2 px-4"
            >
              Install Kaleidoscoper
            </button>
          </div>
        )}
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
