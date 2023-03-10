import React, { useEffect, useState, useRef } from "react";
import { useWindowScroll } from "react-use";
import { getAll, addObj, deleteObj, updateObj } from "../../utils";
import "../../css/moviepage.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import Movie from "./movie";
import AddMovie from "./addmovie";
import EditMovie from "./editmovie";
import ShowMovie from "./Movieshower";

import swal from "sweetalert";

SwiperCore.use([Navigation, Pagination]);
function MoviesPage(props) {
  const [Movies, setMovies] = useState({});
  const [MovieToShow, setMovieToShow] = useState({});
  const [BackUpMoviesArry, setBackUpMoviesArry] = useState({});
  const [Movietoedit, setMovietoedit] = useState({});
  const [DisplayAllMovies, setDisplayAllMovies] = useState(true);
  const [DisplayAddMoviePage, setDisplayAddMoviePage] = useState(false);
  const [DisplayEditMoviePage, setDisplayEditMoviePage] = useState(false);
  const [Check_Create_Movie_Permission, setCheck_Create_Movie_Permission] =
    useState("");
  useEffect(() => {
    let counter = 0;
    const checkdisplay = async () => {
      if (props.moviedisplay.length > 0) {
        console.log("hi");
        const { data } = await getAll("/Movies");

        const filtered = data.find((meb) => meb.name === props.moviedisplay);
        imgclick(filtered);
        counter = 1;
      }
    };
    const getmovies = async () => {
      console.log("hibye1");
      const { data } = await getAll("/Movies");
      console.log("hibye2");
      setMovies(data);
      setBackUpMoviesArry(data);
      if (counter === 0) {
        setDisplayAllMovies(true);
      }
    };
    const checkpossibility = async () => {
      const addbutton = props.user.premissions.find(function (element) {
        return element === "Create Movies";
      });
      setCheck_Create_Movie_Permission(addbutton);
    };
    checkdisplay();
    checkpossibility();
    getmovies();
  }, []);

  useEffect(() => {
    return function cleanUp() {
      setMovies();
      setBackUpMoviesArry();
      setDisplayAllMovies();
      setCheck_Create_Movie_Permission();
    };
  }, []);

  const allmovies = async () => {
    setDisplayAddMoviePage(false);
    setDisplayAllMovies(true);
    setDisplayEditMoviePage(false);
    setMovieToShow("");
  };

  const addmovie = async () => {
    setMovieToShow("");
    setDisplayAddMoviePage(true);
    setDisplayAllMovies(false);
    setDisplayEditMoviePage(false);
    setMovies(BackUpMoviesArry);
  };
  const addnewmovie = async (e) => {
    setDisplayAddMoviePage(false);
    setDisplayAllMovies(true);
    const found = Movies.find(({ image }) => image == e.image);
    if (found == undefined) {
      let key = {};
      key = localStorage.getItem("token");
      try {
        const { data2 } = await addObj("/Movies", e, key);
        const { data } = await getAll("/Movies");
        swal(
          "Movielist has been updated",
          `${e.name} has added to the list `,
          "success"
        );

        setMovies(data);
        setBackUpMoviesArry(data);
      } catch (error) {
        swal("Oops...", error, "error");
      }
    } else {
      swal("Oops...", "This movie is allready in the collection", "error");
    }
  };
  const Delete = async (e) => {
    if (BackUpMoviesArry.length > 7) {
      let key = {};
      key = localStorage.getItem("token");
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Movie",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          try {
            const { data: data1 } = await deleteObj("/Movies", e._id, key);
            const { data } = await getAll("/Movies");
            swal(
              "Movie deleted",
              `${e.name} has beem removed form the list`,
              "success"
            );
            setMovies(data);
            setBackUpMoviesArry(data);
          } catch (error) {
            swal("Oops...", error, "error");
          }
        }
      });
    } else {
      swal("Oops...", "the number of movies is less then allowed", "error");
    }
  };
  const Serch = async (e) => {
    if (e.target.value.length > 0) {
      const array = BackUpMoviesArry;
      const small = array
        .map((name) => name.name.toLowerCase())
        .filter((name) => name.includes(e.target.value.toLowerCase()));
      const res = array.filter((item) =>
        small.includes(item.name.toLowerCase())
      );
      setMovies(res);
    } else setMovies(BackUpMoviesArry);
  };

  const Editthismovie = async (e) => {
    setMovietoedit(e);
    setDisplayAllMovies(false);
    setDisplayAddMoviePage(false);
    setDisplayEditMoviePage(true);
    setMovieToShow("");
    setMovies(BackUpMoviesArry);
  };
  const updatemovie = async (e) => {
    let key = {};
    key = localStorage.getItem("token");
    try {
      const { data2 } = await updateObj("/Movies", e._id, e, key);
      const { data } = await getAll("/Movies");
      swal("Movie updated", `${e.name} has beem updated`, "success");
      setMovies(data);
      setDisplayAllMovies(true);
      setDisplayAddMoviePage(false);
      setDisplayEditMoviePage(false);
    } catch (error) {
      swal("Oops...", error, "error");
      setDisplayAllMovies(true);
      setDisplayAddMoviePage(false);
      setDisplayEditMoviePage(false);
    }
  };
  const membertoshow = async (e) => props.showmember(e);

  const imgclick = async (e) => {
    await setMovieToShow("");
    await setMovieToShow(e);
    await setDisplayAllMovies(false);
    window.scrollTo(0, 1000);
  };

  return (
    <div className="moviepage" id="moviepage1">
      <div className="container">
        <div id="imgbackground" />
        <h1 id="titlee">Movies</h1>
        <div>
          {DisplayAllMovies ? (
            props.user.admin ? (
              <button onClick={addmovie} className="btnn">
                add movie
              </button>
            ) : Check_Create_Movie_Permission === "Create Movies" ? (
              <button onClick={addmovie} className="btnn">
                add movie
              </button>
            ) : null
          ) : null}
        </div>
        {DisplayAllMovies ? (
          <div className="flexbox">
            <div className="search">
              <div>
                <input
                  type="text"
                  placeholder={"Search Movie"}
                  onChange={Serch}
                  required
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <br></br>
      {MovieToShow.name !== undefined ? (
        <div className="add_movie_continer">
          <ShowMovie
            cancel={allmovies}
            update={updatemovie}
            displaymember={membertoshow}
            movie={MovieToShow}
            user={props.user}
            subs={props.subs}
          />
        </div>
      ) : null}
      {DisplayAllMovies ? (
        <div className="innerswiper">
          {Movies.length > 0 ? (
            <div id="slider123">
              <Swiper
                spaceBetween={40}
                slidesPerView={5}
                centeredSlides
                centeredSlidesBounds
                freeMode={true}
                slidesOffsetBefore={0}
                slidesOffsetAfter={-770}
                navigation
                watchSlidesVisibility={true}
                breakpoints={{
                  320: {
                    width: 190,
                    slidesOffsetAfter: 370,
                    spaceBetween: 10,
                    slidesPerView: 1,
                  },
                  481: {
                    width: 190,
                    slidesOffsetAfter: 370,
                    spaceBetween: 10,
                    slidesPerView: 1,
                  },
                  640: {
                    width: 190,
                    slidesOffsetAfter: 370,
                    spaceBetween: 10,
                    slidesPerView: 1,
                  },
                  768: {
                    width: 540,
                    slidesPerView: 2,
                  },
                }}
              >
                {Movies.map((movie, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Movie
                        counter={index}
                        key={index}
                        movie={movie}
                        user={props.user}
                        subs={props.subs}
                        Delete={Delete}
                        Edit={Editthismovie}
                        displaymember={membertoshow}
                        imgclicker={imgclick}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>{" "}
            </div>
          ) : (
            <h2>No Movies</h2>
          )}
        </div>
      ) : null}

      {DisplayAddMoviePage ? (
        <div className="add_movie_continer">
          <AddMovie cancel={allmovies} add={addnewmovie} />
        </div>
      ) : null}
      {DisplayEditMoviePage ? (
        <div className="add_movie_continer">
          <EditMovie
            cancel={allmovies}
            update={updatemovie}
            movie={Movietoedit}
          />
        </div>
      ) : null}
    </div>
  );
}
export default MoviesPage;
