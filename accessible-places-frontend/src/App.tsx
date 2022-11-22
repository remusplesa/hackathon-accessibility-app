import { ImageUpload } from "./components/ImageUpload/ImageUpload";
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <div>Accessible Places - Frontend</div>}/>
      <Route path="/upload" element={ <ImageUpload />}/>
     
    </Routes>
  );
}

export default App;
