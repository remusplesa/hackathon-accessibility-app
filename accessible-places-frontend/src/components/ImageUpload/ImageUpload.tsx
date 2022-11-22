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
    fileReader.readAsArrayBuffer(fileInputRef.current.files[0]);

    fileReader.onloadend = async (event) => {
      const target = event.target;
      if (target?.readyState == fileReader.DONE) {
        var xhr = new XMLHttpRequest();
        var requestData = new Uint8Array(target!.result as any);

        xhr.open("PUT", imageUrl, true);
        xhr.responseType = "blob";
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("X-File-Name", fileInputRef.current.files[0].name);
        xhr.setRequestHeader("x-ms-blob-type", "BlockBlob");
        xhr.setRequestHeader(
          "Content-Type",
          fileInputRef.current.files[0].type || "application/octet-stream"
        );
        xhr.setRequestHeader(
          "x-ms-blob-content-type",
          fileInputRef.current.files[0].type || "application/octet-stream"
        );
        xhr.setRequestHeader("x-ms-version", "2016-05-31");

        xhr.send(requestData);
      }
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
