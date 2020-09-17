import { useState } from "react";
import { PhotoData } from "../components/Main";

type RandomPhotoHook = {
  fetchPhoto: () => void;
  photoData?: PhotoData;
  error?: Error | null;
  isLoading: boolean;
};

function useRandomPhoto(): RandomPhotoHook {
  const [photoData, setPhotoData] = useState<PhotoData>();
  const [error, setError] = useState<Error | null>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPhoto = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://picsum.photos/2400");
      const photoId = response.headers.get("picsum-id");
      const imageBlob = await response.blob();
      const reader = new FileReader();
      let imageSrc;
      reader.readAsDataURL(imageBlob);
      reader.onloadend = () => {
        imageSrc = reader.result;
        if (imageSrc && typeof imageSrc === "string") {
          setPhotoData({
            src: imageSrc,
          });
          setIsLoading(false);
        }
      };
      const infoResponse = await fetch(
        `https://picsum.photos/id/${photoId}/info`
      );
      const photoInfo = await infoResponse.json();
      if (imageSrc && typeof imageSrc === "string") {
        setPhotoData({
          src: imageSrc,
          url: photoInfo.url,
        });
      }
    } catch (requestError) {
      setError(requestError);
      setIsLoading(false);
    }
  };

  return { fetchPhoto, photoData, error, isLoading };
}

export default useRandomPhoto;
