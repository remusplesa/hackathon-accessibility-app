import { LatLngExpression, circle } from "leaflet";
import React, { useEffect, useState } from "react";
import { SideDrawer } from "../../components/SideDrawer/SideDrawer";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
  Circle,
  Tooltip,
} from "react-leaflet";
import { useDisclosure } from "@chakra-ui/react";
import "./MapPage.styles.css";

import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useSideDrawerContext } from "../../Context/SideDrawerContext/SideDrawerContext";

const CustomMarker = ({ onOpen }) => {
  const map = useMap();
  const [center, setCenter] = useState<LatLngExpression>([51.505, -0.09]);
  const [radius] = useState(500);

  const eventMap = useMapEvents({
    moveend: () => {
      console.log("MAP CENTER MOVED", map.getCenter());
    },
  });

  useEffect(() => {
    map.locate({ setView: true });

    map.on("locationfound", handleFoundLocation);
  }, []);

  const handleFoundLocation = (event: any) => {
    const latLng = event.latlng || center;
    setCenter(latLng);
    const circleZone = circle(latLng, radius);

    circleZone.addTo(map);
  };

  useEffect(() => {
    console.log("center", center);
  }, [center]);

  return (
    <>
      <Marker
        position={center}
        eventHandlers={{
          click: () => {
            onOpen();
            console.log("MAP CENTER", map.getCenter());
          },
        }}
      >
        <Tooltip direction="top" offset={[-15, -12]} opacity={1}>
          Top tooltip
        </Tooltip>
      </Marker>
      <Circle center={center} radius={radius} />
    </>
  );
};

export const MapPage = () => {
  const { onOpen } = useSideDrawerContext();

  return (
    <>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CustomMarker onOpen={onOpen} />
      </MapContainer>
      <SideDrawer />
    </>
  );
};
