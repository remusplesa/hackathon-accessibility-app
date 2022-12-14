import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { ReactComponent as GitHubLogo } from "../../assets/logo/github-icon-1.svg";

export default function LoginForm({
  handleGithubLogin,
  isGithubLoginDisabled,
}: Props) {
  return (
    <Flex width="full" align="center" justifyContent="center" height="full">
      <Box p={2} border="2px solid white" borderRadius={"15px"} padding={"10"}>
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="test@test.com" />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="*******" />
            </FormControl>
            <Button
              width="full"
              mt={4}
              type="submit"
              color={["#4a9f66", "#4a9f66", "white", "white"]}
              bg={["white", "white", "#4a9f66", "#397d50"]}
              _hover={{
                bg: ["#67e491", "#67e491", "#397d50", "#397d50"],
              }}
            >
              Sign In
            </Button>
          </form>
        </Box>
        <Flex width="full" justifyContent="center" gap={"15px"}>
          <Divider style={{ marginTop: "15px" }} />
          <Text fontSize="lg" fontWeight="bold">
            OR
          </Text>
          <Divider style={{ marginTop: "15px" }} />
        </Flex>
        <Box my={1} textAlign="center" paddingTop={"5"}>
          <Button
            aria-label="Github Login"
            size="lg"
            rightIcon={<GitHubLogo />}
            disabled={isGithubLoginDisabled}
            onClick={handleGithubLogin}
            color={["#4a9f66", "#4a9f66", "white", "white"]}
            bg={["white", "white", "#4a9f66", "#397d50"]}
            _hover={{
              bg: ["#67e491", "#67e491", "#397d50", "#397d50"],
            }}
          >
            GitHub
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}

type Props = {
  handleGithubLogin: () => {};
  isGithubLoginDisabled: boolean;
};
