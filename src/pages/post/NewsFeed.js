import React, { useState, useEffect } from "react";
import Axios from "util/axios";
import Comment from "./Comment";
import "css/postStyle.css";
import useIntersect from "components/review/useIntersect";
import heart from "images/heart.png";
import heart_o from "images/heart_o.png";
import star from "images/star.png";
import report from "images/report.png";
import star_g from "images/star_g.png";

import { Rate, Modal, Spin, Button, Radio } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const fakeFetch = (delay = 1000) =>
  new Promise((res) => setTimeout(res, delay));

let checkHearts = false;
const ListItem = ({ row, i, likesChange, wishClick, render, history }) => {
  useEffect(() => {
    heartBoolean();
    if (row.user_id === sessionStorage.getItem("userId")) {
      setShowBtn(true);
    }
  }, []);

  useEffect(() => {
    heartBoolean();
    wishListBoolean();
    blackListBoolean();
  }, [render]);

  const [showBtn, setShowBtn] = useState(false);
  const [checkHeart, setCheckHeart] = useState(false);
  const [checkWishlist, setCheckWishlist] = useState(false);
  const [checkBlock, setCheckBlock] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [radioValue, setRadioValue] = useState(1);
  const [reportRadioGroup, setReportRadioGroup] = useState("");
  const [reportUserId, setReportUserId] = useState("");
  const [reportPostId, setReportPostId] = useState("");
  const [reportContent, setReportContent] = useState("");

  /* 게시한 시간 표시*/
  const nowTime = (data) => {
    let now = new Date().getTime();
    let date = new Date(0).setUTCSeconds(data) / 1000;
    let timeDiff = (now - date) / (1000 * 60);

    if (isNaN(timeDiff) || timeDiff < 0) return;

    let simpleTime;
    if (timeDiff < 1) {
      simpleTime = "방금 전";
    } else if (timeDiff < 60) {
      simpleTime = parseInt(timeDiff) + "분 전";
    } else if (timeDiff < 60 * 24) {
      simpleTime = parseInt(timeDiff / 60) + "시간 전";
    } else if (timeDiff < 60 * 24 * 30) {
      simpleTime = parseInt(timeDiff / (60 * 24)) + "일 전";
    } else if (timeDiff < 60 * 24 * 30 * 12) {
      simpleTime = parseInt(timeDiff / (60 * 24 * 30)) + "달 전";
    } else {
      simpleTime = parseInt(timeDiff / (60 * 24 * 30 * 12)) + "년 전";
    }

    return `${simpleTime}`;
  };

  /*좋아요 눌렀는지 확인 */
  const heartBoolean = () => {
    const url = `/likes/ispost?user_id=${sessionStorage.getItem(
      "userId"
    )}&post_id=${row.id}`;
    Axios.get(url)
      .then((res) => {
        console.log(res.data);
        if (res.data === 1) {
          checkHearts = true;
          setCheckHeart(checkHearts);
        } else {
          checkHearts = false;
          setCheckHeart(checkHearts);
        }
      })
      .catch((error) => {
        console.log("heartBoolean" + error);
      });
  };

  /* 위시리스트 등록되어있는지 확인 */
  const wishListBoolean = () => {
    console.log("실행됨");
    const url = `/wishlist/exist?user_id=${sessionStorage.getItem(
      "userId"
    )}&place_id=${row.place_id}`;
    Axios.get(url)
      .then((res) => {
        console.log("위시리스트");
        console.log(res.data);
        if (res.data === 1) {
          setCheckWishlist(true);
        } else {
          setCheckWishlist(false);
        }
      })
      .catch((error) => {
        console.log("wishListBoolean" + error);
      });
  };

  /* 블랙리스트 등록되어있는지 확인 */
  const blackListBoolean = () => {
    console.log("실행됨");
    const url = `/userplace/blacklist/exist?user_id=${sessionStorage.getItem(
      "userId"
    )}&place_id=${row.place_id}`;
    Axios.get(url)
      .then((res) => {
        console.log("블랙리스트");
        console.log(res.data);
        if (res.data === 1) {
          setCheckBlock(true);
        } else {
          setCheckBlock(false);
        }
      })
      .catch((error) => {
        console.log("blackListBoolean" + error);
      });
  };
  /*
   * 닉네임, 프로필 사진 클릭시 타임라인으로 이동
   */
  const onClickmoveTL = (e) => {
    const user_id = e.target.getAttribute("user_id");
    sessionStorage.setItem("targetUser", e.target.getAttribute("user_id"));
    history.push(`/mechelin/timeline/${user_id}`);
  };

  // 신고하기 아이콘 클릭시 모달창 보임
  const onClickReport = (e) => {
    const postId = e.target.getAttribute("postId");
    setReportPostId(postId);
    setReportUserId(e.target.getAttribute("userId"));
    const url = `/report/isreport?user_id=${sessionStorage.getItem(
      "userId"
    )}&post_id=${postId}`;

    Axios.get(url)
      .then((res) => {
        console.log(res.data);
        if (res.data === "") {
          setModalVisible(true);
        } else {
          infoReport("리뷰글 신고하기");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /*
   * 이미 신고가 된 게시물 경우 중복 경고문
   */
  function infoReport(str) {
    Modal.info({
      title: str,
      content: (
        <div>
          <p>이미 신고한 리뷰글입니다.</p>
        </div>
      ),
      onOk() {},
    });
  }

  /*
   * 신고하기 버튼을 눌렀을때 실행되는 메소드
   */
  const handleOk = () => {
    console.log("gggg");
    setModalLoading(true);
    const postId = reportPostId;
    const userId = reportUserId;
    let content = "";
    if (reportContent === "") {
      content = reportRadioGroup;
    } else {
      content = reportContent;
    }
    const url = `/report/add`;
    Axios.post(url, {
      register_user_id: sessionStorage.getItem("userId"),
      reported_user_id: userId,
      post_id: postId,
      content: content,
    })
      .then((res) => {
        setReportContent("");
        setReportPostId("");
        setReportUserId("");
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(() => {
      setModalLoading(false);
      setModalVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const reportRadio = (e) => {
    console.log("radio checked", e.target.value);
    setRadioValue(e.target.value);
    setReportRadioGroup(e.target.value);
  };

  /*
   * 신고 내용
   */
  const reportContentChange = (e) => {
    setReportContent(e.target.value);
  };

  return (
    <div key={i}>
      <form>
        <table className="postTable">
          <thead>
            <tr style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
              <th
                colSpan="4"
                style={{
                  fontWeight: "bold",
                }}
              >
                {" "}
                {row.subject}{" "}
              </th>
              <th
                style={{
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                {row.name}
              </th>
            </tr>
            <tr>
              <th
                style={{
                  paddingRight: "0",
                  width: "65px",
                }}
              >
                <img
                  src={row.profile_url}
                  alt=""
                  style={{
                    width: "3vw",
                    borderRadius: "50%",
                    height: "3vw",
                    cursor: "pointer",
                  }}
                  onClick={onClickmoveTL}
                  user_id={row.user_id}
                />
              </th>
              <th
                colSpan="3"
                style={{ paddingLeft: "10px", cursor: "pointer" }}
                onClick={onClickmoveTL}
                user_id={row.user_id}
              >
                {row.nickname}
                <br />
                {nowTime(row.created_at)}
              </th>
              <th>
                <div style={{ float: "right" }}>
                  <Rate
                    allowHalf
                    value={row.rating}
                    disabled="disabled"
                    style={{
                      pointerEvents: "none",
                      fontSize: "15px",
                    }}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5">
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: row.content }}
                ></div>
              </td>
            </tr>
            <tr>
              <td colSpan="5">
                <div
                  style={{
                    height: "30px",
                    width: "100%",
                    lineHeight: "30px",
                    marginBottom: "10px",
                  }}
                >
                  {checkHeart ? (
                    <img
                      src={heart}
                      alt=""
                      width="30"
                      height="27"
                      onClick={likesChange}
                      postId={row.id}
                      checkHeart={checkHeart}
                      style={{
                        cursor: "pointer",
                        display: "inline-block",
                      }}
                    />
                  ) : (
                    <img
                      src={heart_o}
                      alt=""
                      width="30"
                      height="27"
                      onClick={likesChange}
                      postId={row.id}
                      checkHeart={checkHeart}
                      style={{
                        cursor: "pointer",
                        display: "inline-block",
                      }}
                    />
                  )}

                  <span
                    style={{
                      display: "inline-block",
                      color: "#999",
                      fontSize: "15px",
                      verticalAlign: "middle",
                      marginLeft: "5px",
                    }}
                  >
                    {row.likes}
                  </span>

                  <img
                    src={report}
                    width="30"
                    height="30"
                    alt=""
                    placeId={row.place_id}
                    postId={row.id}
                    userId={row.user_id}
                    style={{ cursor: "pointer", float: "right" }}
                    onClick={onClickReport}
                  />

                  {checkWishlist ? (
                    <img
                      src={star}
                      width="28.5"
                      height="28.5"
                      alt=""
                      style={{
                        float: "right",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                      onClick={wishClick}
                      placeId={row.place_id}
                      postId={row.id}
                    />
                  ) : (
                    <img
                      src={star_g}
                      width="28.5"
                      height="28.5"
                      alt=""
                      style={{
                        float: "right",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                      onClick={wishClick}
                      placeId={row.place_id}
                      postId={row.id}
                    />
                  )}
                </div>

                <div
                  style={{
                    width: "100%",
                    height: "10px",
                    borderBottom: "1px solid rgba(0,0,0,.2) ",
                    textAlign: "center",
                    marginBottom: "-25px",
                    clear: "both",
                  }}
                ></div>
              </td>
            </tr>{" "}
            <tr>
              <td colSpan="5">
                <Comment postId={row.id} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <Modal
        visible={modalVisible}
        title="리뷰글 신고하기"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            취소하기
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={modalLoading}
            onClick={handleOk}
          >
            신고하기
          </Button>,
        ]}
      >
        <p>제목 : {row.subject}</p>
        <p>작성자 : {row.nickname}</p>
        <p>신고 사유</p>
        <Radio.Group onChange={reportRadio} value={radioValue}>
          <Radio value={"부적절한 홍보 게시물"}>부적절한 홍보 게시물</Radio>
          <Radio value={"음란 / 불법 게시물"}>음란 / 불법 게시물</Radio>
          <Radio value={"기타"}>기타</Radio>
        </Radio.Group>
        {reportRadioGroup === "기타" ? (
          <div>
            <hr /> <p>신고내용 : </p>
            <textarea
              type="text"
              onChange={reportContentChange}
              style={{ width: "100%", height: "20vh" }}
            />
          </div>
        ) : (
          ""
        )}
      </Modal>
    </div>
  );
};
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
let item = 3;
let dataLength = 0;
const NewsFeed = (props) => {
  const [state, setState] = useState({ itemCount: 3, isLoading: false });
  const [result, setResult] = useState([]);

  const [render, setRender] = useState(0);
  console.log("state구역");
  /* fake async fetch */
  const fetchItems = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    await fakeFetch();
    setState((prev) => ({
      itemCount: prev.itemCount + 3,
      isLoading: false,
    }));
    const url = `/post/newsfeed/getallpost?user_id=${sessionStorage.getItem(
      "userId"
    )}&row=${item}`;
    Axios.get(url)
      .then((response) => {
        console.log(response.data);
        console.log(`item : ${item}`);
        setResult(response.data);
        console.log(response.data.length);
        dataLength = response.data.length;
        item = dataLength;
      })
      .catch((error) => {
        console.log(error);
      });
    item = dataLength;
    item += 3;
  };
  /* initial fetch */
  useEffect(() => {
    fetchItems();
    props.getState(false);
    console.log(item);
  }, []);

  const [_, setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    await fetchItems();
    observer.observe(entry.target);
  }, {});
  const { itemCount, isLoading } = state;
  console.log("아이템 카운트");
  console.log(!itemCount);
  if (!itemCount) return null;

  /*
   * 공감 버튼 클릭시 실행되는 메소드
   */
  const onClickLikes = (e) => {
    console.log(sessionStorage.getItem("userId"));

    const url = `/likes/post`;

    Axios.post(url, {
      user_id: sessionStorage.getItem("userId"),
      post_id: e.target.getAttribute("postId"),
    })
      .then((response) => {
        console.log(response.data);
        onClickLikesRender();
        setRender(render + 1);
      })
      .catch((error) => {
        console.log("onClickLikes" + error);
      });
  };
  /*
   *  공감 버튼을 눌렀을때 바로 반영될 수 있게 하는 메소드
   */
  const onClickLikesRender = () => {
    console.log(item);
    item = dataLength;
    console.log(item);

    const url = `/post/newsfeed/getallpost?user_id=${sessionStorage.getItem(
      "userId"
    )}&row=${item}`;
    Axios.get(url)
      .then((response) => {
        setResult(response.data);
        item += 3;
      })
      .catch((error) => {
        console.log("onClickLikesRender" + error);
      });
  };
  /*
   * 위시리스트 버튼 클릭 시
   */
  const wishClick = (e) => {
    const url = `/wishlist/add`;
    console.log("위시리스트 클릭");
    console.log(e.target.getAttribute("placeId"));
    Axios.post(url, {
      user_id: sessionStorage.getItem("userId"),
      place_id: e.target.getAttribute("placeId"),
      post_id: e.target.getAttribute("postId"),
    })
      .then((res) => {
        console.log(res.data);
        if (res.data === "위시리스트에 추가되었습니다!") {
          success(res.data);
        } else {
          info(res.data);
        }
        setRender(render + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*
   * 블랙리스트 버튼 클릭 시
   */
  const blockClick = (e) => {
    const url = `/blacklist/add`;
    console.log("블랙리스트 클릭");
    console.log(e.target.getAttribute("placeId"));
    Axios.post(url, {
      user_id: sessionStorage.getItem("userId"),
      place_id: e.target.getAttribute("placeId"),
      post_id: e.target.getAttribute("postId"),
    })
      .then((res) => {
        console.log(res.data);
        if (res.data === "블랙리스트에 추가되었습니다.") {
          success(res.data);
        } else {
          info(res.data);
        }
        setRender(render + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function success(str) {
    Modal.success({
      content: str,
    });
  }

  function info(str) {
    Modal.info({
      title: str,
      content: (
        <div>
          <p>
            이미 위시리스트에 추가했거나 과거에 방문했던 <br />
            맛집입니다.
          </p>
        </div>
      ),
      onOk() {},
    });
  }

  return (
    <div>
      <div
        className="App"
        style={{
          overflow: "auto",
          height: "100vh",
        }}
      >
        {[...result].map((contact, i) => {
          return (
            <ListItem
              row={contact}
              i={i}
              likesChange={onClickLikes}
              wishClick={wishClick}
              blockClick={blockClick}
              key={i}
              render={render}
              history={props.history}
            />
          );
        })}
        <div ref={setRef} className="Loading">
          {isLoading && (
            <span style={{ marginLeft: "50%" }}>
              <Spin indicator={antIcon} />
            </span>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default NewsFeed;
