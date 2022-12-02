import { gql, ApolloError, useLazyQuery, useMutation } from "@apollo/client";
import { handleApolloError } from "../helpers/handleApolloError";
import { Place } from "../../utils/models";

const GET_PLACES = gql`
  query GET_PLACES($centerLat: Float!, $centerLng: Float!, $mocked: Boolean) {
    getPlaces (centerLat: $centerLat, centerLon: $centerLng, mocked: $mocked){
      _id
      poiName
      isAccessible
      photos {
        id
        url        
        detections {
          id
          label
        }
      }
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

const ADD_PLACE = gql`
  mutation AddPlace($options: PlaceInput!) {
  addPlace(options: $options) {
    poiName
    isAccessible
    createdBy
    coordinates {
      lat
      lng
    }
    photos {
      id
      url
      detections {
        id
        xmax
        xmin
        ymax
        ymin
        name
        class
        confidence
      }
    }
    accesibilityDetails {
      parking
      elevator
    }
  }
}
`;

export const useAddPlace = () => {
  const [addPlace, { data, loading, error }] = useMutation(ADD_PLACE);

  return { addPlace: (args: Place) => addPlace({ variables: { options: { ...args } } }), data, loading, error }
}

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
