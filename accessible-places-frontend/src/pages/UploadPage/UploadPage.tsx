import { useState } from "react";
import { ImageUpload } from "../../components/ImageUpload/ImageUpload";
import { ShapeEditor } from "../../components/ShapeEditor/ShapeEditor";
import { convertBase64 } from "../../utils/utils";

export const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<string>('');

  const handleOnFileSelect = async (inputFile: File) => {
    const base64Img = await convertBase64(inputFile)
    setSelectedFile(base64Img as string);
  };
  return (
    <>
      <ImageUpload onSelect={handleOnFileSelect} />
      <ShapeEditor selectedFile={selectedFile} />
    </>
  );
};
