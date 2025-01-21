import { useState } from "react";
import NavBarComponent from "./Components/NavBar/NavBarComponent";
import SearchBarComponent from "./Components/SearchBar/SearchBarComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="mx-auto max-w-screen-xl text-center px-6 pt-6 sm:px-10 md:px-20">
        <NavBarComponent />
        <SearchBarComponent />
      </div>
    </>
  );
}

export default App;
