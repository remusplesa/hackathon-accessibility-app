import { LatLngExpression, circle } from "leaflet";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
  Circle,
} from "react-leaflet";
import "./MapPage.styles.css";

import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { ShapeEditor } from "../../components/ShapeEditor/ShapeEditor";

const CustomMarker = () => {
  const map = useMap();
  const [center, setCenter] = useState<LatLngExpression>([51.505, -0.09]);
  const [radius] = useState(5000);
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
            console.log("MAP CENTER", map.getCenter());
          },
        }}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Circle center={center} radius={radius} />
    </>
  );
};

export const MapPage = () => {
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
        <CustomMarker />
      </MapContainer>
      <button onClick={() => signOut(auth)}>Sign Out!</button>
    </>
  );
};
