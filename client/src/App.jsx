import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import Details from "./components/Details.jsx";
import About from "./components/About.jsx";
import "./main.css";

function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [showDetails, setShowDetails] = useState(false);
  const [drinkId, setDrinkId] = useState();
  const [toggleAbout, setToggleAbout] = useState(false);

  function toggleDetails() {
    setShowDetails(true);
  }

  function drinkIdFunction(id) {
    setDrinkId(id);
    console.log("APP.jsx line 21. id: ", id);
    console.log("APP.jsx line 22. drink: ", drinkId)
  }

  const showAbout = () => {
    setToggleAbout(true);
    setShowDetails(false); // Force-hide Details if About is requested
  };

  const notShowAbout = ()=>{
    setToggleAbout(false);
  }

  return (
    <>
      <Header showAbout={showAbout}/>
      {showDetails ? (
        <Details notShowAbout={notShowAbout} id={drinkId} />
      ) : toggleAbout ? <About showAbout={showAbout}/> : (
        <Home notShowAbout={notShowAbout}
          detailsFunction={toggleDetails}
          drinkIdFunction={drinkIdFunction}
        />
      )}
      <Footer showAbout={showAbout}/>
    </>
  );

  // const [count, setCount] = useState(0)
  // return (
  // <>
  //   <div>
  //     <a href="https://vite.dev" target="_blank">
  //       <img src={viteLogo} className="logo" alt="Vite logo" />
  //     </a>
  //     <a href="https://react.dev" target="_blank">
  //       <img src={reactLogo} className="logo react" alt="React logo" />
  //     </a>
  //   </div>
  //   <h1>Vite + React</h1>
  //   <div className="card">
  //     <button onClick={() => setCount((count) => count + 1)}>
  //       count is {count}
  //     </button>
  //     <p>
  //       Edit <code>src/App.jsx</code> and save to test HMR
  //     </p>
  //   </div>
  //   <p className="read-the-docs">
  //     Click on the Vite and React logos to learn more
  //   </p>
  // </>
  // )
}

export default App;
