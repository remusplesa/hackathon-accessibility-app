import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  SimpleGrid,
  Spacer,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../components/AuthProvider";
import { LogoutButton } from "../../components/LogoutButton/LogoutButton";

export const ProfilePage = () => {
  console.log("--- profile page ");
  const context = useContext(AuthContext);
  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"profile picture"}
            src={context.currentUser.photoURL}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {context.currentUser.displayName}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              email: {context.currentUser.email}
            </Text>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              phone: {context.currentUser.phoneNumber || "+40777777777"}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <Text
              color={useColorModeValue("gray.500", "gray.400")}
              fontSize={"2xl"}
              fontWeight={"300"}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
              aliquid amet at delectus doloribus dolorum expedita hic, ipsum
              maxime modi nam officiis porro, quae, quisquam quos reprehenderit
              velit? Natus, totam.
            </Text>
          </Stack>
          <Spacer />
         <LogoutButton />
        </Stack>
      </SimpleGrid>
    </Container>
  );
};
