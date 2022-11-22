import { ApolloError } from "@apollo/client";

export const handleApolloError = (
  source: string,
  error: ApolloError | undefined
) => {
  if (!error) return;

  if (import.meta.env.DEV) {
    console.error(
      `Apollo Error in ${source}: ${JSON.stringify(error, undefined, " ")}`
    );
  }
};
