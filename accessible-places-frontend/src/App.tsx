import { Flex } from "@chakra-ui/react";
import { AppRouter } from "./AppRouter";
import { ConsentBar } from "./components/ConsentBar/ConsentBar";
import { Header } from "./components/Header/Header";
import { SideDrawerContextProvider } from "./Context/SideDrawerContext/SideDrawerContext";

function App() {
  return (
    <SideDrawerContextProvider>
      <Flex
        direction="column"
        align="center"
        m="0 auto"
        h="100vh"
        bgColor={"gray.900"}
      >
        <Header />
        <AppRouter />
        <ConsentBar />
      </Flex>
    </SideDrawerContextProvider>
  );
}

export default App;
