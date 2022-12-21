import React, { useEffect, useState } from "react";

function Newsubs(props) {
  const [Movie, setMovie] = useState({});
  const [MovieInput, setMovieInput] = useState("");
  const [movieerr, setmovieErr] = useState("");
  const [DateInput, setDateInput] = useState("");
  const [dateerr, setdateErr] = useState("");
  const [mindate, setmindate] = useState("");

  useEffect(() => {
    const getmindate = async () => {
      var dtToday = new Date();
      var month = dtToday.getMonth() + 1;
      var day = dtToday.getDate();
      var year = dtToday.getFullYear();
      if (month < 10) month = "0" + month.toString();
      if (day < 10) day = "0" + day.toString();

      var minDate = year + "-" + month + "-" + day;
      setmindate(minDate);
    };
    getmindate();
  }, []);

  const handlechange = async (e) => {
    setMovieInput(e.target.value);
    setMovie({ ...Movie, movieId: e.target.value });
  };
  const Check_And_Send = async (e) => {
    let movieError = "";
    let dateError = "";

    if (!MovieInput) {
      movieError = "Movie field is required";
    }
    if (!DateInput) {
      dateError = "Date field is required ";
    }

    if (movieError || dateError) {
      setmovieErr(movieError);
      setdateErr(dateError);
      return false;
    }
    document.getElementById("addbutton").disabled = true;
    props.addsub(Movie);
  };
  const Cancel = async (e) => {
    props.cancel(e);
  };
  return (
    <div>
      Movie:
      <select className="AddSubsInput" onChange={handlechange}>
        <option disabled selected value>
          select an option
        </option>
        {props.movies.map((x, y) => (
          <option key={y} value={x._id}>
            {x.name}
          </option>
        ))}
      </select>
      <br></br>
      Date:{" "}
      <input
        className="AddSubsInput"
        min={mindate}
        type={"date"}
        onChange={(e) => {
          setMovie({ ...Movie, date: e.target.value });
          setDateInput(e.target.value);
        }}
      />
      <br></br>
      <span className="text-danger">{movieerr}</span>{" "}
      <span className="text-danger">{dateerr}</span> <br></br>
      <div className="moviecontainer">
        <button
          className="membersbuttons"
          id="addbutton"
          onClick={Check_And_Send}
        >
          add
        </button>
        <button className="membersbuttons" onClick={Cancel}>
          cencel
        </button>
      </div>
    </div>
  );
}
export default Newsubs;
