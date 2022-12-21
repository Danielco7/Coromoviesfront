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
import Logo from "../../imgs/love_info.svg";
import Info_messge from "../info_messge";
import { get } from "mongoose";

// import Movieurl from '../../api/movies'

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
  const { x, y } = useWindowScroll();
  const [scrolled, setScrolled] = useState(0);
  const moviesection = useRef(null);

  const urlmovie = "http://ec2-54-209-155-37.compute-1.amazonaws.com:3001/api/Movies";

  useEffect(() => {
    let counter = 0;
    const checkdisplay = async () => {
      if (props.moviedisplay.length > 0) {
        const { data } = await getAll(urlmovie);
        const filtered = data.find((meb) => meb.name === props.moviedisplay);
        imgclick(filtered);
        counter = 1;
      }
    };
    const getmovies = async () => {
      const { data } = await getAll(urlmovie);
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
        const { data2 } = await addObj(urlmovie, e, key);
        const { data } = await getAll(urlmovie);
        setMovies(data);
        setBackUpMoviesArry(data);
      } catch (error) {
        alert(error);
      }
    } else {
      alert("This movie is allready in the collection");
    }
  };
  const Delete = async (e) => {
    if (BackUpMoviesArry.length > 7) {
      let key = {};
      key = localStorage.getItem("token");
      try {
        const { data: data1 } = await deleteObj(urlmovie, e._id, key);
        const { data } = await getAll(urlmovie);
        setMovies(data);
        setBackUpMoviesArry(data);
      } catch (error) {
        alert(error);
      }
    } else {
      alert("the number of movies is less then allowed ");
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
      const { data2 } = await updateObj(urlmovie, e._id, e, key);
      const { data } = await getAll(urlmovie);
      setMovies(data);
      setDisplayAllMovies(true);
      setDisplayAddMoviePage(false);
      setDisplayEditMoviePage(false);
    } catch (error) {
      alert(error);
      setDisplayAllMovies(true);
      setDisplayAddMoviePage(false);
      setDisplayEditMoviePage(false);
    }
    // const { data: data1 } = await updateObj(urlmovie, e._id, e);
    // const { data } = await getAll(urlmovie);
    // setMovies(data);
    // setDisplayAllMovies(true);
    // setDisplayAddMoviePage(false);
    // setDisplayEditMoviePage(false);
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
