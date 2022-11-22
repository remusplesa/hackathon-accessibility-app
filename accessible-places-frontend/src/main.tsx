// React base imports
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Routing
import { BrowserRouter as Router } from "react-router-dom";

// Providers
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

// Default stylesheet
import "./index.css";

const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_BACKEND_GRAPHQL_URL,
  headers: {
    authorization: "Basic dXNlcjpleG9kZXY=",
  },
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider resetCSS>
      <ApolloProvider client={apolloClient}>
        <Router>
          <App />
        </Router>
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>
);
