import React, { useEffect, useState } from "react";
import Axios from "util/axios";
import { Pagination, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const MyFriends = () => {
  const [totalcount, setTotalCount] = useState("");
  const perPageNum = 5;
  const [pageStart, setPageStart] = useState(0);
  const [friendsData, setFriendsData] = useState([]);
  const [render, setRender] = useState("");
  useEffect(() => {
    myfriendsCount();
    selectMyFriends();
  }, []);
  /*
   * 페이지가 바뀔때 데이터 다시 출력하기
   */
  useEffect(() => {
    selectMyFriends();
  }, [pageStart, render]);

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
  /*
   * 삭제 버튼 클릭시 실행되는 함수
   */
  const showDeleteConfirm = (e) => {
    const user_id = e.target.getAttribute("friendsUserId");
    confirm({
      title: "친구 삭제",
      icon: <ExclamationCircleOutlined />,
      content: "친구를 삭제하시려면 확인을 눌러주세요",
      okText: "확인",
      okType: "danger",
      cancelText: "취소",
      onOk() {
        const url = `/friends/deletefriend`;
        Axios.post(url, {
          request_user_id: sessionStorage.getItem("userId"),
          target_user_id: user_id,
        })
          .then((res) => {
            console.log(res);
            setRender(render + 1);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      onCancel() {},
    });
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
                <td style={{ textAlign: "right" }}>
                  <span
                    type="text"
                    onClick={showDeleteConfirm}
                    friendsUserId={contact.id}
                    style={{
                      color: "rgba(245,145,45,.7)",
                      border: "1px solid rgba(245,145,45,.7)",
                      padding: "3px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "13px",
                    }}
                  >
                    삭제
                  </span>{" "}
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
