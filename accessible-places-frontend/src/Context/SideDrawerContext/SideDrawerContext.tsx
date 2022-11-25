import React, { useState, createContext, useContext } from "react";
import { useDisclosure } from "@chakra-ui/react";

export const SideDrawerContext = createContext<SideDrawerType>({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
});

export interface ISideDrawer {
  isOpen: boolean;
}

export type SideDrawerType = ISideDrawer & {
  onOpen: () => void;
  onClose: () => void;
};

export const SideDrawerContextProvider = ({ children }: Props) => {
  const [context, setContext] = useState<ISideDrawer>({ isOpen: false });

  const value = {
    ...context,
    onOpen: () => setContext({ isOpen: true }),
    onClose: () => setContext({ isOpen: false }),
  };

  return (
    <SideDrawerContext.Provider value={value}>
      {children}
    </SideDrawerContext.Provider>
  );
};

export const useSideDrawerContext = () => {
  return useContext(SideDrawerContext);
};

type Props = {
  children: any;
};
