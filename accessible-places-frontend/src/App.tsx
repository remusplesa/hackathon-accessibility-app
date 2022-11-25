import { Flex } from "@chakra-ui/react";
import { AppRouter } from "./AppRouter";
import { Header } from "./components/Header/Header";
import { SideDrawerContextProvider } from "./Context/SideDrawerContext/SideDrawerContext";

function App() {
  return (
    <SideDrawerContextProvider>
      <Flex
        direction="column"
        align="center"
        maxW={{ xl: "1200px" }}
        m="0 auto"
      >
        <Header />
        <AppRouter />
      </Flex>
    </SideDrawerContextProvider>
  );
}

export default App;
