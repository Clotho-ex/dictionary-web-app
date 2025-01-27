import { useState } from "react";
import NavBarComponent from "./Components/NavBar/NavBarComponent";
import SearchBarComponent from "./Components/SearchBar/SearchBarComponent";

function App() {
  const [wordData, setWordData] = useState(null);

  const handleSearchResult = (result) => {
    setWordData(result); // Update the state with the API result
  };
  return (
    <>
      <div className="mx-auto max-w-screen-xl text-center px-6 pt-6 sm:px-10 md:px-20">
        <NavBarComponent />
        <SearchBarComponent onSearchResult={handleSearchResult} />
      </div>
    </>
  );
}

export default App;
