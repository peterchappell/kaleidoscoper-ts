import React, { ChangeEvent, useRef } from "react";
import { PhotoData } from "./Main";
import { ReactComponent as Camera } from "../images/camera.svg";

type Props = {
  setPhotoHandler: (photoData: PhotoData) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (isError: boolean) => void;
};

const LoadFile: React.FC<Props> = (props: Props) => {
  const { setPhotoHandler, setIsLoading, setError } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files) {
      return;
    }
    setIsLoading(true);
    const file = event.target.files[0];

    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      let imageSrc;

      reader.readAsDataURL(file);
      reader.onloadend = (): void => {
        imageSrc = reader.result;
        if (imageSrc && typeof imageSrc === "string") {
          setPhotoHandler({
            src: imageSrc,
            type: "user",
          });
          setIsLoading(false);
          setError(false);
        }
      };
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <label
        htmlFor="load_file"
        className="p-3 text-xs block text-center cursor-pointer"
      >
        <Camera className="text-white w-6 h-6 fill-current m-auto" />
        Photo
        <input
          type="file"
          id="load_file"
          className="sr-only"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFile}
        />
      </label>
    </div>
  );
};

export default LoadFile;
