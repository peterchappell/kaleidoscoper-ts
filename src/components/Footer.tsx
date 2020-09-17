import React, { useEffect } from "react";
import { PhotoData } from "./Main";

import LoadFile from "./LoadFile";
import { ReactComponent as Random } from "../images/shuffle.svg";
import useRandomPhoto from "../hooks/useRandomPhoto";

type FooterProps = {
  setPhotoHandler: (photoData: PhotoData) => void;
  setErrorHandler: (errorMessage: boolean) => void;
  setIsLoadingHandler: (isLoading: boolean) => void;
};

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
  const { setPhotoHandler, setErrorHandler, setIsLoadingHandler } = props;
  const { fetchPhoto, photoData, error, isLoading } = useRandomPhoto();

  useEffect(() => {
    if (photoData) {
      setPhotoHandler(photoData);
    }
  }, [photoData, setPhotoHandler]);

  useEffect(() => {
    setIsLoadingHandler(isLoading);
  }, [isLoading, setIsLoadingHandler]);

  useEffect(() => {
    setErrorHandler(!!error);
  }, [error, setErrorHandler]);

  return (
    <footer className="bg-black grid-cols-2 grid">
      <button
        type="button"
        onClick={fetchPhoto}
        className="p-3 text-xs focus:outline-none focus:bg-gray-800"
      >
        <Random className="text-white w-6 h-6 fill-current m-auto" />
        Random
      </button>
      <LoadFile
        setPhotoHandler={setPhotoHandler}
        setIsLoading={setIsLoadingHandler}
        setError={setErrorHandler}
      />
    </footer>
  );
};

export default Footer;
