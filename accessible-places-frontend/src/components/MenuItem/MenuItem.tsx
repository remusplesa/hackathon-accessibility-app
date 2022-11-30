import { Link, Text } from "@chakra-ui/react";

export const MenuItem = ({
  children,
  isLast = false,
  to = "/",
  ...rest
}: Props) => {
  return (
    <Link color={"white"} href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

type Props = {
  children: React.ReactElement | string;
  isLast?: boolean;
  to: string;
  pt?: string;
  pb?: string;
};
