import { useState } from "react";
import { Logo } from "../Logo/Logo";
import { MenuLinks } from "../MenuLinks/MenuLinks";
import { MenuToggle } from "../MenuToggle/MenuToggle";
import { NavBarContainer } from "../NavBarContainer/NavBarContainer";

export const Header = (props: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo />
      <MenuToggle onToggle={onToggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};
