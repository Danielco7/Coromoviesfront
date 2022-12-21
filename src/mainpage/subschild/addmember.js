import React, { useState } from "react";

import Logo from "../../imgs/add_member.svg";

function AddMember(props) {
  const [Member, setMember] = useState(props.member);
  const [name, setname] = useState("");
  const [nameErr, setnameErr] = useState("");
  const [email, setemail] = useState("");
  const [emailErr, setemailErr] = useState("");
  const [city, setcity] = useState("");
  const [cityErr, setcityErr] = useState("");

  const Check_And_Send = async () => {
    let nameError = "";
    let emailError = "";
    let cityError = "";
    if (!name) {
      nameError = "Name field is required";
    }
    if (!email) {
      emailError = "Email field is required ";
    }
    if (!city) {
      cityError = "City field is required";
    }

    if (nameError || emailError || cityError) {
      setnameErr(nameError);
      setemailErr(emailError);
      setcityErr(cityError);
      return false;
    }
    document.getElementById("addbutton").disabled = true;
    props.add(Member);
  };

  const Cancel = async () => props.cancel();
  return (
    <div id="AddMember" className="AddMovie">
      <img id="member_svg" className="svg_add_movie" src={Logo} />
      <h1> New Member: </h1>
      <div className="AddMovieInput_cont">
        <div className="add_info_headers">Name: </div>
        <input
          className="AddMovieInput"
          onChange={(e) => {
            setMember({ ...Member, name: e.target.value });
            setname(e.target.value);
          }}
        />{" "}
        <br></br>
      </div>
      <span className="text-danger">{nameErr}</span> <br></br>
      <div className="AddMovieInput_cont">
        <div className="add_info_headers">Email: </div>
        <input
          className="AddMovieInput"
          onChange={(e) => {
            setMember({ ...Member, email: e.target.value });
            setemail(e.target.value);
          }}
        />
        <br></br>
      </div>
      <span className="text-danger">{emailErr}</span>
      <br></br>
      <div className="AddMovieInput_cont">
        <div className="add_info_headers">City: </div>
        <input
          className="AddMovieInput"
          onChange={(e) => {
            setMember({ ...Member, city: e.target.value });
            setcity(e.target.value);
          }}
        />
        <br></br>
      </div>
      <span className="text-danger">{cityErr}</span>
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
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddMember;
