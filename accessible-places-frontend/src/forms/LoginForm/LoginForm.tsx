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

export default function LoginForm({ handleGithubLogin, isGithubLoginDisabled }: Props) {
  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
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
            <Button width="full" mt={4} type="submit">
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
        <Box my={1} textAlign="center">
          <IconButton
            aria-label="Github Login"
            size="lg"
            icon={<GitHubLogo />}
            borderRadius={"18px"}
            disabled={isGithubLoginDisabled}
            onClick={handleGithubLogin}
          />
        </Box>
      </Box>
    </Flex>
  );
}

type Props = {
  handleGithubLogin: () => {};
  isGithubLoginDisabled: boolean;
};
