import { Box, createIcon, Flex, Icon, keyframes } from '@chakra-ui/react';

export function PulsePin() {
    const size = '96px';
    const color = '#718096';
    const pulseRing = keyframes`
	0% {
    transform: scale(0.33);
  }
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
	`;

    return (
        <Box
            as="div"
            position="relative"
            w={size}
            h={size}
            _before={{
                content: "''",
                position: 'relative',
                display: 'block',
                width: '300%',
                height: '300%',
                boxSizing: 'border-box',
                marginLeft: '-100%',
                marginTop: '-100%',
                borderRadius: '50%',
                bgColor: color,
                animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
            }}>

            <Icon as={Pin} w={12} h={12} color='red.500' position={'absolute'} top={2} left={0} right={0} margin={'auto'} />
        </Box>
    );
}

export const Pin = createIcon({
    displayName: 'PinIcon',
    viewBox: '0 0 384 512',
    // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
    path: (
        <path
            fill='currentColor'
            xmlns="http://www.w3.org/2000/svg"
            d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z" />
    ),
})
