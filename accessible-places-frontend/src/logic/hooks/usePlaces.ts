import { gql, ApolloError, useLazyQuery, useMutation } from "@apollo/client";
import { handleApolloError } from "../helpers/handleApolloError";
import { Place } from "../../utils/models";

const GET_PLACES = gql`
  query GET_PLACES($centerLat: Float!, $centerLng: Float!, $mocked: Boolean) {
    getPlaces (centerLat: $centerLat, centerLon: $centerLng, mocked: $mocked){
      _id
      poiName
      createdBy
      isAccessible
      photos {
        detections {
          class
          confidence
          id
          name
          xmax
          xmin
          ymax
          ymin
        }
        id
        url
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

const UPDATE_PLACE = gql`
mutation Mutation($options: PlaceUpdate!) {
  updatePlace(options: $options) {
    _id
    poiName
    isAccessible
    createdBy
    accesibilityDetails {
      elevator
      parking
    }
    coordinates {
      lat
      lng
    }
    photos {
      detections {
        class
        confidence
        id
        name
        xmax
        xmin
        ymax
        ymin
      }
      id
      url
    }
  }
}
`
export const useUpdatePlace = () => {
  const [updatePlace, { data, loading, error }] = useMutation(UPDATE_PLACE);
  handleApolloError("useUpdatePlace", error);

  return { updatePlace: (args: Place) => updatePlace({ variables: { options: { ...args } } }), data, loading, error }
}
export const useAddPlace = () => {
  const [addPlace, { data, loading, error }] = useMutation(ADD_PLACE);
  handleApolloError("useAddPlace", error);

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
