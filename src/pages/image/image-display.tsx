import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ImagePage = () => {
  const router = useRouter();
  const { imageId: imageID } = router.query; // Access the imageId from the URL
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchImageUrl = async () => {
    try {
      const response = await fetch(`/api/v1/images?imageID=${imageID}`);
      if (response.ok) {
        const data = await response.json();
        console.log("data", data.url);
        setImageUrl(data.url);
      } else {
        setError("Image not found or has expired.");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      setError("An error occurred while fetching the image.");
    }
  };

  useEffect(() => {
    if (imageID) {
      fetchImageUrl();
    }
  }, [imageID]);

  return (
    <div>
      <h1>Image ID: {imageID}</h1>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`Image ${imageID}`}
          style={{ width: "300px", marginBottom: "20px" }}
        />
      ) : null}
    </div>
  );
};

export default ImagePage;
