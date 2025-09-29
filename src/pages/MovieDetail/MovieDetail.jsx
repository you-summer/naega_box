import { useParams } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import MovieDetailTop from "./components/MovieDetailTop";
import MovieDetailContent from "./components/MovieDetailContent";
import MovieComment from "./components/MovieComment";
import useMovieDetail from "../../hooks/useMovieDetail";

export const MovieDatailStateContext = createContext();

const MovieDetail = () => {
  const { data } = useMovieDetail();

  if (!data) {
    return <div>로딩중!!</div>;
  }

  return (
    <MovieDatailStateContext.Provider value={data}>
      <div className="MovieDetail">
        <Header type={"CONTENTS"} />
        <MovieDetailTop />
        <MovieDetailContent />
        {/* {params.docid} MovieDetail */}
        <MovieComment />
      </div>
    </MovieDatailStateContext.Provider>
  );
};
export default MovieDetail;
