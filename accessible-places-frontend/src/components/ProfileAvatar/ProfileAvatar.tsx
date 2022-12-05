import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { LogoutButton } from "../LogoutButton/LogoutButton";

import { MenuItem } from "../MenuItem/MenuItem";

export const ProfileAvatar = () => {
  const context = useContext(AuthContext);
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <>
      {!isMobile && (
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
            <MenuItem to="/profile" pt="20px">
              {context?.currentUser?.displayName}
            </MenuItem>
            <LogoutButton />
          </MenuList>
        </Menu>
      )}
      {isMobile && (
        <>
          <MenuItem to="/profile" >
            Profile
          </MenuItem>
          <LogoutButton />
        </>
      )}
    </>
  );
};
