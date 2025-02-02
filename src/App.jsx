import NavBarComponent from "./Components/NavBar/NavBarComponent";
import SearchBarComponent from "./Components/SearchBar/SearchBarComponent";
import SearchedWordComponent from "./Components/SearchedWordComponent/SearchedWordComponent";
import WordDetailsComponent from "./Components/WordDetails/WordDetailsComponent";
import useDictionaryStore from "./store/dictionaryStore";

function App() {
  const { wordData, error, isLoading } = useDictionaryStore();

  return (
    <div className="mx-auto max-w-screen-xl text-center px-6 pt-6 sm:px-10 md:px-20">
      <NavBarComponent />
      <SearchBarComponent />
      {isLoading && (
        <div className="mt-12 text-lg font-semibold text-gray-600">
          Loading...
        </div>
      )}
      {!isLoading && error?.type && (
        <div className="mt-12">
        </div>
      )}
      {!isLoading && wordData && (
        <div className="mt-12 mb-2">
          <SearchedWordComponent />
          <WordDetailsComponent />
        </div>
      )}
    </div>
  );
}

export default App;
