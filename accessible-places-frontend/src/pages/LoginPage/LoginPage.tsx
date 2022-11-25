import { useState } from "react";
import { auth } from "../../firebase";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

export const LoginPage = (props: any) => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: LocationState };

  const [authing, setAuthing] = useState<boolean>(false);
  console.log("pathname e ", state.prevPath);
  const signInWithGithub = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GithubAuthProvider())
      .then((response) => {
        console.log("This:", response.user.uid);
        navigate(state.prevPath);
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

type LocationState = {
  prevPath: string;
};
