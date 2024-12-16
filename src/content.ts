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
  },
  server: {
    saveImageExpiredByError: "The expires by date cannot be in the past.",
    missingData: "File or expiration time is missing.",
    saveImageSuccess: "Image uploaded successfully!",
    saveImageError: "Error uploading file:",
    internalServerError: "Internal Server Error",
  },
};

export default content;
