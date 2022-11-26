import { LatLngExpression, circle } from "leaflet";
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

import { SideDrawer } from "../../components/SideDrawer/SideDrawer";
import { MyLocationPin } from "../../components/MyLocationPin/MyLocationPin";
import { useSideDrawerContext } from "../../Context/SideDrawerContext/SideDrawerContext";
import { usePlaces } from "../../logic/hooks/usePlaces";
import { Place } from "../../utils/models";
import "./MapPage.styles.css";

const MapLocationMarker = ({ onOpen, setCenter }: any) => {
  const map = useMap();
  const [myLocation, setMyLocation] = useState<LatLngExpression>([0, 0]);

  const eventMap = useMapEvents({
    moveend: () => {
      console.log("MAP CENTER MOVED", map.getCenter());
      setCenter(map.getCenter())
    },
  });

  useEffect(() => {
    map.locate({ setView: true });
    map.on("locationfound", handleFoundLocation);
  }, []);

  const handleFoundLocation = (event: any) => {
    const latLng = event.latlng ;
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

const AddNewPlaceHandler = () => {
  const map = useMapEvents({
    dblclick(e) {
      alert(`Add place @ ${e.latlng}`);
    },
  });
  return null;
};

const PlaceMarker = memo(({ place, onOpen, select }: PlaceMarkerProps) => {
  return (
    <>
      <Marker
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
  const { onOpen } = useSideDrawerContext();
  const [selected, setSelected] = useState<Place>();
  const [center, setCenter] = useState<{lat: number; lng:number}>();
  const {getPlaces, data, loading, error } = usePlaces()
  const debouncer = useCallback(_.debounce(getPlaces, 1000), []);

  useEffect(() => {
    debouncer({
      centerLat: center?.lat ?? 0,
      centerLng: center?.lng ?? 0,
      mocked: true,
    })
  }, [center])

  return (
    <>
      <MapContainer
        center={[51.505, -0.09]}
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
            key={place._id}
            onOpen={onOpen}
            select={setSelected}
            place={place}
          />
        ))}
        <MapLocationMarker onOpen={onOpen} setCenter={setCenter} />
        <AddNewPlaceHandler />
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
