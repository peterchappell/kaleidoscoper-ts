import React, { useEffect } from "react";
import { PhotoData } from "./Main";

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
    <footer className="p-3 sm:p-6 bg-black flex justify-center">
      <button type="button" onClick={fetchPhoto}>
        Select random photo
      </button>
    </footer>
  );
};

export default Footer;
