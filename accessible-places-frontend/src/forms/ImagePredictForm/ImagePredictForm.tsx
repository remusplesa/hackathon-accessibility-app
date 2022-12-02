import React, { useContext, useEffect, useState } from 'react'
import { StepsContext } from '../../Context/StepsContext/StepsContext';
import { UploadFormContext } from '../../Context/UploadFormContext/UploadFormContext';
import ImagePredictionCard from '../../components/ImagePredictionCard/ImagePredictionCard';
import { Flex, Button, Spinner, Text } from '@chakra-ui/react';
import { usePredict } from '../../logic/hooks/usePredict';
import { PredictionContext } from '../../Context/PredictionContext/PredictionContext';
import { IPrediction, PredictionContextType } from '../../utils/models';
import { useUploadUrl } from '../../logic/hooks/useUploadUrl';
import { checkAccessibility, covertBoxToPrediction, uploadToAzure } from '../../utils/utils';
import { useAddPlace } from '../../logic/hooks/usePlaces';
import { AuthContext } from '../../components/AuthProvider';
import { v4 as uuidv4 } from 'uuid';

export function ImagePredictForm() {
    const { currentStep, setCurrentStep, totalSteps } = useContext(StepsContext);
    const { formData: { imageRaw, imageBase64, coordinates, poiName, boundingBoxes }, saveData } = useContext(UploadFormContext)
    const { getUploadUrl, loading: loadingUploadUrl } = useUploadUrl();
    const [submitting, setSubmitting] = useState(false)
    const { data, loading, error } = usePredict(imageRaw);
    const { predictions, savePredictions } = useContext(PredictionContext) as PredictionContextType
    const { addPlace, data: addPlaceData, error: addPlaceErr, loading: addPlaceLoading } = useAddPlace();
    const { currentUser: { displayName } } = useContext(AuthContext);



    const onSubmit = async () => {

        const imageArr = Array.from(imageRaw)
        const imageURLs: string[] = []
        const photos: {
            id: string;
            url: string;
            detections: IPrediction[];
        }[] = []

        setSubmitting(true)
        for (const [index, img] of imageArr.entries()) {

            const imgUrl = await getUploadUrl({ fileName: img.name })
            await uploadToAzure(imgUrl.data.getUploadLink.url, img)
            photos.push({
                id: `${poiName}_photo_${index}`,
                url: imgUrl.data.getUploadLink.url,
                detections: covertBoxToPrediction(boundingBoxes[index], predictions[index])
            })
            imageURLs.push(imgUrl.data.getUploadLink.url)
        }
        saveData({ imageUrl: imageURLs, predictions: predictions })
        await addPlace({
            coordinates,
            createdBy: displayName,
            isAccessible: checkAccessibility(predictions),
            photos,
            poiName,
        })
        setSubmitting(false)

        setCurrentStep(currentStep + 1)

    }

    useEffect(() => {
        data && savePredictions(data)
    }, [data])

    return (
        <Flex direction={'column'} justifyContent="space-between">
            {
                loading ?
                    <>
                        <Spinner />
                        <Text>Loading predictions...</Text>
                    </> :
                    <Flex gap={7} direction='column'>
                        {
                            imageRaw && Array.from(imageRaw).map((_image, id) => <ImagePredictionCard predictionID={id} selectedFile={imageBase64[id]} predictions={predictions[id]} key={`prediction_card_${id}`} />)
                        }
                    </Flex>
            }
            <Flex gap="2" paddingY={8} w="100%" justifyContent="space-between">
                <Button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    disabled={currentStep === 0}
                    variant="outline"
                >
                    Prev
                </Button>
                <Button
                    isLoading={submitting || addPlaceLoading}
                    onClick={() => onSubmit()}
                    colorScheme='green'
                    loadingText='Submitting'
                    disabled={currentStep === totalSteps}
                >
                    Next
                </Button>
            </Flex>
        </Flex>
    )
}
