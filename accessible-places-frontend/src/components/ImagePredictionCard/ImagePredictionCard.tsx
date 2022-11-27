import { Box, Card, CardBody, CardHeader, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react'
import { PredictionContext } from '../../Context/PredictionContext/PredictionContext';
import { PredictionContextType, RAMP_COLOR, STAIRS_COLOR } from '../../utils/models';
import { convertImageToCanvas } from '../../utils/utils';
import { ShapeEditor } from '../ShapeEditor/ShapeEditor';

function ImagePredictionCard({ selectedFile }: Props) {
    const image = convertImageToCanvas(selectedFile);
    const { predictions } = useContext(PredictionContext) as PredictionContextType

    return (
        <>
            {
                image &&
                <Card variant={"outline"}>
                    <CardHeader>
                        <ShapeEditor selectedFile={image} />
                    </CardHeader>
                    <CardBody maxWidth={Number(image?.width) > 539 ? 539 : Number(image?.width)}>
                        <Stack mt='3' spacing='3'>
                            {
                                predictions && predictions[0]?.name.length > 0 &&
                                <>
                                    <Heading size='md'>Accessibility predictions</Heading>
                                    <Flex justifyContent={'space-between'}>
                                        {predictions?.map((prediction) => {
                                            return (
                                                <Box
                                                    border={'2px'}
                                                    borderColor={prediction.name.startsWith('stairs') ? STAIRS_COLOR : RAMP_COLOR}
                                                    p={3}
                                                    key={`${prediction.name}_${prediction.xmin}`}>
                                                    <Text textTransform={"capitalize"}>
                                                        ID: {`${prediction.name}_${prediction.ymin.toFixed(0)}_${prediction.ymax.toFixed(0)}`}
                                                    </Text>
                                                    <Text textTransform={"capitalize"}>
                                                        Detected: {prediction.name}
                                                    </Text>
                                                    <Text>
                                                        Confidence: {prediction.confidence.toFixed(2)}

                                                    </Text>
                                                </Box>
                                            )
                                        })}
                                    </Flex>
                                </>
                            }
                            {
                                predictions?.length === 0 &&
                                <>
                                    <Heading size='md'>Seems like this place doesn't have stairs or ramps </Heading>
                                    <Text>
                                        Try adding new picture with different angle or location
                                    </Text>
                                </>
                            }
                        </Stack>
                    </CardBody>

                </Card>
            }
        </>

    )
}
type Props = {
    selectedFile: string;
};

export default ImagePredictionCard