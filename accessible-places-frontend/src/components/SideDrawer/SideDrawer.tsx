import React, { useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
} from "@chakra-ui/react";
import { useSideDrawerContext } from "../../Context/SideDrawerContext/SideDrawerContext";

export const SideDrawer = () => {
  const { isOpen, onClose } = useSideDrawerContext();

  console.log(isOpen);

  return (
    <Drawer size="md" isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create your account</DrawerHeader>

        <DrawerBody>
          <Input disabled value={"da"} />
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
