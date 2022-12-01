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

export function HomePage() {
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
                        Aenean eu nunc id risus ultricies porttitor vitae nec nibh. Donec at nibh sit amet magna finibus malesuada at in diam. Proin ac dictum lectus. Proin mattis eu nisl eu sagittis. Etiam blandit venenatis lacus, et varius nulla ultrices id. Suspendisse potenti. Donec accumsan sollicitudin elit non vestibulum.
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
