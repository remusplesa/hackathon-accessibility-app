import { useLazyQuery, gql, ApolloError } from "@apollo/client";
import { handleApolloError } from "../helpers/handleApolloError";

const GET_UPLOAD_URL = gql`
  query GET_UPLOAD_LINK($fileName: String!) {
    getUploadLink(fileName: $fileName) {
      url
    }
  }
`;

const transformResponse = (originalResponse: RawResponse) => {
  if (!originalResponse) return;
  return originalResponse.getUploadLink.url;
};

export const useUploadUrl = (): UploadUrlQueryResult => {
  const [getUploadUrl, { loading, data, error }] = useLazyQuery(GET_UPLOAD_URL);

  handleApolloError("useUploadUrl.ts", error);

  return {
    getUploadUrl: (args: QueryArgs) => getUploadUrl({ variables: args }),
    loading,
    data: transformResponse(data),
    error,
  };
};

type QueryArgs = {
  fileName: string;
};

type RawResponse = {
  getUploadLink: {
    url: string;
  };
};

type UploadUrlQueryResult = {
  getUploadUrl: (args: QueryArgs) => void;
  loading?: boolean;
  data?: string;
  error?: ApolloError;
};
