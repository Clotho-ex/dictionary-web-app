import { useState } from "react";
import "./App.css";
import NavBarComponent from "./Components/NavBar/NavBarComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBarComponent />
    </>
  );
}

export default App;
