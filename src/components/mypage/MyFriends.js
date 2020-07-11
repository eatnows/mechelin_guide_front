import React, { useEffect, useState } from "react";
import Axios from "util/axios";
import { Pagination } from "antd";

const MyFriends = () => {
  const [totalcount, setTotalCount] = useState("");
  const perPageNum = 5;
  const [pageStart, setPageStart] = useState(0);
  const [friendsData, setFriendsData] = useState([]);

  useEffect(() => {
    myfriendsCount();
    selectMyFriends();
  }, []);
  /*
   * 페이지가 바뀔때 데이터 다시 출력하기
   */
  useEffect(() => {
    selectMyFriends();
  }, [pageStart]);

  /*
   *  나의 친구들의 정보를 받아오는 메소드
   */
  const selectMyFriends = () => {
    const url = `/friends/myfriends?user_id=${sessionStorage.getItem(
      "userId"
    )}&pageStart=${pageStart}&perPageNum=${perPageNum}`;
    Axios.get(url)
      .then((res) => {
        console.log(res.data);
        setFriendsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /*
   *  나의 친구수 받아오는 메소드
   */
  const myfriendsCount = () => {
    const url = `friends/mycount?user_id=${sessionStorage.getItem("userId")}`;
    Axios.get(url)
      .then((res) => {
        setTotalCount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*
   * 페이지 번호가 변경될때 실행되는 메소드
   */
  const onChangePage = (value) => {
    console.log(value);
    setPageStart((value - 1) * perPageNum);
    //pageStart = value * 5 - 1;
    console.log(pageStart);
    // setRender(render + 1);
  };
  /*
   * 친구 닉네임 클릭시
   */
  const onFriendsClick = (e) => {
    console.log(e.target.getAttribute("friendsUserId"));
  };

  return (
    <div>
      <div>
        <table style={{ width: "100%" }}>
          {[...friendsData].map((contact, i) => {
            return (
              <tr>
                <td style={{ padding: " .5vw 0" }}>
                  <img
                    src={contact.profile_url}
                    alt=""
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td style={{ paddingLeft: "0.5vw", fontSize: "13px" }}>
                  <span
                    onClick={onFriendsClick}
                    style={{ cursor: "pointer" }}
                    friendsUserId={contact.id}
                  >
                    {contact.nickname}
                  </span>
                  <br />
                  <span>{contact.introduce}</span>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <div style={{ marginTop: "1vw", textAlign: "center" }}>
        <Pagination
          size="small"
          defaultCurrent={1}
          defaultPageSize={perPageNum} //default size of page
          onChange={onChangePage}
          total={totalcount}
        />
      </div>
    </div>
  );
};

export default MyFriends;
