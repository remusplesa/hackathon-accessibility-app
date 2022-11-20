// React base imports
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Providers
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

// Default stylesheet
import "./index.css";

const apolloClient = new ApolloClient({
  uri: "http://localhost:4001/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider resetCSS>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>
);
