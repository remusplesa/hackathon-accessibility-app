import L from "leaflet";
import RedPin from "../../assets/red_pin.png";
import GreenPin from "../../assets/green_pin.png";

export const mapPin = (isAccessible: boolean) => {
  return new L.Icon({
    iconUrl: isAccessible ? GreenPin : RedPin,
    iconRetinaUrl: isAccessible ? GreenPin : RedPin,
    tooltipAnchor: [16, -10],
    iconSize: [24, 32],
  });
};
