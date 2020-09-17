import React, { useEffect } from "react";
import { PhotoData } from "./Main";

import useRandomPhoto from "../hooks/useRandomPhoto";

type FooterProps = {
  setPhotoHandler: (photoData: PhotoData) => void;
};

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
  const { setPhotoHandler } = props;
  const { fetchPhoto, photoData, error, isLoading } = useRandomPhoto();

  useEffect(() => {
    console.log("photoData", photoData);
    if (photoData) {
      setPhotoHandler(photoData);
    }
  }, [photoData, setPhotoHandler]);

  useEffect(() => {
    if (isLoading) {
      console.log("TODO: loading...");
    }
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      console.log("TODO: Handle error", error);
    }
  }, [error]);

  return (
    <footer className="p-3 sm:p-6 bg-black flex justify-center">
      <button type="button" onClick={fetchPhoto}>
        Select random photo
      </button>
    </footer>
  );
};

export default Footer;
