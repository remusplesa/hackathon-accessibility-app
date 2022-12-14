import { Link, Text } from "@chakra-ui/react";

export const MenuItem = ({
  children,
  isFullWidth = false,
  to = "/",
  ...rest
}: Props) => {
  return (
    <Link color={"white"} href={to} width={isFullWidth ? "full" : ""}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

type Props = {
  children: React.ReactElement | string;
  isFullWidth?: boolean;
  to: string;
  pt?: string;
  pb?: string;
};
