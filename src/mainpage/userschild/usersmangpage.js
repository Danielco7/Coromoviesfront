import React, { useEffect, useState } from "react";
import { getAll, addObj, updateObj, deleteObj } from "../../utils";
import User from "./user";
import EditUser from "./edituser";
import AddUser from "./adduser";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import swal from "sweetalert";

function UsersPage(props) {
  const [Users, setusers] = useState({});
  const [allUsers, setallusers] = useState({});
  const [usertoedit, setuser] = useState({});
  const [checkusers, setcheckusers] = useState(false);
  const [checkedit, setcheckedit] = useState(false);
  const [checknewuser, setchecknewuser] = useState(false);

  useEffect(() => {
    async function getusers() {
      const { data } = await getAll("/Users");
      await setallusers(data);
      data.splice(0, 2);
      await setusers(data);
      await setcheckusers(true);
    }
    getusers();
  }, []);
  useEffect(() => {
    return function cleanUp() {
      setusers();
      setuser();
      setcheckusers();
      setchecknewuser();
      setcheckedit();
    };
  }, []);

  async function allusers() {
    await setcheckusers(true);
    await setcheckedit(false);
    await setchecknewuser(false);
  }

  async function adduser() {
    await setcheckusers(false);
    await setcheckedit(false);
    await setchecknewuser(true);
  }
  async function Edit(e) {
    await setuser(e);
    await setcheckedit(true);
    await setcheckusers(false);
  }
  async function Update(e) {
    let key = {};
    key = localStorage.getItem("token");
    try {
      const { data2 } = await updateObj("/Users", e._id, e, key);
      const { data } = await getAll("/Users");
      await swal("Users updated", `${e.fname} has beem updated`, "success");
      data.splice(0, 2);
      await setusers(data);
      await setcheckusers(false);
      await setcheckusers(true);
    } catch (error) {
      await swal("Oops...", error, "error");
      await setcheckusers(true);
      await setchecknewuser(false);
      await setcheckedit(false);
    }
  }
  async function Add(e) {
    let key = {};
    key = localStorage.getItem("token");
    try {
      const { data2 } = await addObj("/Users", e, key);
      const { data } = await getAll("/Users");
      await swal(
        "Userlist has been updated",
        `${e.fname} has added to the list `,
        "success"
      );
      data.splice(0, 2);
      await setusers(data);
      await setcheckusers(true);
      await setchecknewuser(false);
      await setcheckedit(false);
    } catch (error) {
      await swal("Oops...", error, "error");
      await setcheckusers(true);
      await setchecknewuser(false);
      await setcheckedit(false);
    }
  }
  async function Delete(e) {
    if (Users.length > 5) {
      let key = {};
      key = localStorage.getItem("token");
      await swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this User",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          try {
            const { data2 } = await deleteObj("/Users", e._id, key);
            const { data } = await getAll("/Users");
            await swal(
              "User deleted",
              `${e.name} has beem removed form the list`,
              "success"
            );
            data.splice(0, 2);
            await setusers(data);
          } catch (error) {
            await swal("Oops...", error, "error");
          }
        }
      });
    } else {
      await swal(
        "Oops...",
        "the number of users is less then allowed",
        "error"
      );
    }
  }

  return (
    <div className="moviepage">
      <div className="container">
        <div id="users_imgbackground" />
        <h1 id="titlee">workers</h1>
        <div>
          {/* {checknewuser?<button onClick={allusers} className="btnn">all users</button>:null}
        {checkedit?<button onClick={allusers} className="btnn">all users</button>:null} */}
          {checkusers ? (
            <button onClick={adduser} className="btnn">
              add worker
            </button>
          ) : null}
        </div>
      </div>

      <br></br>
      {checkusers ? (
        window.innerWidth > 1068 ? (
          <div>
            <Swiper
              spaceBetween={40}
              slidesPerView={5}
              centeredSlides
              centeredSlidesBounds
              freeMode={true}
              slidesOffsetBefore={70}
              slidesOffsetAfter={70}
              navigation
              watchSlidesVisibility={true}
              breakpoints={{
                320: {
                  width: 320,
                  slidesPerView: 1,
                },
                481: {
                  width: 320,
                  slidesPerView: 1,
                },
                640: {
                  width: 481,
                  slidesPerView: 2,
                },
                768: {
                  width: 740,
                  slidesPerView: 2,
                },
              }}
            >
              {Users.map((user, index) => {
                return (
                  <SwiperSlide key={index}>
                    <User
                      counter={index}
                      key={index}
                      user={user}
                      Edit={Edit}
                      Delete={Delete}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        ) : (
          <div className="mobile_map_display">
            {Users.map((user, index) => {
              return (
                <div key={index}>
                  <User
                    counter={index}
                    key={index}
                    user={user}
                    Edit={Edit}
                    Delete={Delete}
                  />
                </div>
              );
            })}
          </div>
        )
      ) : null}
      {checkedit ? (
        <div className="add_movie_continer">
          <EditUser user={usertoedit} update={Update} cancel={allusers} />
        </div>
      ) : null}
      {checknewuser ? (
        <div className="add_movie_continer">
          <AddUser add={Add} cancel={allusers} allusers={allUsers} />
        </div>
      ) : null}
    </div>
  );
}
export default UsersPage;
