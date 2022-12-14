import { LatLngExpression } from "leaflet";
import { memo, useCallback, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
  Tooltip,
} from "react-leaflet";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Stack,
} from "@chakra-ui/react";

import { SideDrawer } from "../../components/SideDrawer/SideDrawer";
import { MyLocationPin } from "../../components/MyLocationPin/MyLocationPin";
import { mapPin } from "../../components/MapPin/MapPin";
import { useSideDrawerContext } from "../../Context/SideDrawerContext/SideDrawerContext";
import { usePlaces } from "../../logic/hooks/usePlaces";
import { Place } from "../../utils/models";
import "./MapPage.styles.css";

const DEFAULT_CENTER: LatLngExpression = [51.505, -0.09];

const MapLocationMarker = ({ onOpen, setCenter }: any) => {
  const map = useMap();
  const [myLocation, setMyLocation] = useState<LatLngExpression>([0, 0]);
  const navigate = useNavigate();

  useMapEvents({
    moveend: () => {
      console.log("MAP CENTER MOVED", map.getCenter());
      setCenter(map.getCenter());
    },
    dblclick(e) {
      navigate(`/upload?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  useEffect(() => {
    map.locate({ setView: true });
    map.on("locationfound", handleFoundLocation);
  }, []);

  const handleFoundLocation = (event: any) => {
    const latLng = event.latlng;
    setMyLocation(latLng);
  };

  return (
    <>
      <Marker
        icon={MyLocationPin}
        position={myLocation}
        eventHandlers={{
          click: () => {
            onOpen();
          },
        }}
      >
        <Tooltip direction="top" offset={[-15, -12]} opacity={1}>
          My location
        </Tooltip>
      </Marker>
    </>
  );
};

const PlaceMarker = memo(({ place, onOpen, select }: PlaceMarkerProps) => {
  return (
    <>
      <Marker
        icon={mapPin(place?.isAccessible)}
        position={place.coordinates}
        eventHandlers={{
          click: () => {
            onOpen();
            select(place);
          },
        }}
      >
        <Tooltip direction="top" offset={[-15, -12]} opacity={1}>
          {place.poiName}
        </Tooltip>
      </Marker>
    </>
  );
});

export const MapPage = memo(() => {
  const [selected, setSelected] = useState<Place>();
  const [center, setCenter] = useState<{ lat: number; lng: number }>();
  const [showGuide, setShowGuide] = useState(true);
  const { onOpen } = useSideDrawerContext();
  const { getPlaces, data, loading, error } = usePlaces();
  const debouncer = useCallback(_.debounce(getPlaces, 100), []);

  useEffect(() => {
    debouncer({
      centerLat: center?.lat || DEFAULT_CENTER[0],
      centerLng: center?.lng || DEFAULT_CENTER[1],
      mocked: false,
    });
  }, [center]);

  return (
    <>
      {showGuide && (
        <Stack position="fixed" bottom={10} opacity={99} zIndex={999}>
          <Alert
            status="info"
            variant="solid"
            bgColor={"green.200"}
            zIndex={999}
          >
            <AlertIcon />
            <AlertTitle>Add a new pin on the map</AlertTitle>
            <AlertDescription>
              Double Click a spot and follow the process
            </AlertDescription>
            <CloseButton paddingLeft={2} onClick={() => setShowGuide(false)} />
          </Alert>
        </Stack>
      )}
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={13}
        minZoom={12}
        scrollWheelZoom={false}
        className="map-container"
      >
        <TileLayer
          className="map-tiles"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data?.getPlaces?.map((place) => (
          <PlaceMarker
            key={`place-marker-${place._id ?? Math.random() * 100}`}
            onOpen={onOpen}
            select={setSelected}
            place={place}
          />
        ))}
        <MapLocationMarker onOpen={onOpen} setCenter={setCenter} />
      </MapContainer>
      {selected && <SideDrawer {...selected} />}
    </>
  );
});

type PlaceMarkerProps = {
  place: Place;
  onOpen: () => void;
  select: (e: any) => void;
};
