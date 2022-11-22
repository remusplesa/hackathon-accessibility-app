import React, { useEffect, useState, useRef } from "react";
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
  const fileInputRef = useRef<any>(null);
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
    const fileReader = new FileReader();
    fileReader.readAsDataURL(fileInputRef.current.files[0]);
    fileReader.onload = async () => {
      console.log("Got the binary stirng: ", fileReader.result);
      const MB = 10000;
      const BloblFile = new Blob([fileReader.result!], {
        type: fileInputRef.current.files[0].type,
      });
      const BlobName = fileInputRef.current.files[0].name;
      if (BloblFile.size > MB) return new Error("File is too big!");

      const bodyFormData = new FormData();
      bodyFormData.append("file", BloblFile, BlobName);

      console.log("Body form data:", bodyFormData);

      const response = await axios.put(imageUrl, bodyFormData, {
        headers: {
          "x-ms-blob-type": "BlockBlob",
          "Content-Type": "image/jpeg",
        },
      });

      console.log("Azure responded with: ", response);
    };
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
          ref={fileInputRef}
        />
        <FormHelperText>*Size must not exceed 2MB</FormHelperText>
      </FormControl>
      <Button size="md" onClick={uploadFileHandler}>
        Upload
      </Button>
    </div>
  );
}
