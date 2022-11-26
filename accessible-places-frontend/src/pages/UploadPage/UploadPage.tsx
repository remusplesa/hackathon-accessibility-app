import { useContext, useEffect, useState } from "react";
import { ImageUpload } from "../../components/ImageUpload/ImageUpload";
import { convertBase64 } from "../../utils/utils";
import { CircularProgress, Container, Heading, SimpleGrid } from '@chakra-ui/react'
import { usePredict } from "../../logic/hooks/usePredict";
import { PredictionContextType } from "../../utils/models";
import { PredictionContext } from "../../Context/PredictionContext/PredictionContext";
import ImagePredictionCard from "../../components/ImagePredictionCard/ImagePredictionCard";



import { Steps } from "../../components/Steps/Steps";
import { Box } from "@chakra-ui/react";

export const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<string>("");

  const { savePredictions } = useContext(PredictionContext) as PredictionContextType
  const [selectedFileRaw, setSelectedFileRaw] = useState<File | null>(null)
  const { data, loading, error } = usePredict(selectedFileRaw)

  const handleOnFileSelect = async (inputFile: File) => {
    setSelectedFileRaw(inputFile)

  };

  useEffect(() => {
    selectedFileRaw && convertBase64(selectedFileRaw).then(base64Img => setSelectedFile(base64Img as string))
  }, [selectedFileRaw])

  useEffect(() => {
    data && savePredictions(data)
  }, [data])

  return (

    <SimpleGrid columns={{ sm: 1, md: 1 }} spacing={10}>
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
        <SimpleGrid columns={{ sm: 1, md: 1 }} spacing={10}>

          <ImageUpload onSelect={handleOnFileSelect} />
          {
            loading ?
              <Container>
                <Heading as='h3' size='lg'>
                  Loading predictions..
                </Heading>
                <CircularProgress isIndeterminate color='green.300' />
              </Container>
              :
              <ImagePredictionCard selectedFile={selectedFile} />
          }
        </SimpleGrid>

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


    </SimpleGrid>
  );
};
