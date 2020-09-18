import React, { useState } from "react";
import { ReactComponent as InfoIcon } from "../images/information.svg";
import Modal from "./Modal";

type Props = {
  photoData: {
    src: string;
    url?: string;
    author?: string;
    type?: string;
  };
};

const PhotoInfo: React.FC<Props> = (props: Props) => {
  const { photoData } = props;
  const [isInfoShowing, setIsInfoShowing] = useState(false);

  const openModal = (): void => {
    setIsInfoShowing(true);
  };

  const closeModal = (): void => {
    setIsInfoShowing(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="w-12 h-12 rounded-full bg-black bg-opacity-50 focus:outline-none focus:bg-opacity-75 flex items-center justify-center"
      >
        <InfoIcon
          className="text-white w-6 h-6 fill-current m-auto"
          title="About photo"
        />
      </button>
      <Modal isOpen={isInfoShowing} closeHandler={closeModal}>
        <figure>
          <img
            src={photoData.src}
            alt="Currently being shown in the kaleidoscoper"
            className="max-w-full mb-2"
          />
          <figcaption>
            {photoData.type === "user" ? (
              <p>Photo uploaded by you</p>
            ) : (
              <>
                <p>
                  Original photo by{" "}
                  <a
                    href={photoData.url}
                    target="blank"
                    rel="noopener noreferrer"
                    className="text-green-700 hover:text-green-600 font-bold whitespace-no-wrap"
                  >
                    {photoData.author}
                  </a>
                </p>
                <p className="text-sm">
                  Via{" "}
                  <a
                    href="https://picsum.photos/"
                    target="blank"
                    rel="noopener noreferrer"
                    className="text-green-700"
                  >
                    Picsum.photos
                  </a>
                </p>
              </>
            )}
          </figcaption>
        </figure>
      </Modal>
    </>
  );
};

export default PhotoInfo;
