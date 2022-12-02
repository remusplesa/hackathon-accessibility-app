import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Button,
  Image,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CheckIcon, WarningIcon, AddIcon } from "@chakra-ui/icons";
import { useSideDrawerContext } from "../../Context/SideDrawerContext/SideDrawerContext";
import { Place } from "../../utils/models";

export const SideDrawer = (props: SideDrawerProps) => {
  const { isOpen, onClose } = useSideDrawerContext();
  const [selected, setSelected] = useState<number>(0);

  return (
    <Drawer size="md" isOpen={isOpen} placement="right" onClose={() =>{onClose(); setSelected(0)}}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader></DrawerHeader>

        <DrawerBody>
          <Stack spacing="2rem">
            <Heading
              as="h2"
              bgColor={"gray.800"}
              p={4}
              mt={2}
              borderRadius="lg"
            >
              {props.poiName ?? "Name here"}
            </Heading>
            {props.isAccessible ? (
              <Box>
                Is Accessible <CheckIcon />
              </Box>
            ) : (
              <Box>
                Not Accessible <WarningIcon />
              </Box>
            )}
            <Text>
              Coordinates [lat: {props.coordinates?.lat}, lng:{" "}
              {props.coordinates?.lng}]
            </Text>
            <Image
              objectFit={"cover"}
              h={"20rem"}
              borderRadius="lg"
              src={props.photos[selected]?.url }
              alt="place-photo"
            />
            <Stack direction={"row"} spacing="1rem">
              {props.photos.map((p, index) => (
                <Image
                  key={p.id}
                  objectFit={"cover"}
                  h="2rem"
                  src={p.url}
                  borderRadius='sm'
                  cursor="pointer"
                  onClick={() => setSelected(index)}
                  border={selected===index ? '2px' : '0px'}
                  borderColor="green.500"
                />
              ))}
            </Stack>
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <Button colorScheme="green" leftIcon={<AddIcon/>}>Add a new place</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

type SideDrawerProps = Place;
