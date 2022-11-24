import { useState } from "react";
import { auth } from "../../firebase";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

export const LoginPage = (props: any) => {
  const navigate = useNavigate();
  const [authing, setAuthing] = useState<boolean>(false);

  const signInWithGithub = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GithubAuthProvider())
      .then((response) => {
        console.log("This:", response.user.uid);
        navigate("/map");
      })
      .catch((err) => {
        console.log("Auth failed with:", err);
        setAuthing(false);
      });
  };

  return (
    <div>
      <p>Login page!</p>
      <Button onClick={signInWithGithub} disabled={authing}>
        Sign in with github
      </Button>
    </div>
  );
};
