import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider resetCSS>
      <div>Accessible Places - Frontend</div>
    </ChakraProvider>
  );
}

export default App;
