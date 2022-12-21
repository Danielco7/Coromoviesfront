import React, { useEffect, useState } from "react";
import { getAll } from "../utils";
import MoviesPage from "../mainpage/moviechild/moviespage";
import UsersPage from "./userschild/usersmangpage";
import SubsPage from "./subschild/subsmainpage";
import "../css/menu.css";
import Info_messge from "./info_messge";

function MainRouter({ match, history }) {
  const [name] = useState(match.params.name);
  const [user, setUser] = useState({});
  const [movies, setMovies] = useState(false);
  const [subs, setSubs] = useState(false);
  const [users, setUsers] = useState(false);
  const [Check_View_Movie_Permission, setCheck_View_Movie_Permission] =
    useState("");
  const [Check_View_Subs_Permission, setCheck_View_Subs_Permission] =
    useState("");
  const [User_To_Show, setUser_To_Show] = useState({});
  const [Movie_To_Show, setMovie_To_Show] = useState({});
  const [info, setInfo] = useState(false);
  const [messge1, setMessge1] = useState(
    "This is a page for movies where you can: view movies and their subscribers, add a new movie, edit & delete an existing movie with your given permission. "
  );
  const [messge2, setMessge2] = useState(
    "To add, edit and delete a movie, you simply click on the specific button. And if you want to view subscribers for a movie just click on that movie. "
  );

  useEffect(() => {
    async function getmovies() {
      const { data } = await getAll("/Users");
      const found = data.find(function (element) {
        return element.username === name;
      });
      setUser(found);
      const moviebutton = found.premissions.find(function (element) {
        return element === "View Movies";
      });
      setCheck_View_Movie_Permission(moviebutton);
      const subsbutton = found.premissions.find(function (element) {
        return element === "View Subscriptions";
      });
      setCheck_View_Subs_Permission(subsbutton);
      if (moviebutton === "View Movies") setMovies(true);
      if (moviebutton !== "View Movies") {
        if (subsbutton === "View Subscriptions") setSubs(true);
      }
    }
    getmovies();
  }, []);
  const Movies = async () => {
    setMovies(false);
    setMovie_To_Show({});
    setMovies(true);
    setSubs(false);
    setUsers(false);
    setMessge1(
      "This is a page for movies where you can: view movies and their subscribers, add a new movie, edit & delete an existing movie with your given permission. "
    );
    setMessge2(
      "To add, edit and delete a movie, you simply click on the specific button. And if you want to view subscribers for a movie just click on that movie."
    );
  };
  const Subs = async () => {
    setMovies(false);
    setSubs(true);
    setUsers(false);
    setMessge1(
      "This is the member's page where you mostly add new members and subscribe them to a movie they want. In addition you can edit or delete any existing member with your given permission."
    );
    setMessge2(
      "To add, edit or delete a member you simply click on the specific button. And if you want to subscribe a member to a movie, there is a section inside each member card."
    );
  };
  const Users = async () => {
    setMovies(false);
    setSubs(false);
    setUsers(true);
    setMessge1(
      "This is the employee's page where you can control and manage your employees. This page is mostly for the manager to add new employees to the company or edit and delete existing employees and their permissions."
    );
    setMessge2(
      "If you would like to add, edit or delete an employee you simply click on relevant button. The permissions you give to each employee will determine the access they have to the company site."
    );
  };
  const logout = async () => history.push(`/`);

  const showuser = async (e) => {
    setUser_To_Show(e);
    setMovies(false);
    setSubs(true);
  };

  const showmovie = async (e) => {
    setMovie_To_Show(e);
    setMovies(true);
    setSubs(false);
  };
  function refreshPage() {
    window.location.reload(false);
  }

  function mouseenter() {
    setInfo(true);
  }
  function mouseleave() {
    setInfo(false);
  }

  return (
    <div className="MainPage">
      {info ? <Info_messge messge1={messge1} messge2={messge2} /> : null}
      <div className="menu">
        <div className="logo_cont">
          {" "}
          <div className="logo" onClick={refreshPage}>
            coromovies
          </div>
          <sup
            className="info1"
            onMouseEnter={mouseenter}
            onMouseLeave={mouseleave}
          >
            &#9432;{" "}
          </sup>
        </div>
        <div id="nav">
          <a>
            {user.admin ? (
              <button onClick={Movies} className="ul">
                Movies
              </button>
            ) : Check_View_Movie_Permission === "View Movies" ? (
              <button onClick={Movies} className="ul">
                Movies
              </button>
            ) : null}
          </a>
          <a>
            {user.admin ? (
              <button onClick={Subs} className="ul">
                Members
              </button>
            ) : Check_View_Subs_Permission === "View Subscriptions" ? (
              <button onClick={Subs} className="ul">
                Members
              </button>
            ) : null}
          </a>
          <a>
            {user.admin ? (
              <button onClick={Users} className="ul">
                Workers
              </button>
            ) : null}
          </a>
          <a>
            {" "}
            <button onClick={logout} className="ul">
              Log Out
            </button>
          </a>
        </div>
      </div>

      {movies ? (
        <MoviesPage
          user={user}
          subs={Check_View_Subs_Permission}
          showmember={showuser}
          moviedisplay={Movie_To_Show}
        />
      ) : null}

      {subs ? (
        <SubsPage
          user={user}
          Movie_To_Show={showmovie}
          userdisplay={User_To_Show}
        />
      ) : null}

      {users ? <UsersPage /> : null}
    </div>
  );
}

export default MainRouter;
