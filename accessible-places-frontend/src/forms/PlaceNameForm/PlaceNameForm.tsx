import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { StepsContext } from '../../Context/StepsContext/StepsContext';
import { UploadFormContext } from '../../Context/UploadFormContext/UploadFormContext';
import * as yup from "yup";
import { Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Text } from '@chakra-ui/react';
import { useNavigate, useSearchParams } from "react-router-dom";

const schema = yup.object().shape({
    poiName: yup.string().min(2, 'Name should have at least 2 characters').required('Plase enter name of location')
});
export const PlaceNameForm = () => {
    const { currentStep, setCurrentStep, totalSteps } = useContext(StepsContext);
    const { formData, saveData } = useContext(UploadFormContext)
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { register, handleSubmit, formState: { errors, touchedFields, isValid, isSubmitSuccessful } } = useForm({
        resolver: yupResolver(schema), mode: "all",
        defaultValues: {
            poiName: formData?.poiName
        }
    });

    useEffect(() => {
        const lat = Number(searchParams.get('lat'))
        const lng = Number(searchParams.get('lng'))

        if (!lat || !lng) {
            navigate('/map')
        }
    }, [])

    const onSubmit = async (data) => {
        const { poiName } = data
        saveData({ poiName })
        setCurrentStep(currentStep + 1)

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.poiName && touchedFields.poiName}>
                <FormLabel >Name of location</FormLabel>
                <Input
                    type="text"
                    defaultValue={formData?.poiName}
                    {...register("poiName")}
                />
                <FormHelperText>
                    {
                        formData?.coordinates ?
                            <>
                                <Text>
                                    Lat: {formData?.coordinates?.lat}
                                </Text>
                                <Text>
                                    Lat: {formData?.coordinates?.lng}
                                </Text>
                            </>
                            :
                            <></>
                    }

                </FormHelperText>
                <FormErrorMessage>
                    <>{errors.poiName?.message}</>
                </FormErrorMessage>
            </FormControl>

            <Flex gap="2" paddingY={8} w="100%" justifyContent="space-between">
                <Button
                    onClick={() => navigate(`/map`)}
                    variant="outline"
                >
                    Go back to Map
                </Button>
                <Button
                    type="submit"
                    colorScheme='green'
                    loadingText='Submitting'
                    disabled={currentStep === totalSteps || !isValid}
                >
                    Next
                </Button>
            </Flex>
        </form>
    );
}
