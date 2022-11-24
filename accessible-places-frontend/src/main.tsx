// React base imports
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Routing
import { BrowserRouter as Router } from "react-router-dom";

// Providers
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./components/AuthProvider";

const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_BACKEND_GRAPHQL_URL,
  headers: {
    authorization: import.meta.env.VITE_BACKEND_AUTH_HEADER,
  },
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider resetCSS>
        <ApolloProvider client={apolloClient}>
          <Router>
            <App />
          </Router>
        </ApolloProvider>
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
