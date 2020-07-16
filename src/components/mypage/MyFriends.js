import React, { useEffect, useState } from "react";
import Axios from "util/axios";
import { Pagination, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;

const MyFriends = (props) => {
  const [totalcount, setTotalCount] = useState("");
  const perPageNum = 5;
  const [pageStart, setPageStart] = useState(0);
  const [friendsData, setFriendsData] = useState([]);
  const [render, setRender] = useState("");
  const [unfollow, setUnfollow] = useState(false);
  const [Y, setY] = useState("");
  const [friendUserId, setFriendUserId] = useState("");
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
    setPageStart((value - 1) * perPageNum);
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
    //const user_id = e.target.getAttribute("friendsUserId");
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
          target_user_id: friendUserId,
        })
          .then((res) => {
            selectMyFriends();
            myfriendsCount();
          })
          .catch((error) => {
            console.log(error);
          });
      },
      onCancel() {},
    });
  };

  /*DM 버튼 클릭시 상위컴포넌트로 값 전달 */
  const changeDm = (e) => {
    const friendsUserId = e.target.getAttribute("friendsUserId");
    const friendsNickname = e.target.getAttribute("friendsNickname");
    const friendsIntroduce = e.target.getAttribute("friendsIntroduce");
    const chatRoomId = e.target.getAttribute("chatRoomId");

    const userData = {
      user_id: friendsUserId,
      nickname: friendsNickname,
      introduce: friendsIntroduce,
      chatRoomId: chatRoomId,
    };

    const url = `/chat/log?chatroom_id=${chatRoomId}&page=${10}`;
    Axios.get(url)
      .then((res) => {
        const chatLog = res.data;
        props.changeDm(true, userData, chatLog);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /*더보기 버튼 클릭시 언팔하기 버튼 표시 */
  const showUnfollowing = (e) => {
    setFriendUserId(e.target.getAttribute("friendsUserId"));
    setY(e.clientY);
    if (unfollow === true) {
      setUnfollow(false);
    } else {
      setUnfollow(true);
    }
  };

  return (
    <div>
      <div>
        <table style={{ width: "100%" }}>
          {[...friendsData].map((contact, i) => {
            return (
              <tr>
                <td style={{ padding: " .5vw" }}>
                  <img
                    src={contact.profile_url}
                    onClick={onFriendsClick}
                    friendsUserId={contact.id}
                    alt=""
                    style={{ cursor: "pointer", width: "50px", height: "50px" }}
                  />
                </td>
                <td style={{ fontSize: "13px" }}>
                  <span
                    onClick={onFriendsClick}
                    style={{ cursor: "pointer" }}
                    friendsUserId={contact.id}
                  >
                    {contact.nickname}
                  </span>
                </td>
                <td style={{ textAlign: "center" }}>
                  <span
                    className="xi-send turnOrange"
                    onClick={changeDm}
                    friendsUserId={contact.id}
                    friendsNickname={contact.nickname}
                    friendsIntroduce={contact.introduce}
                    chatRoomId={contact.chatroom_id}
                    style={{
                      width: "1vw",
                      height: "1vw",
                      cursor: "pointer",
                      fontSize: "1.2vw",
                      marginRight: ".3vw",
                      marginTop: "50%",
                      transform: "translateY(-50%)",
                    }}
                  ></span>
                  <span
                    className="xi-ellipsis-v turnOrange"
                    onClick={showUnfollowing}
                    friendsUserId={contact.id}
                    style={{
                      width: "1vw",
                      height: "1vw",
                      borderRadius: "50%",
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontSize: "1.1vw",
                      marginTop: "50%",
                      transform: "translateY(-50%)",
                    }}
                  ></span>{" "}
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
          style={{ position: "absolute", left: "5vw", bottom: "2vh" }}
        />
        <div
          style={{
            width: "5.5vw",
            height: "auto",
            lineHeight: "auto",
            backgroundColor: "white",
            position: "fixed",
            left: "17.6vw",
            top: Y,
            boxShadow: "3px 3px 10px #999",
            display: unfollow === true ? "block" : "none",
          }}
        >
          <div
            onClick={showDeleteConfirm}
            // friendsUserId={contact.id}
            className="turnOrange"
            style={{ padding: "0.2vw 0", cursor: "pointer" }}
          >
            삭제하기
          </div>
          <div
            className="turnOrange"
            style={{ padding: "0.2vw 0", cursor: "pointer" }}
          >
            차단하기
          </div>
          <div
            className="turnOrange"
            onClick={() => {
              setUnfollow(false);
            }}
            style={{ padding: "0.2vw 0", cursor: "pointer" }}
          >
            취소
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFriends;
