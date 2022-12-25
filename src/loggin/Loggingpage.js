import React, { useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import { getAll, updateObj, addObj, deleteObj } from "../utils";
import "../css/loginpage.css";
import Logo from "../imgs/love_info.svg";

const url = "http://ec2-54-209-155-37.compute-1.amazonaws.com:3001/api/Users";

function Logging({ history }) {
  const [User, setUser] = useState({ Username: "", Password: "" });
  const [user, setsignupUser] = useState({ username: "", password: "" });
  const [Username, setUsername] = useState("");
  const [Username2, setUsername2] = useState("");
  const [UsernameErr, setUsernameErr] = useState("");
  const [Password, setPassword] = useState("");
  const [Password2, setPassword2] = useState("");
  const [PasswordErr, setPasswordErr] = useState("");
  const [value, setvalue] = useState("");
  const [formContainer, setformContainer] = useState("0%");
  const [loginForm, setloginForm] = useState("0%");
  const [registerFrom, setregisterFrom] = useState("50%");

  const Login = async (form) => {
    let UsernameError = "";
    let PasswordError = "";
    if (form == "register") {
      if (!Username) {
        UsernameError = "Username field is required";
      }
      if (!Password) {
        PasswordError = "Password field is required ";
      }
    } else {
      if (!Username2) {
        UsernameError = "Username field is required";
      }
      if (!Password2) {
        PasswordError = "Password field is required ";
      }
    }
    if (PasswordError || UsernameError) {
      setUsernameErr(UsernameError);
      setPasswordErr(PasswordError);
      return false;
    }
    if (form == "register") {
      const { data } = await getAll(url);
      let found = data.find(function (element) {
        return element.username === User.Username;
      });

      if (found == undefined)
        alert(
          "The Username you try to reach doesn't exist in our system please try another"
        );
      else {
        found.password = User.Password;
        const requestOptions = (ur1, NewUser) => {
          fetch("http://ec2-54-209-155-37.compute-1.amazonaws.com:3001/api/Users/login", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(NewUser),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.msg === "all good") {
                localStorage.setItem("token", data.token);
                Signin();
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        };
        requestOptions("http://ec2-54-209-155-37.compute-1.amazonaws.com:3001/api/Users/login", found);
      }
    } else {
      Changepassword();
    }
  };
  const Signin = async () => {
    const loader = document.getElementById("loadingscreen");
    loader.style.opacity = "1";
    loader.style.zIndex = "2";

    const remove = async () => {
      const { data: data1 } = await getAll("/Movies");
      if (data1.length > 0) {
        for (let i = 0; i < data1.length; i++) {
          const element = data1[i];
          const { data: data11 } = await deleteObj("/Movies", element._id);
        }
      }

      const { data: data2 } = await getAll("/Members");
      if (data2.length > 0) {
        for (let i = 0; i < data2.length; i++) {
          const element = data2[i];
          const { data: data22 } = await deleteObj("/Members", element._id);
        }
      }

      const { data: data3 } = await getAll("/Users");
      if (data3.length > 0) {
        for (let i = 0; i < data3.length; i++) {
          const element = data3[i];
          const { data: data33 } = await deleteObj("/Users", element._id);
        }
      }
    };
    history.push(`/main/${User.Username}`);
  };

  const Changepassword = async () => {
    const { data } = await getAll("/Users");
    const usertobefound = data.find(function (eachuser) {
      return eachuser.username === user.username;
    });
    if (usertobefound == undefined) {
      alert(
        "The Username you try to reach doesn't exist in our system please try another"
      );
    } else {
      if (usertobefound.password == "") {
        if (user.password.length < 6)
          alert(
            "Your password is too short please make sure its over 6 letters"
          );
        else {
          let NewUser = usertobefound;
          NewUser.password = user.password;
          const id = NewUser._id;

          const requestOptions = (url, id, NewUser) => {
            fetch(`${url}/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ password: NewUser.password }),
            });
          };
          requestOptions(url, id, NewUser);
          alert("Your update has been saved!");
          if (window.innerWidth > 800) {
            setformContainer(`0%`);
          }
          setloginForm(`0%`);
          setregisterFrom(`50%`);
          setUsernameErr("");
          setPasswordErr("");
          setUser({ Username: "", Password: "" });
          setsignupUser({ username: "", password: "" });
        }
      } else
        alert(
          "it seems that the username you try to reach is already taken by someone else and it's not a new user anymore"
        );
    }
  };
  const switchForm = async(form) => {
    console.log('d');
    const { data: data2 } = await getAll("/Members");
    if (form == "register") {
      if (window.innerWidth > 800) {
        setformContainer(`50%`);
      }
      setloginForm(`-150%`);
      setregisterFrom(`-100%`);
    } else {
      if (window.innerWidth > 800) {
        setformContainer(`0%`);
      }
      setloginForm(`0%`);
      setregisterFrom(`50%`);
    }
    setUsernameErr("");
    setPasswordErr("");
    setUser({ Username: "", Password: "" });
    setsignupUser({ username: "", password: "" });
  };

  const login_guest = async (form) => {
    console.log('hi');
    console.log('hi2');
    const { data } = await getAll('https://pokeapi.co/api/v2/pokemon/ditto');
    console.log('bye');
    console.log(data);
    let found = data.find(function (element) {
      return element.username === "onlineguest";
    });
    if (found == undefined)
      alert(
        "The Username you try to reach doesn't exist in our system please try another"
      );
    else {
      found.password = User.Password;
      const requestOptions = (url, NewUser) => {
        NewUser.password = "123123123";
        fetch(`${url}/login`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(NewUser),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.msg === "all good") {
              localStorage.setItem("token", data.token);
              history.push(`/main/${"onlineguest"}`);
            } else {
              alert(data.msg);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };
      requestOptions(url, found);
    }
  };

  return (
    <div id="logginbody" className="logginbody">
      <div id="add_movie_continer"></div>
      <div id="parent" className="parent">
        <sup className="info">&#9432; </sup>
        <span className="tooltipcont">
          <div className="tooltiptext">
            <img id="info_svg" className="svg_add_movie" src={Logo} />
            <h1>Hello and welcome </h1>{" "}
            <h5>
              This site is a multi-function workers' environment that organizes
              movies, members, and employes in one place. I will be your guide.
              At any given moment you can simply hover over the info icon as
              shown.
              <sup>&#9432;</sup>
              <br></br>
              Here employes can log in to their account. If you don't have an
              the account you need to ask for the manager's help or simply log
              in as a guest.
            </h5>
          </div>
        </span>
        <div className="sign-in-img"></div>
        <div className="sign-up-img"></div>
        <div className="form-container" style={{ left: formContainer }}>
          <div
            className="form"
            id="sign-in-form"
            style={{ marginLeft: loginForm }}
          >
            <h1 className="title">Sign In</h1>
            <div className="fields">
              <input
                placeholder="Username"
                value={User.Username}
                onChange={(e) => {
                  setUser({ ...User, Username: e.target.value });
                  setUsername(e.target.value);
                }}
              />
              <br />
              <span className="text-danger">{UsernameErr}</span> <br />
              <input
                placeholder="Password"
                type="password"
                value={User.Password}
                onChange={(e) => {
                  setUser({ ...User, Password: e.target.value });
                  setPassword(e.target.value);
                }}
              />
              <br />
              <span className="text-danger">{PasswordErr}</span> <br />
            </div>
            <div className="sumbit-container">
              <button onClick={() => Login("register")}>Sign in</button>
              <br />
              <p className="link" onClick={() => switchForm("register")}>
                {" "}
                new employee? sign up here
              </p>
              <br />
              <p className="link" onClick={() => login_guest("login_guest")}>
                Sign in as a guest
              </p>
            </div>
          </div>

          <div
            className="form"
            id="sign-up-form"
            style={{ marginLeft: registerFrom }}
          >
            <h1 className="title">Sign Up</h1>
            <div className="fields">
              <input
                placeholder="Username"
                value={user.username}
                onChange={(e) => {
                  setsignupUser({ ...user, username: e.target.value });
                  setUsername2(e.target.value);
                }}
              />
              <br />
              <span className="text-danger">{UsernameErr}</span> <br />
              <input
                placeholder="Password"
                type="password"
                value={user.password}
                onChange={(e) => {
                  setsignupUser({ ...user, password: e.target.value });
                  setPassword2(e.target.value);
                }}
              />
              <br />
              <span className="text-danger">{PasswordErr}</span> <br />
            </div>
            <div className="sumbit-container">
              <button onClick={() => Login("login")}>sign up</button>
              <br />
              <p className="link" onClick={() => switchForm("login")}>
                already have an account? sign in here
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="loadingscreen" id="loadingscreen">
        <div className="loadingtext">loading...</div>
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
export default Logging;
