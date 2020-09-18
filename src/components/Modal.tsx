import React, { ReactNode, KeyboardEvent } from "react";

type Props = {
  isOpen: boolean;
  closeHandler: () => void;
  children: ReactNode;
};

const Modal: React.FC<Props> = (props: Props) => {
  const { isOpen, closeHandler, children } = props;

  const handleKeyboardClose = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Escape") {
      closeHandler();
    }
  };

  return (
    <div
      className={`${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center`}
    >
      <aside className="bg-white rounded-md text-black z-50 m-2 max-w-full sm:max-w-sm">
        <div className="h-full flex flex-col justify-between">
          <div className="overflow-y-auto flex-grow p-4">{children}</div>
          <footer className="flex flex-row justify-end bg-gray-300 p-4 rounded-b-md">
            <button type="button" onClick={closeHandler}>
              Close
            </button>
          </footer>
        </div>
      </aside>
      <div
        className="bg-black bg-opacity-75 fixed top-0 bottom-0 left-0 right-0"
        onClick={closeHandler}
        role="button"
        aria-label="Close this panel"
        onKeyDown={handleKeyboardClose}
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
};

export default Modal;
