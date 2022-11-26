import React, { useEffect } from "react";
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
  Text
} from "@chakra-ui/react";
import { CheckIcon, WarningIcon } from '@chakra-ui/icons'
import { useSideDrawerContext } from "../../Context/SideDrawerContext/SideDrawerContext";
import { Place } from "../../types";

export const SideDrawer = (props: SideDrawerProps) => {
  const { isOpen, onClose } = useSideDrawerContext();

  console.log(isOpen);

  return (
    <Drawer size="md" isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>

        </DrawerHeader>

        <DrawerBody>
          <Stack spacing="2rem">
            <Heading as="h2" bgColor={"gray.800"} p={4} mt={2} borderRadius="lg">
              {props.poiName ?? "Name here"}
            </Heading>
            {props.isAccessible ?
              <Box>Is Accessible <CheckIcon /></Box> :
              <Box>Not Accessible <WarningIcon /></Box>}
            <Text>
              Coordinates [lat: {props.coordinates?.lat}, lng:{" "}
              {props.coordinates?.lng}]
            </Text>
            <Image
              objectFit={"cover"}
              h={"20rem"}
              borderRadius="lg"
              src={props.photoUrl}
              alt="place-photo"
            />
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

type SideDrawerProps = Place;
