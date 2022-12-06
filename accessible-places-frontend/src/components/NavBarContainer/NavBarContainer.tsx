import { Flex } from "@chakra-ui/react";

export const NavBarContainer = ({ children, ...props }: any) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      maxW="1920px"
      p={8}
      bg={["#4a9f66", "#4a9f66", "transparent", "transparent"]}
      color={["white", "white", "#83988b", "#83988b"]}
      zIndex={999}
      {...props}
    >
      {children}
    </Flex>
  );
};
