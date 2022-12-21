import React, { useEffect, useState } from "react";
import { getAll, getAllapi } from "../../utils";
import Logo from "../../imgs/add_movie.svg";
import SearchBar from "./Search_new_movie";

const urlmovie =
  "https://api.themoviedb.org/3/discover/movie?api_key=839f4ba0e44105f4dc52e2a5d002041c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";

const urgeners =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=839f4ba0e44105f4dc52e2a5d002041c&language=en-US";
const urlimgs = "https://image.tmdb.org/t/p/w500";

function AddMovie(props) {
  const [nameErr, setnameErr] = useState("");
  const [genresErr, setgenresErr] = useState([]);
  const [imageErr, setimageErr] = useState("");
  const [premiredErr, setpremiredErr] = useState("");
  const [IDErr, setIDErr] = useState("");
  const [MovieToShow, setMovieToShow] = useState("");

  useEffect(() => {
    async function getmovies() {
      const { data } = await getAllapi(urlmovie);
      setMovieToShow(data.results);
    }
    getmovies();
  }, []);

  const Check_And_Send = async () => {
    for (let i = 0; i < genresErr.length; i++) {
      const element = genresErr[i];
    }
    let movie = {
      name: nameErr,
      genres: genresErr,
      image: imageErr,
      premired: premiredErr,
      id: IDErr,
    };
    document.getElementById("addbutton").disabled = true;
    props.add(movie);
  };

  const Cancel = async () => props.cancel();

  const inputdata = async (e) => {
    setgenresErr([]);
    setnameErr(e.title);
    for (let i = 0; i < e.genre_ids.length; i++) {
      const element = e.genre_ids[i];
      const { data } = await getAll(urgeners);
      const found = data.genres.find(({ id }) => id == element);
      setgenresErr((genresErr) => [...genresErr, `${found.name} `]);
    }
    setimageErr(e.poster_path);
    setpremiredErr(e.release_date);
    setIDErr(e.id);
    var window1 = document.getElementById("AddUser");
    var window2 = document.getElementById("AddUser2");
    window1.style.animation = "hide_left1 0.9s";
    window1.style.position = "absolute";
    window2.style.animation = "active_left1 0.9s";
    window2.style.animationFillMode = "forwards";
    window2.style.animationDelay = "0.2s";
  };
  const Undo = async (e) => {
    var window1 = document.getElementById("AddUser");
    var window2 = document.getElementById("AddUser2");
    window2.style.animation = "hide_right1 0.9s";
    window1.style.animation = "active_right1 0.9s";
    window1.style.animationFillMode = "forwards";
    window1.style.animationDelay = "0.2s";
  };

  return (
    <div className="add_new_user">
      <div id="AddUser" className="AddMovie">
        <SearchBar
          placeholder={"Search..."}
          data={MovieToShow}
          input={inputdata}
        />
        <img className="svg_add_movie" src={Logo} />

        <button className="AddMovieButtons" onClick={Cancel}>
          cancel
        </button>
      </div>

      <div className="EditMovie2" id="AddUser2">
        <img className="svg_add_movie" src={Logo} />
        <div className="undo" onClick={Undo}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 67 67"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M58.625 30.7083H17.9057L32.682 15.932L28.7346 11.9846L7.21924 33.5L28.7346 55.0154L32.682 51.068L17.9057 36.2917H58.625V30.7083Z"
              fill="white"
            />
          </svg>
        </div>
        <br></br>

        <span className="edit_img_cont">
          <img className="edit_img" src={urlimgs + imageErr} />
        </span>
        <br></br>
        <div className="movie_edit_info">
          <div className="AddMovieInput_cont">
            <div className="add_info_headers">Name: </div>
            <span>{nameErr}</span> <br></br>{" "}
          </div>

          <div className="AddMovieInput_cont">
            <div className="add_info_headers">Genres: </div>
            <span>{genresErr}</span>
            <br></br>
          </div>

          <div className="AddMovieInput_cont"></div>

          <div className="AddMovieInput_cont">
            <div className="add_info_headers">Premired: </div>
            <span>{premiredErr}</span>
            <br></br>
          </div>
          <br></br>
          <div className="AddMoviecontainer">
            <button
              className="AddMovieButtons"
              id="addbutton"
              onClick={Check_And_Send}
            >
              Add
            </button>
            <button className="AddMovieButtons" onClick={Cancel}>
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddMovie;
