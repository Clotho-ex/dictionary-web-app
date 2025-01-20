import { useState } from "react";
import "./App.css";
import NavBarComponent from "./Components/NavBar/NavBarComponent";
import SearchBarComponent from "./Components/SearchBar/SearchBarComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBarComponent />
      <SearchBarComponent />
    </>
  );
}

export default App;
