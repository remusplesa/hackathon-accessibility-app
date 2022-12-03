import {
    Container,
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Button,
    Image,
    IconButton
} from '@chakra-ui/react';
import Wallpaper from '../../assets/wallpaper.svg'
import TransparentMap from '../../assets/map-transparent.svg'
import { PulsePin } from '../../components/PulsePin/PulsePin';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
    const navigate = useNavigate();

    return (

        <Container maxW={'7xl'} position='relative' overflow={"hidden"}>
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
                            Discover
                        </Text>
                        <br />
                        <Text as={'span'} >
                            accessible places
                        </Text>
                    </Heading>
                    <Text zIndex={2}>
                        Accessible places is a web platform that supports persons with disabilities in planning their next
                        trip through the city. Based on users' input, together with the output from an A.I. system,
                        locations of public interest such as hospitals, post offices, schools and so on are rated based on
                        their accessibility features. For example, a location having an access ramp is considered "Accessible",
                        while a location that only has stairs is labeled as being less accessible.
                        The goal is to help both users and institutions and, as a result, users keep track of
                        locations that they can easily visit while institutions are aware of their accessibility rating,
                        allowing them to improve it by taking the necessary actions.
                    </Text>
                    <Stack
                        spacing={{ base: 4, sm: 6 }}
                        direction={{ base: 'column', sm: 'row' }}>
                        <Button
                            rounded={'full'}
                            size={'lg'}
                            fontWeight={'normal'}
                            px={6}
                            color={["#4a9f66", "#4a9f66", "white", "white"]}
                            bg={["white", "white", "#4a9f66", "#397d50"]}
                            onClick={() => navigate('/map')}
                        >
                            Get started
                        </Button>
                        <Button
                            rounded={'full'}
                            size={'lg'}
                            fontWeight={'normal'}
                            px={6}
                        >
                            How It Works
                        </Button>
                    </Stack>

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

        </Container >
    );
}
