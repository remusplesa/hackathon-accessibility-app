import { Avatar, Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { LogoutButton } from "../LogoutButton/LogoutButton";

import { MenuItem } from "../MenuItem/MenuItem";

export const ProfileAvatar = () => {
  const context = useContext(AuthContext);

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar
          name={context.currentUser.displayName}
          src={context.currentUser.photoURL}
        />
      </MenuButton>
      <MenuList textAlign="center" p="10px">
        <MenuItem to="/profile" pt="20px">User Profile</MenuItem>
        <LogoutButton />
      </MenuList>
    </Menu>
  );
};
