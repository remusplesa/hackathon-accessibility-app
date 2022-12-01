import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { StepsContext } from '../../Context/StepsContext/StepsContext';
import { UploadFormContext } from '../../Context/UploadFormContext/UploadFormContext';
import * as yup from "yup";
import ImagePredictionCard from '../../components/ImagePredictionCard/ImagePredictionCard';
import { Flex, Button, Spinner, Text } from '@chakra-ui/react';
import { usePredict } from '../../logic/hooks/usePredict';
import { PredictionContext } from '../../Context/PredictionContext/PredictionContext';
import { PredictionContextType } from '../../utils/models';
import { useUploadUrl } from '../../logic/hooks/useUploadUrl';
import { uploadToAzure } from '../../utils/utils';


export function ImagePredictForm() {
    const { currentStep, setCurrentStep, totalSteps } = useContext(StepsContext);
    const { formData: { imageRaw, imageBase64 } } = useContext(UploadFormContext)
    const { getUploadUrl, loading: loadingUploadUrl } = useUploadUrl();
    const [submitting, setSubmitting] = useState(false)
    const { data, loading, error } = usePredict(imageRaw);
    const { predictions, savePredictions } = useContext(PredictionContext) as PredictionContextType

    const onSubmit = async () => {

        const imageArr = Array.from(imageRaw)
        setSubmitting(true)
        for (const img of imageArr) {

            const imgUrl = await getUploadUrl({ fileName: img.name })
            await uploadToAzure(imgUrl.data.getUploadLink.url, img)

        }
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
                            predictions && predictions.map((prediction, id) => <ImagePredictionCard predictionID={id} selectedFile={imageBase64[id]} predictions={prediction} key={`prediction_card_${id}`} />)
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
                    isLoading={submitting}
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