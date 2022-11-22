import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./MapPage.styles.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export const MapPage = () => {
  const mapContainer = useRef<mapboxgl.Map | null>(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
   
  }, []);

  useEffect(() => {
    const currentMap = map.current as mapboxgl.Map | null;
    if (!currentMap) return; // wait for map to initialize
    currentMap.on("move", () => {
      setLng(currentMap.getCenter().lng.toFixed(4));
      setLat(currentMap.getCenter().lat.toFixed(4));
      setZoom(currentMap.getZoom().toFixed(2));
    });
  }, []);

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};
