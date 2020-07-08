import React, { useState, useEffect } from "react";
import useIntersect from "./useIntersect";
import Axios from "util/axios";
import Comment from "../../pages/post/Comment";
import "css/postStyle.css";
import heart from "images/heart.png";
import heart_o from "images/heart_o.png";
import star from "images/star.png";
import share from "images/share2.png";
import star_g from "images/star_g.png";
import report from "images/report.png";
import report_g from "images/report_g.png";
import block from "images/block.png";
import block_g from "images/block_g.png";
import { Rate, Button, Input, Modal, Spin, Radio } from "antd";
import StarRate from "components/review/StarRate";
import WriteFormMap from "components/map/WriteFormMap";
import ReactQuill, { Quill } from "react-quill";
import { ImageUpload } from "quill-image-upload";
import "react-quill/dist/quill.snow.css";
import { ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";
const fakeFetch = (delay = 1000) =>
  new Promise((res) => setTimeout(res, delay));

Quill.register("modules/imageUpload", ImageUpload);
const { confirm } = Modal;
const ListItem = ({
  contact,
  i,
  likesChange,
  props,
  history,
  timelinePageMove,
  render,
  wishClick,
  blockClick,
  userPlaceId,
  fetchItems,
  pathFrom,
}) => {
  const [showBtn, setShowBtn] = useState(false);
  const [form, setForm] = useState(false);
  const [checkHeart, setCheckHeart] = useState(false);
  const [sIdx, setSIdx] = useState(0);
  const [rating, setRating] = useState(contact.rating);
  const [cacheIdx, setCacheIdx] = useState(0);
  const [cacheRating, setCacheRating] = useState(0);
  const [starScore, setStarScore] = useState(0.0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [placeName, setPlaceName] = useState(contact.name);
  const [address, setAddress] = useState("");
  const [subject, setSubject] = useState(contact.subject);
  const [category, setCategory] = useState(contact.category);
  const [content, setContent] = useState(contact.content);
  const [front_image, setFront_image] = useState(null);
  const [imageId, setImageId] = useState([]);
  const [postId, setPostId] = useState("");
  const [checkBlock, setCheckBlock] = useState(false);
  const [checkReport, setCheckReport] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [radioValue, setRadioValue] = useState(1);
  const [reportRadioGroup, setReportRadioGroup] = useState("");
  const [reportUserId, setReportUserId] = useState("");
  const [reportPostId, setReportPostId] = useState("");
  const [reportContent, setReportContent] = useState("");
  useEffect(() => {
    console.log(showBtn);
    console.log(typeof contact.user_id);
    console.log(typeof sessionStorage.getItem("userId"));
    if (contact.user_id.toString() === sessionStorage.getItem("userId")) {
      setShowBtn(true);
      console.log(showBtn);
    }
    console.log(showBtn);
  }, []);

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

  useEffect(() => {
    heartBoolean();
    blackListBoolean();
    fetchItems();
    // timelineToTimeLine();
  }, [render]);

  /*좋아요 눌렀는지 확인 */
  const heartBoolean = () => {
    const url = `likes/ispost?user_id=${sessionStorage.getItem(
      "userId"
    )}&post_id=${contact.id}`;
    Axios.get(url)
      .then((res) => {
        console.log(res.data);
        if (res.data === 1) {
          setCheckHeart(true);
        } else {
          setCheckHeart(false);
        }
      })
      .catch((error) => {
        console.log("heartBoolean" + error);
      });
  };

  /*수정버튼 클릭시 수정 폼 나옴 */
  const showForm = (e) => {
    setPostId(e.target.getAttribute("postId"));
    setForm(true);
  };

  /*삭제버튼 클릭시 삭제 */
  const deletePost = (e) => {
    const postId = e.target.getAttribute("postId");
    const userPlaceId = e.target.getAttribute("userPlaceId");
    console.log("버튼함수");
    console.log(postId);
    confirm({
      title: "정말 삭제 하시겠습니까?",
      icon: <ExclamationCircleOutlined />,
      content: "리뷰를 삭제하시려면 확인을 눌러주세요",
      okText: "확인",
      okType: "danger",
      cancelText: "취소",
      onCancel() {},
      onOk() {
        const url = `/post/delete/${postId}/${userPlaceId}`;
        Axios.put(url)
          .then((res) => {
            console.log(res);
            //props.onDeletePage(1);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });
  };

  /* 블랙리스트 등록되어있는지 확인 */
  const blackListBoolean = () => {
    let url;
    console.log("실행됨");
    if (pathFrom === "timeline") {
      url = `/userplace/blacklist/exist?user_place_id=${contact.user_place_id}`;
    } else {
      url = `/userplace/blacklist/exist?user_place_id=${userPlaceId}`;
    }
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

  /*값 읽어오기 */
  const changeSubject = (e) => {
    console.log(e.target.value);
    setSubject(e.target.value);
  };

  const changeCategory = (e) => {
    setCategory(e.target.value);
  };
  const changeState = (e) => {};

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
      ],
      // container:  [['bold', 'italic', 'underline', 'blockquote'],
      // [{'list': 'ordered'}, {'list': 'bullet'}],
      // ['formula','link', 'image'],
      // ['clean']],
      // handlers: { 'image' : this.handleImage }
    },
    imageUpload: {
      url: `http://localhost:9000/mechelin/image/add?id=${sessionStorage.getItem(
        "userId"
      )}`, // server url
      method: "POST", // change query method, default 'POST'
      name: "images", // 아래 설정으로 image upload form의 key 값을 변경할 수 있다.
      headers: {
        //Authorization: `Bearer ${}`,
        "X-Total-Count": 0,
      },
      callbackOK: (serverResponse, next) => {
        // 성공하면 리턴되는 함수
        console.log(serverResponse);
        next(serverResponse.data);
        imageId.push(serverResponse.image_id);
      },
      callbackKO: (serverError) => {
        // 실패하면 리턴되는 함수
        console.log(serverError);
        // alert(serverError);
      },
      // optional
      // add callback when a image have been chosen
      checkBeforeSend: (file, next) => {
        console.log("ceckbeforesend");
        console.log(file);
        next(file); // go back to component and send to the server
      },
    },
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    //imageDrop: true, // imageDrop 등록
    //imageResize: {}, // imageResize 등록
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];
  /*
   * 내용을 기입했을때 실행
   */
  const changeEditor = (e) => {
    console.log(e);
    setContent(e);
  };
  const onMouseOver = (e, i) => {
    e.persist();
    let offsetX = e.nativeEvent.offsetX;
    let clientX = e.target.clientWidth;

    if (offsetX > clientX / 2) {
      let value = 2;
      setSIdx(i);
      setRating(value);
    } else {
      let value = 1;
      setSIdx(i);
      setRating(value);
    }
  };
  const handleChange = (i, v, s) => {
    setSIdx(0);
    setRating(0);
    setCacheIdx(i);
    setCacheRating(v);
    setStarScore(s);
  };
  /*
   * 리뷰글 등록 버튼 클릭시 실행
   */
  const onSubmitReview = (e) => {
    e.preventDefault();
    //데이터 유효성 검사
    if (subject === "") {
      alert("제목을 입력해주세요.");
      return false;
    }
    if (content === "") {
      alert("내용을 입력해주세요.");
      return false;
    }
    if (category === "") {
      alert("카테고리를 선택해주세요.");
      return false;
    }
    if (starScore === 0) {
      alert("맛집 평가를 해주세요.");
      return false;
    }
    if (x === 0 && y === 0) {
      alert("맛집을 등록해주세요.");
      return false;
    }
    if (placeName === "") {
      alert("상호명을 입력해주세요.");
      return false;
    }

    const url = "post/add";
    Axios.post(url, {
      user_id: sessionStorage.getItem("userId"),
      latitude_x: x,
      longitude_y: y,
      name: placeName,
      address: address,
      subject: subject,
      content: content,
      category: category,
      rating: starScore,
      front_image: front_image,
      image_id: imageId,
    })
      .then((response) => {
        // 리뷰글 등록후 state값 초기화
        setX("");
        setY("");
        setPlaceName("");
        setAddress("");
        setSubject("");
        setContent("");
        setCategory("");
        setStarScore(0);
        setFront_image(null);
        setImageId([]);
        const id = response.data.id;
        const userPlaceId = response.data.user_place_id;

        props.history.push(`/mechelin/review/${userPlaceId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clickProfile = (e) => {
    console.log("Dfdf");
    console.log(e.target.getAttribute("user_id"));
    const user_id = e.target.getAttribute("user_id");
    sessionStorage.setItem("targetUser", e.target.getAttribute("user_id"));
    //timelinePageMove(user_id);

    history.push(`/mechelin/timeline/${user_id}`);
  };

  /*
   * 리뷰글 수정 버튼 눌렀을 시
   */
  const reviewModifyBtn = () => {
    console.log("ㅎㅎ");
    if (subject === "") {
      alert("제목을 입력해주세요.");
      return false;
    }
    if (content === "") {
      alert("내용을 입력해주세요.");
      return false;
    }
    if (category === "") {
      alert("카테고리를 선택해주세요.");
      return false;
    }
    if (starScore === 0) {
      alert("맛집 평가를 해주세요.");
      return false;
    }
    const url = "post/update";
    Axios.post(url, {
      id: postId,
      subject: subject,
      content: content,
      category: category,
      rating: starScore,
      image_id: imageId,
    })
      .then((response) => {
        // 리뷰글 등록후 state값 초기화
        setX("");
        setY("");
        setPlaceName("");
        setAddress("");
        setSubject("");
        setContent("");
        setCategory("");
        setStarScore(0);
        setFront_image(null);
        setImageId([]);
        const id = response.data.id;
        const userPlaceId = response.data.user_place_id;

        this.props.history.push(`/mechelin/review/${userPlaceId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*
   * 리뷰작성 폼 지도에서 넘어온 데이터
   */
  const mapData = (x, y, placeName, address) => {
    setX(x);
    setY(y);
    setPlaceName(placeName);
    setAddress(address);
  };

  // 신고하기 아이콘 클릭시 모달창 보임
  const onClickReport = (e) => {
    setReportPostId(e.target.getAttribute("postId"));
    setReportUserId(e.target.getAttribute("userId"));
    setModalVisible(true);
  };

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
      {!form ? (
        <form>
          {showBtn ? (
            <div
              style={{
                textAlign: "right",
                width: "50vw",
                margin: "7vh auto -7vh",
              }}
            >
              <span
                type="text"
                onClick={deletePost}
                postId={contact.id}
                userPlaceId={contact.user_place_id}
                style={{ width: "100px", cursor: "pointer" }}
              >
                {" "}
                삭제
              </span>
            </div>
          ) : (
            ""
          )}
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
                  {contact.subject}{" "}
                </th>
                <th
                  style={{
                    textAlign: "right",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {contact.name}
                  </span>
                </th>
              </tr>{" "}
              <tr>
                <th
                  style={{
                    paddingRight: "0",
                    width: "65px",
                  }}
                >
                  <img
                    src={contact.profile_url}
                    alt=""
                    onClick={clickProfile}
                    user_id={contact.user_id}
                    style={{
                      width: "3vw",
                      borderRadius: "50%",
                      height: "3vw",
                      cursor: "pointer",
                    }}
                  />
                </th>
                <th
                  colSpan="3"
                  style={{ paddingLeft: "10px", cursor: "pointer" }}
                  onClick={clickProfile}
                  user_id={contact.user_id}
                >
                  {contact.nickname}
                  <br />
                  {nowTime(contact.created_at)}
                </th>
                <th>
                  <div style={{ float: "right" }}>
                    <Rate
                      allowHalf
                      value={contact.rating}
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
                    dangerouslySetInnerHTML={{ __html: contact.content }}
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
                        postId={contact.id}
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
                        postId={contact.id}
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
                      {contact.likes}
                    </span>
                    {sessionStorage.getItem("userId") !==
                    contact.user_id.toString() ? (
                      <img
                        src={report}
                        width="30"
                        height="30"
                        alt=""
                        placeId={contact.place_id}
                        postId={contact.id}
                        userId={contact.user_id}
                        style={{ cursor: "pointer", float: "right" }}
                        onClick={onClickReport}
                      />
                    ) : checkBlock ? (
                      <img
                        src={block}
                        width="30"
                        height="30"
                        alt=""
                        onClick={blockClick}
                        placeId={contact.place_id}
                        postId={contact.id}
                        style={{ cursor: "pointer", float: "right" }}
                        userId={contact.user_id}
                        userPlaceId={contact.user_place_id}
                      />
                    ) : (
                      <img
                        src={block_g}
                        width="30"
                        height="30"
                        alt=""
                        onClick={blockClick}
                        placeId={contact.place_id}
                        postId={contact.id}
                        userId={contact.user_id}
                        style={{ cursor: "pointer", float: "right" }}
                        userPlaceId={contact.user_place_id}
                      />
                    )}
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
                      placeId={contact.place_id}
                      postId={contact.id}
                    />
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
                  <Comment postId={contact.id} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      ) : (
        <form
          style={{
            height: "90vw",
            padding: "2vw",
            width: "60vw",
            margin: "4vh auto",
            fontSize: "1vw",
          }}
        >
          <caption
            style={{
              color: "rgba(0, 0, 0, 0.4)",
              width: "10vw",
              fontSize: "1.5vw",
              fontWeight: "bold",
            }}
          >
            리뷰 수정
          </caption>
          <hr
            style={{
              borderColor: "rgba(0,0,0,.2)",
              marginBottom: "4.5vh",
            }}
          />
          <div
            className="formInner"
            style={{
              width: "50vw",
              height: "60vh",
              margin: "7vh auto 3vh",
            }}
          >
            <Input
              name="subject"
              style={{
                marginLeft: "1vw",
                width: "24vw",
                height: "5vh",
                float: "left",
              }}
              placeholder="제목"
              onChange={changeSubject}
              value={subject}
            />
            <select
              className="form-control"
              name="category"
              style={{
                marginLeft: "1.2vw",
                width: "12vw",
                height: "5vh",
                float: "left",
                fontSize: "12px",
                paddingLeft: "3px",
                paddingRight: "3px",
                color: "rgba(0, 0, 0, 0.65)",
              }}
              onChange={changeCategory}
              value={category}
            >
              <option selected disabled hidden>
                카테고리
              </option>
              <option>한식</option>
              <option>중식</option>
              <option>양식</option>
              <option>일식</option>
            </select>
            <div
              className="rate"
              style={{
                textAlign: "center",
                width: "10vw",
                float: "left",
                height: "5vh",
                marginTop: "0.5vh",
                marginLeft: "0.5vw",
              }}
            >
              <div
                className="star"
                style={{
                  clear: "both",
                  display: "inline-block",
                  width: "7vw",
                  marginLeft: "0.2vw",
                }}
              >
                <StarRate
                  onMouseOver={onMouseOver}
                  onChange={handleChange}
                  sIdx={sIdx}
                  rating={rating}
                  cacheIdx={cacheIdx}
                  cacheRating={cacheRating}
                  score={starScore}
                />
              </div>
              <div
                style={{
                  width: "2vw",
                  marginLeft: "0.2vw",
                  lineHeight: "5vh",
                  display: "inline-block",
                  fontSize: "1.5em",
                  color: "rgba(0, 0, 0, 0.4)",
                }}
              >
                {starScore === 0
                  ? starScore
                  : starScore % 1 === 0
                  ? `${starScore}.0`
                  : starScore}
              </div>
            </div>
            <br />
            <div
              className="text-editor"
              style={{ height: "53vh", marginTop: "6vh", clear: "both" }}
              value={content} // state 값
            >
              <ReactQuill
                theme="snow"
                name="content"
                onChange={changeEditor}
                ref={(el) => (Quill.quillRef = el)}
                modules={modules}
                formats={formats}
                style={{
                  margin: "0 auto",
                  width: "48vw",
                  height: "52vh",
                }}
              />
            </div>
            {/* <div
              className="map"
              style={{
                margin: "6vw auto 3vh",
                width: "48vw",
                height: "50vh",
                border: "0px solid #999",
              }}
            >
              <WriteFormMap mapData={mapData} />
            </div> */}
          </div>
          <div
            style={{
              marginTop: "42.5vw",
              width: "50vw",
              height: "auto",
              textAlign: "center",
            }}
          >
            <Button
              type="primary"
              style={{
                width: "10vw",
                height: "5vh",
                marginLeft: "4vw",
              }}
              onClick={reviewModifyBtn}
            >
              수정
            </Button>

            <Button
              style={{
                width: "10vw",
                height: "5vh ",
                marginLeft: "4vw",
              }}
              onClick={() => {
                setForm(false);
              }}
            >
              취소
            </Button>
          </div>
        </form>
      )}
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
        <p>제목 : {contact.subject}</p>
        <p>작성자 : {contact.nickname}</p>
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

const Post = (props) => {
  const [state, setState] = useState({ itemCount: 3, isLoading: false });
  const [result, setResult] = useState([]);
  const [render, setRender] = useState(0);
  console.log("state구역");
  /* fake async fetch */
  const fetchItems = async () => {
    console.log("펫치아이템 실행");
    let url = ``;
    if (
      props.pathFrom === "timeline" &&
      sessionStorage.getItem("userId") === sessionStorage.getItem("targetUser")
    ) {
      url = `/post/timeline?user_id=${sessionStorage.getItem(
        "userId"
      )}&row=${item}`;
    } else if (props.pathFrom === "timeline") {
      url = `/post/timeline?user_id=${props.userId}&row=${item}`;
    } else {
      url = `/post/review?user_place_id=${props.userPlaceId}&row=${item}`;
    }

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

    setState((prev) => ({ ...prev, isLoading: true }));
    await fakeFetch();
    setState((prev) => ({
      itemCount: prev.itemCount + 3,
      isLoading: false,
    }));
    item = dataLength;
    item += 3;
    console.log(item);
  };
  /* initial fetch */
  useEffect(() => {
    fetchItems();
  }, []);
  const [_, setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    await fetchItems();
    observer.observe(entry.target);
  }, {});
  const { itemCount, isLoading } = state;
  if (!itemCount) return null;

  /*
   * 공감 버튼 클릭시 실행되는 메소드
   */
  const onClickLikes = (e) => {
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
        console.log(error);
      });
  };
  /*
   *  공감 버튼을 눌렀을때 바로 반영될 수 있게 하는 메소드
   */
  const onClickLikesRender = () => {
    console.log(item);
    item = dataLength;
    console.log(item);
    let url = ``;
    if (props.pathFrom === "timeline") {
      url = `/post/timeline?user_id=${props.userId}&row=${item}`;
    } else {
      url = `/post/review?user_place_id=${props.userPlaceId}&row=${item}`;
    }
    Axios.get(url)
      .then((response) => {
        setResult(response.data);
        item += 3;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*
   * 블랙리스트 버튼 클릭 시
   */
  const blockClick = (e) => {
    if (e.target.getAttribute("userId") === sessionStorage.getItem("userId")) {
      const url = `/userplace/blacklist/${e.target.getAttribute(
        "userPlaceId"
      )}`;
      Axios.put(url)
        .then((res) => {
          console.log(res.data);
          item -= 3;
          if (res.data === "블랙리스트에 추가되었습니다.") {
            success(res.data);
          } else {
            info2(res.data);
          }
          setRender(render + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("방문한적이 없는 맛집은 블랙리스트에 추가할 수 없습니다.");
    }
  };

  function info2(str) {
    Modal.info({
      title: str,
      content: (
        <div>
          <p>해당 맛집은 블랙리스트에서 제외되었습니다.</p>
        </div>
      ),
      onOk() {},
    });
  }

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

  // 타임라인으로 이동
  const timelinePageMove = (user_id) => {
    props.timelinePageMove(user_id);
  };

  /*
   * 친구 타임라인에서 메뉴 타임라인을 눌렀을 시 프로필 변경
   */

  // const timelineToTimeLine = () => {
  //   if (props.pathFrom === "timeline") {
  //     props.timelineToTimeLine(sessionStorage.getItem("targetUser"));
  //   }
  // };

  return (
    <div>
      <div className="App">
        {[...result].map((contact, i) => {
          return (
            <ListItem
              contact={contact}
              i={i}
              likesChange={onClickLikes}
              history={props.history}
              timelinePageMove={timelinePageMove}
              render={render}
              wishClick={wishClick}
              blockClick={blockClick}
              userPlaceId={props.userPlaceId}
              fetchItems={fetchItems}
              pathFrom={props.pathFrom}
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
    </div>
  );
};
export default Post;
