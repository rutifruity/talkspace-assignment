import content from "@/content";
import { Image } from "@prisma/client";
import { useEffect, useState } from "react";

const useImageDisplay = (imageID: string | string[] | undefined) => {
  const [image, setImage] = useState<Image | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImageUrl = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/v1/images?imageID=${imageID}`);
      if (response.ok) {
        const data = await response.json();
        setImage(data.image);
      } else {
        setError(content.imageDisplay.imageNotFound);
      }
    } catch (error) {
      console.error(content.imageDisplay.errorFetching, error);
      setError(content.imageDisplay.errorFetching);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (imageID) {
      fetchImageUrl();
    }
  }, [imageID]);

  return { image, loading, error };
};

export default useImageDisplay;
