import React, { useState } from "react";

export function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState<any>();

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadFileHandler = () => {};

  return (
    <div>
      <label htmlFor="image-upload-input">Choose an image</label>
      <input
        type="file"
        id="image-upload-input"
        onChange={handleFileSelection}
      />
      <button onClick={uploadFileHandler}>Upload</button>
    </div>
  );
}
