import React, { useEffect, useState } from "react";
import { getAll, addObj, getById, updateObj, deleteObj } from "../../utils";
import Newsubs from "./addsusb";
const urlsubs = "http://ec2-54-209-155-37.compute-1.amazonaws.com:3001/api/Subs";
const urlmembers = "http://ec2-54-209-155-37.compute-1.amazonaws.com:3001/api/Members";
const urlmovie = "http://ec2-54-209-155-37.compute-1.amazonaws.com:3001/api/Movies";

function MovieSubs(props) {
  const [All_Subs, setsubs] = useState(false);
  const [suber, setsuber] = useState({});
  const [subedmovies, setsubedmovies] = useState([]);
  const [allmovies, setallmovies] = useState([]);
  const [newsub, setnewsub] = useState(false);
  const [needtodel, setneedtodel] = useState([]);

  useEffect(() => {
    const getsubs = async () => {
      const { data } = await getAll(urlsubs);
      let filtered = data.find((meb) => meb.memberId === props.member._id);
      const allsubmovies = [];
      const allneedtosetsubs = [];

      if (filtered !== undefined) {
        setsuber(filtered);
        const movies = filtered.movies;
        for (let i = 0; i < movies.length; i++) {
          const elementt = movies[i];
          const { data } = await getById(urlmovie, elementt.movieId);
          if (data !== undefined) {
            const obj = {
              name: data.name,
              date: elementt.date,
            };
            if (obj.name !== undefined && new Date() <= new Date(obj.date))
              allsubmovies.push(obj);

            const obj2 = {
              movieId: elementt.movieId,
              date: elementt.date,
            };
            if (obj2.movieId !== undefined && new Date() <= new Date(obj2.date))
              allneedtosetsubs.push(obj2);
          }
        }
        filtered.movies = allneedtosetsubs;
        const { data } = await updateObj(urlsubs, filtered._id, filtered);
      }
      setsubedmovies(allsubmovies);
      setneedtodel(allneedtosetsubs);
      setsubs(true);
    };
    getsubs();
  }, []);

  const newsubscribe = async () => {
    const { data } = await getAll(urlmovie);
    setallmovies(data);
    setnewsub(true);
    setsubs(false);
  };
  const Addsub = async (e) => {
    const moviearr = suber.movies ?? [];
    moviearr.push(e);
    const obj = {
      memberId: props.member._id,
      movies: moviearr,
    };
    let key = {};
    key = localStorage.getItem("token");
    if (suber._id == undefined) {
      const { data } = await addObj(urlsubs, obj, key);
    } else {
      const { data } = await updateObj(urlsubs, suber._id, obj, key);
    }
    setnewsub(false);
    const { data } = await getAll(urlsubs);
    const filtered = data.find((meb) => meb.memberId === props.member._id);
    const allsubmovies = [];

    if (filtered !== undefined) {
      setsuber(filtered);
      const movies = filtered.movies;
      for (let i = 0; i < movies.length; i++) {
        const elementt = movies[i];
        const { data } = await getById(urlmovie, elementt.movieId);
        if (data !== undefined) {
          const obj = {
            name: data.name,
            date: elementt.date,
          };
          if (obj.name !== undefined) allsubmovies.push(obj);
        }
      }
    }
    setsubedmovies(allsubmovies);
    setsubs(true);
  };
  const showmovie = async (e) => props.movietoshow(e.target.innerHTML);

  const Cancel = async () => {
    setnewsub(false);
    setsubs(true);
  };

  return (
    <div>
      <h4>member subscribes</h4>
      <button className="membersbuttons" style={{}} onClick={newsubscribe}>
        Subscribe to a new movie
      </button>
      <br></br>
      <br></br>
      {newsub ? (
        <Newsubs movies={allmovies} addsub={Addsub} cancel={Cancel} />
      ) : null}
      {All_Subs ? (
        subedmovies.length > 0 ? (
          <ul className="subslist">
            {subedmovies.map((user, index) => {
              return (
                <li key={index}>
                  <span className={"movielist"} onClick={showmovie}>
                    {user.name}
                  </span>{" "}
                  : {user.date}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>no movies has been listed</p>
        )
      ) : null}
    </div>
  );
}

export default MovieSubs;
