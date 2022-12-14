import { Avatar, Box, Button, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { MenuItem } from "../MenuItem/MenuItem";
import { ProfileAvatar } from "../ProfileAvatar/ProfileAvatar";

export const MenuLinks = ({ isOpen }: Props) => {
  const context = useContext(AuthContext);
  const isLogged: boolean =
    context?.currentUser?.displayName && context.currentUser.displayName !== "";
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "center", "flex-end", "flex-end"]}
        direction={["column", "column", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/map">Map</MenuItem>
        {isLogged && <ProfileAvatar />}
        {!isLogged && (
          <MenuItem to="/login" isFullWidth>
            <Button
             w={"full"}
             size={"sm"}
             rounded="md"
              color={["#4a9f66", "#4a9f66", "white", "white"]}
              bg={["white", "white", "#4a9f66", "#397d50"]}
              _hover={{
                bg: ["#67e491", "#67e491", "#397d50", "#397d50"],
              }}
            >
              Login
            </Button>
          </MenuItem>
        )}
      </Stack>
    </Box>
  );
};

type Props = {
  isOpen: boolean;
};
