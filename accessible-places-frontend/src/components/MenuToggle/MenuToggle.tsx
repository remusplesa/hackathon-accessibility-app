import { Box } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

export const MenuToggle = ({ onToggle, isOpen }: Props) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={onToggle}>
      {isOpen ? <CloseIcon /> : <HamburgerIcon />}
    </Box>
  );
};

type Props = {
  onToggle: () => void;
  isOpen: boolean;
};
