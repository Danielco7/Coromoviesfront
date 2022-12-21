import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAll, addObj, deleteObj, updateObj } from "../../utils";
// import "./SearchBar.css";
// import SearchIcon from "@material-ui/icons/Search";
// import CloseIcon from "@material-ui/icons/Close";

const urlsearch =
  "https://api.themoviedb.org/3/search/movie?api_key=839f4ba0e44105f4dc52e2a5d002041c&query=";

function SearchBar({ placeholder, data, input }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const Serch = async (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const { data: data1 } = await getAll(urlsearch + searchWord);
    const moviesarray = data1.results;
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(moviesarray);
    }
  };
  function Continue(e) {
    setFilteredData([]);
    setWordEntered("");
    input(e);
  }
  function Clear() {
    setWordEntered("");
    setFilteredData([]);
  }
  function display_all_movie() {
    if (wordEntered == "") {
      const names = [];
      setFilteredData(data);
    }
  }

  return (
    <div className="search1">
      <div className="searchInputs1">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onClick={display_all_movie}
          onChange={Serch}
        />{" "}
        <i onClick={Clear} className="clearable__clear">
          &times;
        </i>
        <br></br>
        <br></br>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 20).map(function (value, key) {
            return (
              <div
                className="dataItem"
                onClick={() => Continue(value)}
                target="_blank"
              >
                <p>{value.title}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
