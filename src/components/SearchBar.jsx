import { useState } from "react";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  //검색어 저장해두는 useState

  const nav = useNavigate();

  const onChangeSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onClickSubmit();
    }
  };

  const onClickSubmit = () => {
    if (search.trim() === "") {
      //공백을 제거하고 ""아무것도 없을때 리턴
      return;
    }

    // console.log("초기화?", search);
    nav(`/search?query=${search}`);
    setSearch("");
  };

  return (
    <>
      <input
        type="text"
        placeholder="검색"
        className="SearchBar"
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
      />
    </>
  );
};
export default SearchBar;
