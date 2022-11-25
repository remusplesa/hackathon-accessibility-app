import { useEffect, useState, createContext } from "react";
import { User } from "firebase/auth";
import { auth } from "../firebase";
import { CircularProgress } from "@chakra-ui/react";

export const AuthContext = createContext<Context>({});

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pendingAuthCheck, setPendingAuthCheck] = useState<boolean>(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPendingAuthCheck(false);
    });
  }, []);

  if (pendingAuthCheck) {
    // onAuthStateChanged is async, we need to wait for the check to finish before rendering the Route / Protected Route
    // without waiting the Protected Route will redirect to login even if the user is logged in
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0",
          margin: "0",
          position: "fixed",
          top: "0",
          left: "0",
          backgroundColor: "gray.600",
        }}
      >
        <CircularProgress isIndeterminate color="green.300" size="100px" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

type Context = {
  currentUser?: User | null;
};
