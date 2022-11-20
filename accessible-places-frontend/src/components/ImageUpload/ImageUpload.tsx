import React, { useEffect, useState } from "react";
import {
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { useUploadUrl } from "../../logic/hooks/useUploadUrl";
import axios from "axios";

export function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState<any>();
  const { getUploadUrl, loading, data, error } = useUploadUrl();

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadFileHandler = () => {
    getUploadUrl({ fileName: selectedFile.name });
  };

  const uploadToAzure = async (imageUrl: string) => {
    // Create a body object that has form-data type
    const bodyFormData = new FormData();
    // Append the image key with the selectedFile value
    bodyFormData.append("image", selectedFile);

    const response = await axios.put(imageUrl, bodyFormData, {
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": "image/jpeg",
      },
    });

    console.log("Azure responded with: ", response);
    if (response.status === 201) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!loading && data) {
      // Check that this method works!
      uploadToAzure(data);
    }
  }, [loading, data]);

  return (
    <div>
      <FormControl>
        <FormLabel htmlFor="image-upload-input">Choose an image</FormLabel>
        <Input
          type="file"
          id="image-upload-input"
          onChange={handleFileSelection}
        />
        <FormHelperText>*Size must not exceed 2MB</FormHelperText>
      </FormControl>
      <Button size="md" onClick={uploadFileHandler}>
        Upload
      </Button>
    </div>
  );
}
