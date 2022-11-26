import { useState } from "react";
import { ImageUpload } from "../../components/ImageUpload/ImageUpload";
import { ShapeEditor } from "../../components/ShapeEditor/ShapeEditor";
import { convertBase64 } from "../../utils/utils";

import { Steps } from "../../components/Steps/Steps";
import { Box } from "@chakra-ui/react";

export const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<string>("");

  const handleOnFileSelect = async (inputFile: File) => {
    const base64Img = await convertBase64(inputFile);
    setSelectedFile(base64Img as string);
  };
  return (
    <>
      <Steps
        renderFinishComponent={() => (
          <Box
            h={300}
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundColor={"gray.700"}
            borderRadius={10}
          >
            Finished!
          </Box>
        )}
      >
        <Box
          h={300}
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor={"gray.700"}
          borderRadius={10}
        >
          Step - 1
        </Box>
        <Box
          h={300}
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor={"gray.700"}
          borderRadius={10}
        >
          Another Step - 2
        </Box>
        <Box
          h={300}
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor={"gray.700"}
          borderRadius={10}
        >
          Another Step - 3
        </Box>
      </Steps>
      <ImageUpload onSelect={handleOnFileSelect} />
      <ShapeEditor selectedFile={selectedFile} />
    </>
  );
};
