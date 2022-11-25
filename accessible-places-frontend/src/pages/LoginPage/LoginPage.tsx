import { useState } from "react";
import { auth } from "../../firebase";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../../forms/LoginForm/LoginForm";

export const LoginPage = (props: any) => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: LocationState };
  const pathToRetun = state ? state.prevPath : "/";
  const [authing, setAuthing] = useState<boolean>(false);
  const signInWithGithub = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GithubAuthProvider())
      .then((response) => {
        console.log("This:", response.user.uid);
        navigate(pathToRetun);
      })
      .catch((err) => {
        console.log("Auth failed with:", err);
        setAuthing(false);
      });
  };

  return (
    <div>
      <LoginForm
        handleGithubLogin={signInWithGithub}
        isGithubLoginDisabled={authing}
      />
    </div>
  );
};

type LocationState = {
  prevPath: string;
};
