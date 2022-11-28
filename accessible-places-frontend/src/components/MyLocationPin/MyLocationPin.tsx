import L from 'leaflet';
import marker from '../../assets/icons8-map-pin-48.png'

export const MyLocationPin = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    tooltipAnchor: [16, -10],
    iconSize: [48,48],     
});
