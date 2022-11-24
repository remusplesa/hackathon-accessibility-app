import { Routes, Route } from "react-router-dom";
import { ImageUpload } from "./components/ImageUpload/ImageUpload";
import { MapPage } from "./pages/MapPage/MapPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { SideDrawerContextProvider } from "./Context/SideDrawerContext/SideDrawerContext";

function App() {
  return (
    <SideDrawerContextProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MapPage />} />
        <Route path="/upload" element={<PrivateRoute />}>
          <Route path="/upload" element={<ImageUpload />} />
        </Route>
        <Route path="/map" element={<PrivateRoute />}>
          <Route path="/map" element={<MapPage />} />
        </Route>
      </Routes>
    </SideDrawerContextProvider>
  );
}

export default App;
