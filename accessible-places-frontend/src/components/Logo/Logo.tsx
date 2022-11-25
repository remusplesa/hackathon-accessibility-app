import { Box, Flex, Text } from "@chakra-ui/react";
import { ReactComponent as AppLogo } from "../../assets/logo/logo.svg";

export const Logo = () => {
  return (
    <Box w="150px" color={["white", "white", "#4a9f66", "#4a9f66"]}>
      <Flex gap={"10px"} align="center">
        <Box width={"50px"}>
          <AppLogo />
        </Box>
        <Text fontSize="lg" fontWeight="bold">
          Accessible Places
        </Text>
      </Flex>
    </Box>
  );
};
