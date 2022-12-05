import React, { useState } from "react";
import "./App.css";
import { CaptchaComponent } from './components/CaptchaComponent';

function App() {
  const [isValid, setIsValid] = useState(false);

  function handleSubmit(e: any ) {
    e.preventDefault();
    console.log('Submitting form!')
  }

  return <div className="App">
    <form onSubmit={handleSubmit}>
      <CaptchaComponent setIsValid={setIsValid}/>
      <button disabled={!isValid} type="submit" >Submit</button>
    </form>
  </div>;
}

export default App;
