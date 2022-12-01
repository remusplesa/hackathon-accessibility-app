import { ImageUpload } from "../../forms/ImageUploadForm/ImageUpload";
import { convertBase64 } from "../../utils/utils";
import {

  Heading,
  SimpleGrid,
} from "@chakra-ui/react";


import { Steps } from "../../components/Steps/Steps";
import { Box } from "@chakra-ui/react";
import "./UploadPage.styles.css";
import { ImagePredictForm } from "../../forms/ImagePredictForm/ImagePredictForm";
import { useContext } from "react";
import { StepsContext } from "../../Context/StepsContext/StepsContext";

export const UploadPage = () => {
  const { currentStep } = useContext(StepsContext);

  return (
    <SimpleGrid columns={{ sm: 1, md: 1 }} spacing={10} className="steps-grid">
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
        {currentStep === 0 && <Box
          p={8}
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor={"gray.700"}
          borderRadius={10}
        >
          <ImageUpload />
        </Box>}
        {currentStep === 1 && <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius={10}
          w={'100%'}
        >
          <ImagePredictForm />
        </Box>}
      </Steps>
    </SimpleGrid>

  )
}
