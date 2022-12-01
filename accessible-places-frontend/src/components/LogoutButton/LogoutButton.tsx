import { Button } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

export const LogoutButton = () => {
  console.log("-- logut button ");
  const navigate = useNavigate();
  const handleLogout = async () => {
    signOut(auth).then((response) => {
        console.log("This: logout", response);
        navigate("/");
      })
      .catch((err) => {
        console.log("Auth failed with:", err);
        navigate("/");
      });

  }
  return (
    <Button
      w={"full"}
      mt={8}
      size={"lg"}
      py={"7"}
      rounded="md"
      color={["#4a9f66", "#4a9f66", "white", "white"]}
      bg={["white", "white", "#4a9f66", "#397d50"]}
      _hover={{
        bg: ["#67e491", "#67e491", "#397d50", "#397d50"],
      }}
      textTransform={"uppercase"}
      onClick={handleLogout}
    >
      LogOut
    </Button>
  );
};
