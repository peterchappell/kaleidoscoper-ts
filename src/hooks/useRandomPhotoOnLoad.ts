import { useEffect } from "react";

import useRandomPhoto from "./useRandomPhoto";
import { PhotoData } from "../components/Main";

function useRandomPhotoOnLoad(
  setPhoto: (photoData: PhotoData) => void,
  setError: (isError: boolean) => void,
  setIsLoading: (isLoading: boolean) => void
): void {
  const { fetchPhoto, photoData, error, isLoading } = useRandomPhoto();

  useEffect(() => {
    if (photoData) {
      setPhoto(photoData);
    }
  }, [photoData, setPhoto]);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  useEffect(() => {
    setError(!!error);
  }, [error, setError]);

  useEffect(() => {
    fetchPhoto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useRandomPhotoOnLoad;
