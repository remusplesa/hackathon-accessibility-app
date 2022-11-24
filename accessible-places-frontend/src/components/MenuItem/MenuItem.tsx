import { Link, Text } from "@chakra-ui/react";

export const MenuItem = ({ children, isLast = false, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};
