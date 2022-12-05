import React from "react";
import "./App.css";
import { CaptchaComponent } from './components/CaptchaComponent';

function App() {
  return <div className="App">
    <form>
      <CaptchaComponent />
    </form>
  </div>;
}

export default App;
