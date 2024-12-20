const content = {
  imageUpload: {
    title: "Image Upload",
    fileLabel: "Select Image",
    expirationLabel: "Expiration Time",
    uploadButton: "Upload",
    successMessage: "Upload successful! Shareable link",
    errorMessage: "An error occurred while uploading.",
    selectFileWarning: "Please select a file and set an expiration time.",
    fileSelection: "Selected File",
    errorConsole: "Error uploading file",
  },
  imageDisplay: {
    error: "No image available",
    title: "Image ID",
    imageNotFound: "Image not found or has expired.",
    errorFetching: "An error occurred while fetching the image",
    expirationMessage: (daysLeft: number) =>
      daysLeft > 0
        ? `The link to this image will expire in ${daysLeft} day${
            daysLeft > 1 ? "s" : ""
          }.`
        : "The link to this image has already expired.",
  },
  server: {
    saveImageExpiredByError: "The expires by date cannot be in the past.",
    missingData: "File or expiration time is missing.",
    saveImageSuccess: "Image uploaded successfully!",
    saveImageError: "Error uploading file:",
    internalServerError: "Internal Server Error",
    imageNotFound: "Image not found",
    imageFound: "Successfully found image path",
    imageFileNotFound: "Image file not found",
    getImageError: "Error fetching image:",
    deleteImageError: "Error deleting expired images:",
  },
};

export default content;
