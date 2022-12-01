import { Box, Card, CardBody, CardHeader, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import React, { memo } from 'react'

import { IPrediction, RAMP_COLOR, STAIRS_COLOR } from '../../utils/models';
import { convertImageToCanvas } from '../../utils/utils';
import { ShapeEditor } from '../ShapeEditor/ShapeEditor';

const ImagePredictionCard = memo(
    function ImagePredictionCard({ selectedFile, predictions, predictionID }: Props) {
        const image = convertImageToCanvas(selectedFile);
        return (
            <>
                {
                    image &&
                    <Card variant={"outline"}>
                        <CardHeader>
                            <Flex gap={5} direction={'column'}>
                                <ShapeEditor selectedFile={image} predictions={predictions} predictionID={predictionID} />
                            </Flex>

                        </CardHeader>
                        <CardBody >
                            <Stack mt='3' spacing='3'>
                                {
                                    predictions &&
                                    <>
                                        <Heading size='md'>Accessibility predictions</Heading>
                                        <Flex justifyContent={'space-between'}>
                                            {predictions?.map((prediction) => {
                                                return (
                                                    <Box
                                                        border={'2px'}
                                                        borderColor={prediction?.name?.startsWith('stairs') ? STAIRS_COLOR : RAMP_COLOR}
                                                        p={3}
                                                        key={`${prediction?.name}_${prediction?.xmin}`}>
                                                        <Text textTransform={"capitalize"}>
                                                            ID: {`${prediction?.name}_${prediction?.ymin.toFixed(0)}_${prediction?.ymax.toFixed(0)}`}
                                                        </Text>
                                                        <Text textTransform={"capitalize"}>
                                                            Detected: {prediction?.name}
                                                        </Text>
                                                        <Text>
                                                            Confidence: {prediction?.confidence.toFixed(2)}

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
                                            You can add a new image or can continue with selected one
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
)
type Props = {
    selectedFile: string;
    predictions: IPrediction[];
    predictionID: number;
};

export default ImagePredictionCard