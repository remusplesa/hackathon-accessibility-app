import { Routes, Route } from "react-router-dom";
import { MapPage } from "./pages/MapPage/MapPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { UploadPage } from "./pages/UploadPage/UploadPage";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { HomePage } from "./pages/HomePage/HomePage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/upload" element={<PrivateRoute />}>
        <Route path="/upload" element={<UploadPage />} />
      </Route>
      <Route path="/map" element={<PrivateRoute />}>
        <Route path="/map" element={<MapPage />} />
      </Route>
    </Routes>
  );
}
