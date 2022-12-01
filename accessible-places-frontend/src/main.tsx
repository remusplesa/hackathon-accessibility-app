// React base imports
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Routing
import { BrowserRouter as Router } from "react-router-dom";

// Providers
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { AuthProvider } from "./components/AuthProvider";
import { PredictionProvider } from "./Context/PredictionContext/PredictionContext";
import theme from "./theme";
import { UploadFormProvider } from "./Context/UploadFormContext/UploadFormContext";
import { StepsProvider } from "./Context/StepsContext/StepsContext";

const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_BACKEND_GRAPHQL_URL,
  headers: {
    authorization: import.meta.env.VITE_BACKEND_AUTH_HEADER,
  },
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={theme}>
      <AuthProvider>
        <ApolloProvider client={apolloClient}>
          <PredictionProvider>
            <UploadFormProvider>
              <StepsProvider>
                <Router>
                  <App />
                </Router>
              </StepsProvider>
            </UploadFormProvider>
          </PredictionProvider>
        </ApolloProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
