import React, { useState } from "react";
import Dashboard from "./Dashboard";
import CryptoProvider from "./contexts/CryptoContext";
import { MdLightMode, MdNightlight } from "react-icons/md";
import { color } from "chart.js/helpers";

const App = () => {
  const [theme, setTheme] = useState(true)
  return (
    <CryptoProvider>
      <div className="App" style={theme ? { background: 'white', color: "black", transition: '1s' } : { background: 'rgba(0,0,0,0.8)', transition: '1s' }}>
        <div class='navbar' style={theme?{background:'black'}:{background:'white'}}> 
          <div class='d-flex align-items-center  justify-content-between col-11 m-auto '>
            <h1 style={theme ? { color: "white", transition: '1s', fontFamily: "Dancing Script" } : { color: 'black', transition: '1s', fontFamily: "Dancing Script" }} >CRYPTO</h1>
            <button onClick={() => setTheme(!theme)} class={`btn fs-2 `} style={theme ? { color: "orange", transition: '1s' } : { color: 'gray', transition: '1s' }}>{theme ? <MdLightMode /> : <MdNightlight />}</button>
          </div>
        </div>
        <div style={{marginTop:'70px'}}>
        <Dashboard theme={theme} />
        </div>
      </div>
    </CryptoProvider>
  );
};

export default App;
