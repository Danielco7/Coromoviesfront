import React, { useEffect, useState } from "react";
const urlimgs = "https://image.tmdb.org/t/p/w500";

function Movie(props) {
  const [CheckUpadteButton, setCheckUpadteButton] = useState("");
  const [CheckDeleteButton, setCheckDeleteButton] = useState("");
  const [Checksubs, setChecksubs] = useState(false);

  useEffect(() => {
    async function getmovies() {
      const Updatebutton = props.user.premissions.find(function (element) {
        return element === "Update Movie";
      });
      setCheckUpadteButton(Updatebutton);
      const Deletebutton = props.user.premissions.find(function (element) {
        return element === "Delete Movies";
      });
      setCheckDeleteButton(Deletebutton);
    }
    getmovies();
  }, []);
  const Edit = async () => props.Edit(props.movie);

  const Delete = async () => props.Delete(props.movie, props.counter);

  const ShowMember = async (e) => props.displaymember(e);

  const showsubs = () => {
    setChecksubs(!Checksubs);
  };

  const ShowMovie = async () => props.imgclicker(props.movie);

  return (
    <div className="movies">
      <h3 className="header">{props.movie.name}</h3>
      <div className="imgcont">
        <img
          className="imges"
          src={urlimgs + props.movie.image}
          onClick={ShowMovie}
        />
      </div>{" "}
      <br></br>
      <div className="moviecontainer">
        {props.user.admin ? (
          <button className="moviebuttons" onClick={Edit}>
            edit
          </button>
        ) : CheckUpadteButton === "Update Movie" ? (
          <button className="moviebuttons" onClick={Edit}>
            edit
          </button>
        ) : null}
        {props.user.admin ? (
          <button
            className="moviebuttons"
            onClick={() => {
                Delete();
            }}
          >
            delete
          </button>
        ) : CheckDeleteButton === "Delete Movies" ? (
          <button
            className="moviebuttons"
            onClick={() => {
                Delete();
            }}
          >
            delete
          </button>
        ) : null}
      </div>
    </div>
  );
}
export default Movie;
