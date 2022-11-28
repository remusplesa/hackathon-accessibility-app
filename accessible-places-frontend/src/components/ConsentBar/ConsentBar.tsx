import {
  Box,
  Button,
  CloseButton,
  Container,
  Icon,
  Square,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactComponent as CookieIcon } from "../../assets/logo/cookie.svg";
import { useEffect, useState } from "react";

export const ConsentBar = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [display, setDisplay] = useState(false);

  const createCookie = (name: string, value: string, days: number) => {
    if (typeof window !== "undefined") {
      let expires: string = "";
      if (days) {
        const date: Date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        // @ts-ignore
        expires = `; expires=${date.toGMTString()}`;
      }
      document.cookie = `${name}=${encodeURIComponent(
        value
      )}${expires}; path=/`;
    }
  };
  const readCookies = (name: string) => {
    if (typeof window !== "undefined") {
      const nameEQ: string = `${name}=`;
      const ca: string[] = document?.cookie.split(";");
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < ca.length; i++) {
        let c: string = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
          return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
      return false;
    }
    return false;
  };

  useEffect(() => {
    setDisplay(!readCookies("wheelerCookie"));
  }, []);

  const handleCookies = () => {
    setDisplay(false);
    createCookie("wheelerCookie", "cookiesOK", 9999);
  };

  return (
    <>
      {display && (
        <Box
          as="section"
          position="fixed"
          bottom={10}
          border="2px"
          borderColor={"#4a9f66"}
          borderRadius={"15px"}
        >
          <Box bg="bg-surface" boxShadow={useColorModeValue("sm", "sm-dark")}>
            <Container py={{ base: "4", md: "2.5" }} position="relative">
              <Stack
                direction={{ base: "column", sm: "row" }}
                justify="space-between"
                spacing={{ base: "3", md: "2" }}
              >
                <Stack
                  spacing="4"
                  direction={{ base: "column", md: "row" }}
                  align={{ base: "start", md: "center" }}
                  width={"full"}
                >
                  {!isMobile && <Icon as={CookieIcon} boxSize="12" />}{" "}
                  <Text fontWeight="medium" fontSize="sm">
                    We use cookies in our website to give you the most relevant
                    experience by remembering your preferences and repeat
                    visits. By clicking "Accept" you consent to the use of
                    cookies explicity.
                  </Text>
                </Stack>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  spacing={{ base: "3", sm: "2" }}
                  align={{ base: "stretch", sm: "center" }}
                >
                  <Button
                    size="sm"
                    rounded="md"
                    onClick={() => setDisplay(false)}
                  >
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    rounded="md"
                    color={["#4a9f66", "#4a9f66", "white", "white"]}
                    bg={["white", "white", "#4a9f66", "#397d50"]}
                    _hover={{
                      bg: ["#67e491", "#67e491", "#397d50", "#397d50"],
                    }}
                    onClick={handleCookies}
                  >
                    Accept
                  </Button>
                </Stack>
              </Stack>
            </Container>
          </Box>
        </Box>
      )}
    </>
  );
};
