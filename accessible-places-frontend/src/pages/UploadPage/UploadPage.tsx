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
import { useContext, useEffect } from "react";
import { StepsContext } from "../../Context/StepsContext/StepsContext";
import { FinalForm } from "../../forms/FinalForm/FinalForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UploadFormContext } from "../../Context/UploadFormContext/UploadFormContext";
import { PlaceNameForm } from "../../forms/PlaceNameForm/PlaceNameForm";
export const UploadPage = () => {
  const { currentStep } = useContext(StepsContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { saveData } = useContext(UploadFormContext)
  const navigate = useNavigate();

  useEffect(() => {
    const lat = Number(searchParams.get('lat'))
    const lng = Number(searchParams.get('lng'))
    const poiName = searchParams.get('poi')

    if (lat && lng) {
      saveData({
        poiName: poiName ?? '',
        coordinates: {
          lat,
          lng
        }
      })
    }

    if (!lat || !lng) {
      navigate('/map')
    }
  }, [])
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
            <FinalForm />
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
          <PlaceNameForm />
        </Box>}
        {currentStep === 1 && <Box
          p={8}
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor={"gray.700"}
          borderRadius={10}
        >
          <ImageUpload />
        </Box>}
        {currentStep === 2 && <Box
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
