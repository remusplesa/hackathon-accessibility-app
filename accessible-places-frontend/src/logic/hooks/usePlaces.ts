import { gql, ApolloError, useLazyQuery } from "@apollo/client";
import { handleApolloError } from "../helpers/handleApolloError";
import { Place } from "../../types";

const GET_PLACES = gql`
  query GET_PLACES($centerLat: Float!, $centerLng: Float!, $mocked: Boolean) {
    getPlaces (centerLat: $centerLat, centerLon: $centerLng, mocked: $mocked){
      poiName
      isAccessible
      photoUrl
      accesibilityDetails {
        parking
        elevator
      }
      coordinates {
        lat
        lng
      }
    }
  }
`;

export const usePlaces = (): PlacesQueryResult => {
  const [getPlaces, { loading, data, error }] = useLazyQuery(GET_PLACES);

  handleApolloError("usePlaces.ts", error);

  return {
    getPlaces: (args: QueryArgs) => getPlaces({ variables: args }),
    loading,
    data,
    error,
  }
};

type QueryArgs = {
  centerLat: number
  centerLng: number
  mocked: boolean
};

type RawResponse = {
  getPlaces: Place[] | undefined;
};

type PlacesQueryResult = {
  getPlaces: (args: QueryArgs) => void;
  loading?: boolean;
  data?: RawResponse;
  error?: ApolloError;
};
