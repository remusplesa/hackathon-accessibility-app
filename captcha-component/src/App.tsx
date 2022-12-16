import React, { useRef, useState } from "react";
import "./App.css";
import { CaptchaComponent } from './components/CaptchaComponent';

function App() {
  const [isValid, setIsValid] = useState(false);
  const nameRef = useRef<any>(null);

  function handleSubmit(e: any) {
    e.preventDefault();
    alert(`Submitting form! {name: ${nameRef.current?.value}}`);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit} style={{ width: 400, display: "flex", flexDirection: "column", gap: 16 }}>
        <input type={"text"} placeholder="name" ref={nameRef} />
        <CaptchaComponent setIsValid={setIsValid} />
        <button disabled={!isValid} type="submit" >Submit</button>
      </form>
    </div>
  )
}

export default App;
