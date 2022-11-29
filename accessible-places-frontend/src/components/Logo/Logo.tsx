import { Box, Flex, Text, Link } from "@chakra-ui/react";
import { ReactComponent as AppLogo } from "../../assets/logo/logo.svg";

export const Logo = () => {
  return (
    <Link
      w="150px"
      style={{ textDecoration: "none" }}
      color={["white", "white", "#4a9f66", "#4a9f66"]}
      href={"/"}
    >
      <Flex gap={"10px"} align="center">
        <Box width={"50px"}>
          <AppLogo />
        </Box>
        <Text fontSize="lg" fontWeight="bold">
          Accessible Places
        </Text>
      </Flex>
    </Link>
  );
};
