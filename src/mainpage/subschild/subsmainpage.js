import React, { useEffect, useState } from "react";
import { getAll, addObj, deleteObj, updateObj } from "../../utils";
import Member from "./members";
import EditMember from "./editmember";
import AddMember from "./addmember";
import members from "../../imgs/istockphoto-1132715308-612x612.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";


function SubsPage(props) {
  const [Members, setMembers] = useState({});
  const [BackUpMembersArry, setBackUpMembersArry] = useState({});
  const [membertoedit, setmembertoedit] = useState({});
  const [checkallmembers, setcheckallmembers] = useState(false);
  const [checkaddmember, setcheckaddmember] = useState(false);
  const [checkeditmember, setcheckeditmember] = useState(false);
  const [
    Check_Create_Subscription_Permission,
    setCheck_Create_Subscription_Permission,
  ] = useState("");

  useEffect(() => {
    const getmembers = async () => {
      const { data } = await getAll("/Members");
      setMembers(data);
      setBackUpMembersArry(data);
      setcheckallmembers(true);
    };
    const checkpossibility = async () => {
      const addbutton = props.user.premissions.find(function (element) {
        return element === "Create Subscriptions";
      });
      setCheck_Create_Subscription_Permission(addbutton);
    };
    checkpossibility();
    getmembers();
  }, []);

  useEffect(() => {
    return function cleanUp() {
      setMembers();
      setmembertoedit();
      setcheckallmembers();
      setcheckeditmember();
      setCheck_Create_Subscription_Permission();
    };
  }, []);

  const allmembers = async () => {
    setcheckaddmember(false);
    setcheckallmembers(true);
    setcheckeditmember(false);
  };
  const addmember = async () => {
    setcheckaddmember(true);
    setcheckallmembers(false);
    setcheckeditmember(false);
    setMembers(BackUpMembersArry);
  };
  const addnewmember = async (e) => {
    setcheckaddmember(false);
    setcheckallmembers(true);
    let key = {}
    key = localStorage.getItem("token");
    try {
      const { data1 } = await addObj("/Members", e, key);
      const { data } = await getAll("/Members");
      setMembers(data);
      setBackUpMembersArry(data); 
    } catch (error) {
      alert(error)
    }
  };

  const Delete = async (e) => {
    if (BackUpMembersArry.length > 10) {
      const { data } = await getAll("/Subs");
      const filtered = data.find((meb) => meb.memberId === e._id);
      if (filtered != undefined) {
        const { data: data2 } = await deleteObj("/Subs", filtered._id);
      }
      let key = {}
      key = localStorage.getItem("token");
      try {
        const { data: data3 } = await deleteObj("/Members", e._id,key);
        const { data: data4 } = await getAll("/Members");
        setMembers(data4);
        setBackUpMembersArry(data4);
      } catch (error) {
        alert(error)
      }

    } else {
      alert("the number of members is less then allowed");
    }
  };

  const Editthismember = async (e) => {
    setmembertoedit(e);
    setcheckallmembers(false);
    setcheckaddmember(false);
    setcheckeditmember(true);
    setMembers(BackUpMembersArry);
  };

  const updatemember = async (e) => {
    let key = {}
    key = localStorage.getItem("token");
    try {
      const { data: data1 } = await updateObj("/Members", e._id, e,key);
      const { data } = await getAll("/Members");
      setMembers(data);
      setcheckallmembers(true);
      setcheckaddmember(false);
      setcheckeditmember(false);
    } catch (error) {
      alert(error)
      setcheckallmembers(true);
      setcheckaddmember(false);
      setcheckeditmember(false);
    }
  };

  const showmovie = async (e) => props.Movie_To_Show(e);

  const Serch = async (e) => {
    if (e.target.value.length > 0) {
      const array = BackUpMembersArry;
      const small = array
        .map((name) => name.name.toLowerCase())
        .filter((name) => name.includes(e.target.value.toLowerCase()));
      const res = array.filter((item) =>
        small.includes(item.name.toLowerCase())
      );
      setMembers(res);
    } else setMembers(BackUpMembersArry);
  };

  return (
    <div className="moviepage">
      <div className="container">
        <img src={members} alt="logo" id="imgbackground" />
        <h1 id="titlee">Members</h1>
        <div>
          {/* {checkaddmember?<button onClick={allmembers} className="btnn">all members</button>:null}
        {checkeditmember?<button onClick={allmembers} className="btnn">all members</button>:null} */}
          {checkallmembers ? (
            props.user.admin ? (
              <button onClick={addmember} className="btnn">
                add member
              </button>
            ) : Check_Create_Subscription_Permission ===
              "Create Subscriptions" ? (
              <button onClick={addmember} className="btnn">
                add member
              </button>
            ) : null
          ) : null}
        </div>
        {checkallmembers ? (
          <div className="flexbox">
            <div className="search">
              <div>
                <input
                  type="text"
                  placeholder={"Search Member"}
                  onChange={Serch}
                  required
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <br></br>
      {checkallmembers ? (
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
                  width: 540,
                  slidesPerView: 2,
                },
              }}
            >
              {Members.map((member, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Member
                      counter={index}
                      key={index}
                      member={member}
                      user={props.user}
                      Delete={Delete}
                      Edit={Editthismember}
                      displaymovie={showmovie}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        ) : (
          <div className="mobile_map_display">
            {Members.map((member, index) => {
              return (
                <div key={index}>
                  <Member
                    counter={index}
                    key={index}
                    member={member}
                    user={props.user}
                    Delete={Delete}
                    Edit={Editthismember}
                    displaymovie={showmovie}
                  />
                </div>
              );
            })}
          </div>
        )
      ) : null}
      {checkaddmember ? (
        <div className="add_movie_continer">
          <AddMember cancel={allmembers} add={addnewmember} />
        </div>
      ) : null}
      {checkeditmember ? (
        <div className="add_movie_continer">
          <EditMember
            cancel={allmembers}
            update={updatemember}
            member={membertoedit}
          />
        </div>
      ) : null}
    </div>
  );
}

export default SubsPage;
