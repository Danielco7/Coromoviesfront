import React, { useEffect, useState } from "react";
import Logo from "../imgs/love_info.svg";
function Info_messge(props) {
  useEffect(() => {
    async function getdate() {}
    getdate();
  }, []);

  async function Edit() {
    props.Edit(props.user);
  }
  async function Delete() {
    props.Delete(props.user);
  }

  return (
    <div className="infomessge">
      <div className="tooltiptext">
        <img id="info_svg" className="svg_add_movie" src={Logo} />
        <h5>
          {props.messge1}
          <br></br>
          <br></br>
          {props.messge2}
        </h5>
      </div>
    </div>
  );
}

export default Info_messge;
