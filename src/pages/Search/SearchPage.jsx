// import { Link, useLocation } from "react-router-dom";
import Header from "../../components/Header";
// import { useEffect, useState } from "react";
// import noImage from "../../assets/noImage.png";
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
