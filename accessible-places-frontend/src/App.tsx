import { Routes, Route } from "react-router-dom";
import { ImageUpload } from "./components/ImageUpload/ImageUpload";
import {MapPage} from "./pages/MapPage/MapPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Accessible Places - Frontend</div>} />
      <Route path="/upload" element={<ImageUpload />} />
      <Route path="/map" element={<MapPage />} />
    </Routes>
  ); 
}

export default App;
