import { Container, Heading, IconButton, Stack, Text, Image, Box, Flex, Button, Link, List, UnorderedList, ListItem, OrderedList } from '@chakra-ui/react'
import React from 'react'
import { PulsePin } from '../../components/PulsePin/PulsePin'
import Wallpaper from '../../assets/wallpaper.svg'
import TransparentMap from '../../assets/map-transparent.svg'
const HowItWorks = () => {
    return (
        <Container maxW={'7xl'} position='relative' >
            <Stack
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}
                direction={{ base: 'column', md: 'row' }}>
                <Stack flex={1} spacing={{ base: 5, md: 10 }} position={'relative'}>

                    <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        zIndex={2}
                        fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
                        <Text
                            as={'span'}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: '30%',
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                bg: '#397d50',
                                zIndex: -1,
                            }}>
                            Locate
                        </Text>
                        <br />
                        <Text as={'span'} >
                            accessible places
                        </Text>
                    </Heading>
                    <Text zIndex={2}>
                        To add or update a place images/description navigate to <Link href='map' textDecoration={'underline'}>map</Link>
                    </Text>
                    <UnorderedList>
                        <ListItem>
                            <Text>To add a new place : </Text>
                            <UnorderedList>
                                <ListItem>
                                    <Text>
                                        Double click on the map and it will redirect to upload form
                                    </Text>
                                </ListItem>
                            </UnorderedList>
                        </ListItem>
                        <ListItem>
                            <Text>
                                To update an existing location:
                            </Text>
                            <UnorderedList>
                                <ListItem>
                                    <Text>
                                        Click on location Pin and press on 'Edit place info' it will redirect to upload form
                                    </Text>
                                </ListItem>
                            </UnorderedList>
                        </ListItem>
                    </UnorderedList>

                </Stack>
                <Flex
                    flex={1}
                    justify={'center'}
                    align={'center'}
                    position={'relative'}
                >
                    <Image
                        alt={'Hero Image'}
                        fit={'contain'}
                        width={'400%'}
                        height={'200%'}
                        position={'absolute'}
                        transform={'translateX(-30%) translateY(-10%)'}
                        src={
                            TransparentMap
                        }
                    />
                    <Box
                        position={'relative'}
                        height={'300px'}
                        rounded={'2xl'}
                        boxShadow={'2xl'}
                        width={'full'}
                        backgroundColor='#2D3748                        '
                        overflow={'hidden'}>
                        <IconButton
                            aria-label={'pin'}
                            variant={'ghost'}
                            _hover={{ bg: 'transparent' }}
                            icon={<PulsePin />}
                            size={'lg'}
                            color={'white'}
                            position={'absolute'}
                            left={'50%'}
                            top={'50%'}
                            transform={'translateX(-50%) translateY(-50%)'}
                        />


                        <Image
                            alt={'Hero Image'}
                            fit={'cover'}
                            align={'center'}
                            w={'100%'}
                            h={'100%'}
                            src={
                                Wallpaper
                            }
                        />
                    </Box>


                </Flex>


            </Stack>

            <Stack
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}
                direction={{ base: 'column', md: 'row' }}>
                <Stack flex={1} spacing={{ base: 5, md: 10 }} position={'relative'}>

                    <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        zIndex={2}
                        fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
                        <Text
                            as={'span'}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: '30%',
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                bg: '#397d50',
                                zIndex: -1,
                            }}>
                            Fill form
                        </Text>
                        <br />
                        <Text as={'span'} >
                            with necessary data about the location
                        </Text>
                    </Heading>

                    <UnorderedList>
                        <ListItem>
                            <Text>Name of location  </Text>
                            <UnorderedList>
                                <ListItem>
                                    <Text>
                                        Fill the field with the name of location
                                    </Text>
                                </ListItem>
                            </UnorderedList>
                        </ListItem>
                        <ListItem>
                            <Text>
                                Upload images of location (entrance)
                            </Text>
                            <UnorderedList>
                                <ListItem>
                                    <Text>
                                        Each image should not exceed 2MB and have JPG/JPEG format
                                    </Text>
                                </ListItem>
                            </UnorderedList>
                        </ListItem>
                        <ListItem>
                            <Text>
                                Accessibility predictions
                            </Text>
                            <UnorderedList>
                                <ListItem>
                                    <Text>
                                        Each image will receive a list of predictions whether it contains ramps for wheelchairs
                                        or not and will draw a bounding box around the predictions
                                    </Text>
                                </ListItem>
                                <ListItem>
                                    <Text>
                                        If you want to modify bounding boxes from image :
                                    </Text>
                                    <OrderedList>
                                        <ListItem>
                                            <Text>
                                                Click Edit button
                                            </Text>
                                        </ListItem>
                                        <ListItem>
                                            <Text>
                                                Click on desired bounding box , you can resize or move the box around the image or if you want to delete it press 'delete' key
                                            </Text>
                                        </ListItem>
                                        <ListItem>
                                            <Text>
                                                To save the box press 'save' button
                                            </Text>
                                        </ListItem>
                                    </OrderedList>

                                </ListItem>
                                <ListItem>
                                    <Text>
                                        To submit the form , press 'next' and the data will be saved
                                    </Text>
                                </ListItem>
                                <ListItem>
                                    <Text>
                                        Return to the map , location will be added
                                    </Text>
                                </ListItem>

                            </UnorderedList>
                        </ListItem>
                    </UnorderedList>

                </Stack>

            </Stack>

        </Container >
    )
}

export default HowItWorks