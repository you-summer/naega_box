import Header from "../../components/Header";
import SearchList from "./components/SearchList";

const SearchPage = () => {
  return (
    <div className="SearchPage">
      <Header type={"MOVIE"} />
      <SearchList />
    </div>
  );
};

export default SearchPage;
