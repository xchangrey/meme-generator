import React from "react";
import Header from "./Header";
import MemeGenerator from "./MemeGenerator";
import "./styles.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <MemeGenerator />
    </div>
  );
};

export default App;