import React, { useEffect } from "react";
import Axios from "util/axios";

const MyFriends = () => {
  useEffect(() => {
    selectMyFriends();
  }, []);

  /*
   *  나의 친구들의 정보를 받아오는 메소드
   */
  const selectMyFriends = () => {
    const url = `/friends/myfriends?user_id=${sessionStorage.getItem(
      "userId"
    )}`;
    Axios.get(url)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <div>dd</div>;
};

export default MyFriends;
