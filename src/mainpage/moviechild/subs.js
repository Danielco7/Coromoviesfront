import React, { useEffect, useState } from "react";
import { getAll, addObj, getById } from "../../utils";
const urlsubs = "http://ec2-54-209-155-37.compute-1.amazonaws.com:3001/api/Subs";
const urlmembers = "http://ec2-54-209-155-37.compute-1.amazonaws.com:3001/api/Members";

function Subs(props) {
  const [allsubs, setsubs] = useState([]);

  useEffect(() => {
    const getsubs = async () => {
      setsubs([]);
      const { data } = await getAll(urlsubs);
      const filtered = data.filter((meb) =>
        meb.movies.some((elm) => elm.movieId === props.movie._id)
      );
      const allsubstomovie = [];
      for (let i = 0; i < filtered.length; i++) {
        const element = filtered[i];
        const array1 = element.movies.filter(
          (elem) => elem.movieId === props.movie._id
        );
        for (let i = 0; i < array1.length; i++) {
          const element2 = array1[i];

          const { data } = await getById(urlmembers, element.memberId);
          const obj = {
            date: element2.date,
            member: data.name,
          };
          if (obj.member !== undefined && new Date() <= new Date(obj.date))
            allsubstomovie.push(obj);
        }
      }
      setsubs(allsubstomovie);
    };
    getsubs();
  }, []);

  const showmovie = async (e) => props.membertoshow(e.target.innerHTML);

  return (
    <div>
      <ul>
        {allsubs.length > allsubs.length - 1 ? (
          allsubs.map((user, index) => {
            return (
              <div key={index} className="ilsubs">
                <span className={"spam"} onClick={showmovie}>
                  {user.member}
                </span>{" "}
                - {user.date}
              </div>
            );
          })
        ) : (
          <div>no Subscriptions</div>
        )}
      </ul>
    </div>
  );
}
export default Subs;
