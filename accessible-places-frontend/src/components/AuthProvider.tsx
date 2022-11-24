import { useEffect, useState, createContext } from "react";
import { User } from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = createContext<Context>({});

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    console.log("Rendered auth provider");
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

type Context = {
  currentUser?: User | null;
};
