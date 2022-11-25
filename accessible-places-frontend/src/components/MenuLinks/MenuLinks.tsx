import { Box, Button, Stack } from "@chakra-ui/react";
import { MenuItem } from "../MenuItem/MenuItem";

export const MenuLinks = ({ isOpen }: Props) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/map">map</MenuItem>
        <MenuItem to="/login" isLast>
          <Button
            size="sm"
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
      </Stack>
    </Box>
  );
};

type Props = {
  isOpen: boolean;
};
