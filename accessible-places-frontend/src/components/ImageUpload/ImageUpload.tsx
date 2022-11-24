import React, { useEffect, useState, useRef } from "react";
import {
  Input,
  FormControl,
  FormLabel,
  Button,
  CircularProgress,
  Image,
  Box,
  HStack,
} from "@chakra-ui/react";
import { useUploadUrl } from "../../logic/hooks/useUploadUrl";
import { makeXhrRequest } from "./helpers";
import { useToast } from "@chakra-ui/react";
import placeholderUrl from "../../assets/ImageUpload/ImagePlaceholder.svg";

export function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const fileInputRef = useRef<any>(null);
  const formRef = useRef<any>(null);
  const toast = useToast();
  const { getUploadUrl, loading, data, error } = useUploadUrl();

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      setFormError("");
    }
  };

  const uploadToAzure = (imageUrl: string) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(fileInputRef.current.files[0]);

    fileReader.onloadend = async (event) => {
      const target = event.target;
      if (target?.readyState == fileReader.DONE) {
        try {
          const response = await makeXhrRequest(
            target,
            imageUrl,
            fileInputRef.current.files[0].name,
            fileInputRef.current.files[0].type
          );

          if (response.success) {
            toast({
              title: "Image uploaded",
              description: "Successfuly uploaded the image!",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            formRef.current.reset();
            setSelectedFile(null);
            setPreviewUrl("");
            setFormError("");
          }
        } catch (error) {
          if (error) {
            toast({
              title: "An error occured",
              description: "Please try agian later!",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        }
      }
    };
  };

  const handleFormSubmit = (event: any) => {
    event?.preventDefault();
    if (data && selectedFile) {
      uploadToAzure(data);
    } else {
      setFormError("Please select an image first!");
    }
  };

  useEffect(() => {
    if (selectedFile && selectedFile.name) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(previewUrl);
      getUploadUrl({ fileName: selectedFile.name });
    }
  }, [selectedFile]);

  const openSelection = () => {
    fileInputRef.current.click();
  };

  return (
    <div style={{ width: 300 }}>
      <form onSubmit={handleFormSubmit} ref={formRef}>
        <FormControl>
          <FormLabel htmlFor="image-upload-input">Choose an image</FormLabel>
          <Input
            type="file"
            id="image-upload-input"
            onChange={handleFileSelection}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </FormControl>
        {!loading ? (
          <Box>
            <Box
              width={300}
              height={300}
              border={formError ? "1px solid red" : ""}
              borderRadius="lg"
            >
              <Image
                align={"center"}
                src={previewUrl || ""}
                alt="upload-image-preview"
                fallbackSrc={placeholderUrl}
                width={300}
                borderRadius={"lg"}
                objectFit={!selectedFile ? "fill" : "contain"}
                onClick={openSelection}
                cursor={"pointer"}
                shadow="xl"
                backgroundColor={"#e3e3e3"}
              />
            </Box>
            {formError && <p>{formError as string}</p>}
            <HStack>
              <Button size="md" type="submit">
                Upload
              </Button>
            </HStack>
          </Box>
        ) : (
          <Box
            width={300}
            height="300"
            border={formError ? "1px solid red" : ""}
            borderRadius="lg"
          >
            <CircularProgress isIndeterminate />
          </Box>
        )}
      </form>
    </div>
  );
}
