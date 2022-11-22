import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "./MapPage.styles.css";

const CustomMarker = () => {
  const map = useMap();
  const eventMap = useMapEvents({
    moveend: () => {
        console.log("MAP CENTER MOVED", map.getCenter());
    }
  })

  return (
    <Marker
      position={[51.505, -0.09]}
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
  );
};

export const MapPage = () => {
  return (
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
      <CustomMarker/>
    </MapContainer>
  );
};
