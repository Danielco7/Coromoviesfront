// import { setegid } from 'process';
import React, { useEffect, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../imgs/add_worker.svg";
function AddUser(props) {
  const [user, setUser] = useState({});
  const [subscheck, setsubscheck] = useState(false);
  const [moviescheck, setmoviescheck] = useState(false);
  const [dissablesubs, setdissubs] = useState(false);
  const [dissablemovie, setdismovie] = useState(false);
  const [Permissions, setprem] = useState([]);
  const [Subs_Counter, setSubs_Counter] = useState(0);
  const [Movie_Counte, setMovie_Counte] = useState(0);
  const [fname, setfname] = useState("");
  const [fnameErr, setfnameErr] = useState("");
  const [Lname, setLname] = useState("");
  const [LnameErr, setLnameErr] = useState("");
  const [username, setusername] = useState("");
  const [usernameErr, setusernameErr] = useState("");
  const [date, setdate] = useState(false);

  useEffect(() => {
    const getdate = async () => {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      today = yyyy + "-" + mm + "-" + dd;
      setdate(today);
    };
    getdate();
  }, []);

  const handleChange = async (e) => {
    const array = Permissions;
    if (e.target.checked) array.push(e.target.name);
    else {
      const index = array.indexOf(e.target.name);
      if (index === -1) {
      } else array.splice(index, 1);
    }
    setprem(array);
  };

  const Check_And_Send = async () => {
    let fnameError = "";
    let LnameError = "";
    let usernameError = "";
    if (!fname) {
      fnameError = "first Name field is required";
    }
    if (!Lname) {
      LnameError = "Last Name field is required ";
    }
    if (!username) {
      usernameError = "UserName field is required";
    }
    if (fnameError || LnameError || usernameError) {
      setfnameErr(fnameError);
      setLnameErr(LnameError);
      setusernameErr(usernameError);
      return false;
    }
    let user = await props.allusers.find(
      (element) => element.username === username
    );
    if (user !== undefined) {
      usernameError = "Username is allready taken";
      setusernameErr(usernameError);
      return false;
    }
    var window1 = document.getElementById("AddUser");
    var window2 = document.getElementById("AddUser2");
    window1.style.animation = "hide_left1 0.8s";
    window1.style.position = "absolute";
    window2.style.animation = "active_left1 0.9s";
    window2.style.animationFillMode = "forwards";
    window2.style.animationDelay = "0.7s";
  };

  const Check_View_Subs = async (e) => {
    let counter = Subs_Counter;
    const array = Permissions;
    if (e.target.checked === true) {
      counter += 1;
      setSubs_Counter(counter);
    } else {
      counter -= 1;
      setSubs_Counter(counter);
    }
    if (counter === 0) {
      setdissubs(false);
      setsubscheck(false);
      const index = array.indexOf("View Subscriptions");
      if (index === -1)
        console.error(
          "checkbox was unchecked but had not been registered as checked before"
        );
      else array.splice(index, 1);
    } else {
      setdissubs(true);
      setsubscheck(true);
      const found = array.find(function (element) {
        return element === "View Subscriptions";
      });
      if (found === undefined) array.push("View Subscriptions");
      setprem(array);
    }
    handleChange(e);
  };
  const subschecks = async (e) => {
    setsubscheck(e.target.checked);
    handleChange(e);
  };
  const Check_View_Movie = async (e) => {
    let counter = Movie_Counte;
    const array = Permissions;
    if (e.target.checked === true) {
      counter += 1;
      setMovie_Counte(counter);
    } else {
      counter = counter - 1;
      setMovie_Counte(counter);
    }
    if (counter === 0) {
      setdismovie(false);
      setmoviescheck(false);
      const index = array.indexOf("View Movies");
      if (index === -1)
        console.error(
          "checkbox was unchecked but had not been registered as checked before"
        );
      else array.splice(index, 1);
    } else {
      setdismovie(true);
      setmoviescheck(true);
      const found = array.find(function (element) {
        return element === "View Movies";
      });
      if (found === undefined) array.push("View Movies");
      setprem(array);
    }
    handleChange(e);
  };
  const movieschecks = async (e) => {
    setmoviescheck(e.target.checked);
    handleChange(e);
  };
  const Send = async () => {
    document.getElementById("addbutton").disabled = true;
    user.premissions = Permissions;
    user.admin = false;
    user.created = date;
    user.password = "";
    props.add(user);
  };

  const Undo = async (e) => {
    var window1 = document.getElementById("AddUser");
    var window2 = document.getElementById("AddUser2");
    window2.style.animation = "hide_right1 0.9s";
    window1.style.animation = "active_right1 0.9s";
    window1.style.animationFillMode = "forwards";
    window1.style.animationDelay = "0.2s";
  };

  const Cancel = async () => props.cancel();

  return (
    <div className="add_new_user">
      <div id="AddUser" className="AddMovie" style={{ minheight: "140px" }}>
        <img className="svg_add_movie" src={Logo} />
        <h1> New worker: </h1>
        <div className="AddMovieInput_cont">
          <div className="add_info_headers">FirstName: </div>
          <input
            className="AddMovieInput"
            onChange={(e) => {
              setUser({ ...user, fname: e.target.value });
              setfname(e.target.value);
            }}
          />{" "}
          <br></br>
        </div>
        <span className="text-danger">{fnameErr}</span> <br></br>
        <div className="AddMovieInput_cont">
          <div className="add_info_headers">LastName: </div>
          <input
            className="AddMovieInput"
            onChange={(e) => {
              setUser({ ...user, Lname: e.target.value });
              setLname(e.target.value);
            }}
          />
          <br></br>
        </div>
        <span className="text-danger">{LnameErr}</span>
        <br></br>
        <div className="AddMovieInput_cont">
          <div className="add_info_headers">UserName: </div>
          <input
            className="AddMovieInput"
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
              setusername(e.target.value);
            }}
          />
          <br></br>
        </div>
        <span className="text-danger">{usernameErr}</span>
        <br></br>
        <div className="AddMoviecontainer">
          <button className="AddMovieButtons" onClick={Check_And_Send}>
            continue
          </button>
          <button className="AddMovieButtons" onClick={Cancel}>
            cancel
          </button>
        </div>
      </div>
      <div className="AddMovie1" id="AddUser2">
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
        Permissions: <br></br>
        <div className="AddMovieInput_cont">
          <div id="Permissions" className="add_info_headers">
            View Subscriptions{" "}
          </div>
          <input
            className="permission_inputs"
            type={"checkbox"}
            name={"View Subscriptions"}
            onChange={subschecks}
            checked={subscheck}
            disabled={dissablesubs}
          />
          <br></br>
        </div>
        <div className="AddMovieInput_cont">
          <div id="Permissions" className="add_info_headers">
            Create Subscriptions{" "}
          </div>
          <input
            className="permission_inputs"
            type={"checkbox"}
            name={"Create Subscriptions"}
            onChange={Check_View_Subs}
          />
          <br></br>
        </div>
        <div className="AddMovieInput_cont">
          <div id="Permissions" className="add_info_headers">
            Delete Subscriptions{" "}
          </div>
          <input
            className="permission_inputs"
            type={"checkbox"}
            name={"Delete Subscriptions"}
            onChange={Check_View_Subs}
          />
          <br></br>
        </div>
        <div className="AddMovieInput_cont">
          <div id="Permissions" className="add_info_headers">
            Update Subscription{" "}
          </div>
          <input
            className="permission_inputs"
            type={"checkbox"}
            name={"Update Subscription"}
            onChange={Check_View_Subs}
          />
          <br></br>
        </div>
        <div className="AddMovieInput_cont">
          <div id="Permissions" className="add_info_headers">
            View Movies{" "}
          </div>
          <input
            className="permission_inputs"
            type={"checkbox"}
            name={"View Movies"}
            onChange={movieschecks}
            checked={moviescheck}
            disabled={dissablemovie}
          />
          <br></br>
        </div>
        <div className="AddMovieInput_cont">
          <div id="Permissions" className="add_info_headers">
            Create Movies{" "}
          </div>
          <input
            className="permission_inputs"
            type={"checkbox"}
            name={"Create Movies"}
            onChange={Check_View_Movie}
          />
          <br></br>
        </div>
        <div className="AddMovieInput_cont">
          <div id="Permissions" className="add_info_headers">
            Delete Movies{" "}
          </div>
          <input
            className="permission_inputs"
            type={"checkbox"}
            name={"Delete Movies"}
            onChange={Check_View_Movie}
          />
          <br></br>
        </div>
        <div className="AddMovieInput_cont">
          <div id="Permissions" className="add_info_headers">
            Update Movie{" "}
          </div>
          <input
            className="permission_inputs"
            type={"checkbox"}
            name={"Update Movie"}
            onChange={Check_View_Movie}
          />
          <br></br>
        </div>
        <br></br>
        <div className="AddMoviecontainer">
          <button className="AddMovieButtons" id="addbutton" onClick={Send}>
            Add
          </button>
          <button className="AddMovieButtons" onClick={Cancel}>
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddUser;
