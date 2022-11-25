import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const ConsentBar = () => {
  const [display, setDisplay] = useState<boolean>(false);
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const [userCanceled, setUserCanceled] = useState<boolean>(false);
  const toast = useToast();
  const createCookie = (name: string, value: string, days: number) => {
    if (typeof window !== "undefined") {
      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        // @ts-ignore
        expires = `; expires=${date.toGMTString()}`;
      }
      document.cookie = `${name}=${encodeURIComponent(
        value
      )}${expires}; path=/`;
    }
  };
  const readCookies = (name: string) => {
    console.log("--- citesc cookie");
    if (typeof window !== "undefined") {
      const nameEQ = `${name}=`;
      const ca = document?.cookie.split(";");
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
          return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
      return false;
    }
    return false;
  };

  useEffect(() => {
    setDisplay(!readCookies("wheelerConsent"));
  }, []);

  const handleCookies = () => {
    createCookie("wheelerConsent", "cookiesOK", 9999);
    setDisplay(false);
  };

  const renderBar = () => {
    if (!isToastVisible && !userCanceled) {
     setIsToastVisible(true);
      toast.closeAll();
      toast({
        title: "Current Time.",
        description: `Time ${new Date()}`,
        status: "success",
        isClosable: true,
        
        onCloseComplete: () => {
          setUserCanceled(true);
          setIsToastVisible(false);
        },
      });
    }
  };
  return <>{display && renderBar()}</>;
};
