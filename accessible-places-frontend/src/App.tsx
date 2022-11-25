import { Flex } from "@chakra-ui/react";
import { AppRouter } from "./AppRouter";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <Flex
      direction="column"
      align="center"
      maxW={{ xl: "1200px" }}
      m="0 auto"
    >
      <Header />
      <AppRouter />
    </Flex>
  );
}

export default App;
