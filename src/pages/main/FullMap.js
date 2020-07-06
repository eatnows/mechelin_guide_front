import React from "react";
import { Switch, Checkbox, Input, Select, Button } from "antd";
import ReactQuill, { Quill } from "react-quill";
import { ImageUpload } from "quill-image-upload";
import "react-quill/dist/quill.snow.css";
import StarRate from "components/review/StarRate";
import WriteFormMap from "components/map/WriteFormMap";
import Axios from "util/axios";
import filter from "images/filter2.png";
import friend from "images/friend2.png";
import list from "images/list.png";
import review from "images/review2.png";
import MainMap from "components/map/MainMap";
import MyListComponent from "../../components/mypage/MyList";

Quill.register("modules/imageUpload", ImageUpload);

let MyFilter = true;
let FriendFilter = true;
const categoryOptions = [
  { label: "한식", value: "한식" },
  { label: "양식", value: "양식" },
  { label: "중식", value: "중식" },
  { label: "일식", value: "일식" },
];
let categoryFilter = ["한식", "양식", "중식", "일식"];
let blacklist = false;
let render = 0;
class FullMap extends React.Component {
  constructor(props) {
    super();
  }
  state = {
    reviewModal: false,
    text: "",
    sIdx: 0,
    rating: 0,
    cacheIdx: 0,
    cacheRating: 0,
    starScore: 0.0,
    x: 0,
    y: 0,
    placeName: "",
    address: "",
    subject: "",
    category: "",
    content: "",
    front_image: null,
    imageId: [],
    bottomMenu: false,
    fullMap: true,
    filterModal: false,
    myFilter: true,
    friendFilter: true,
    koreanFilter: true,
    westernFilter: true,
    chineseFilter: true,
    japaneseFilter: true,
    categoryFilter: ["한식", "양식", "중식", "일식"],
    blacklist: false,
    myListModal: false,
    frinedsModal: false,
    friendEmail: "",
    render: 0,
  };

  modules = {
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
      url:
        "http://localhost:9000/mechelin/image/add?id=" +
        sessionStorage.getItem("userId"), // server url
      method: "POST", // change query method, default 'POST'
      name: "images", // 아래 설정으로 image upload form의 key 값을 변경할 수 있다.
      headers: {
        //Authorization: `Bearer ${}`,
        "X-Total-Count": 0,
      },
      callbackOK: (serverResponse, next) => {
        // 성공하면 리턴되는 함수
        next(serverResponse.data);
        const { imageId } = this.state;
        this.setState({
          imageId: imageId.concat(serverResponse.image_id),
        });
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

  formats = [
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
  changeEditor = (e) => {
    this.setState({ content: e });
  };
  onMouseOver = (e, i) => {
    e.persist();
    let offsetX = e.nativeEvent.offsetX;
    let clientX = e.target.clientWidth;

    if (offsetX > clientX / 2) {
      let value = 2;
      this.setState({
        sIdx: i,
        rating: value,
      });
    } else {
      let value = 1;
      this.setState({
        sIdx: i,
        rating: value,
      });
    }
  };
  handleChange = (i, v, s) => {
    this.setState({
      sIdx: 0,
      rating: 0,
      cacheIdx: i,
      cacheRating: v,
      starScore: s,
    });
  };
  /*하단 메뉴 보이게 함 */
  showBottomMenu = () => {
    if (!this.state.bottomMenu) {
      this.setState({
        bottomMenu: true,
      });
    } else {
      this.setState({
        bottomMenu: false,
      });
    }
  };
  /*
   * 리뷰작성 폼 지도에서 넘어온 데이터
   */
  mapData = (x, y, placeName, address) => {
    this.setState({
      x: x,
      y: y,
      placeName: placeName,
      address: address,
    });
  };

  /*
   * value 변경시 스테이트 값 변경
   */
  changeState = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  /*리뷰 모달창 보이게 */
  showReviewForm = () => {
    this.setState({
      reviewModal: true,
      filterModal: false,
      myListModal: false,
    });
  };

  /*필터 모달창 보이게 */
  showFilterForm = () => {
    if (this.state.filterModal) {
      this.setState({
        filterModal: false,
      });
    } else {
      this.setState({
        filterModal: true,
        myListModal: false,
        friendModal: false,
      });
    }
  };

  /*마이리스트 모달창 보이게 */
  showMyListForm = () => {
    if (this.state.myListModal) {
      this.setState({
        myListModal: false,
      });
    } else {
      this.setState({
        myListModal: true,
        filterModal: false,
        friendModal: false,
      });
    }
  };

  /*친구 추가 모달창 보이게 */
  showfriendForm = () => {
    if (this.state.myListModal) {
      this.setState({
        friendModal: false,
      });
    } else {
      this.setState({
        friendModal: true,
        filterModal: false,
        myListModal: false,
      });
    }
  };

  /*
   * 리뷰창으로 넘어가는 메소드
   */
  reivewPageMove = (userPlaceId) => {
    this.props.reivewPageMove(userPlaceId);
  };

  /*
   * 리뷰글 등록 버튼 클릭시 실행
   */
  onSubmitReview = (e) => {
    e.preventDefault();
    //데이터 유효성 검사
    if (this.state.subject === "") {
      alert("제목을 입력해주세요.");
      return false;
    }
    if (this.state.content === "") {
      alert("내용을 입력해주세요.");
      return false;
    }
    if (this.state.category === "") {
      alert("카테고리를 선택해주세요.");
      return false;
    }
    if (this.state.starScore === 0) {
      alert("맛집 평가를 해주세요.");
      return false;
    }
    if (this.state.x === 0 && this.state.y === 0) {
      alert("맛집을 등록해주세요.");
      return false;
    }
    if (this.state.placeName === "") {
      alert("상호명을 입력해주세요.");
      return false;
    }

    const url = "/post/add";
    Axios.post(url, {
      user_id: sessionStorage.getItem("userId"),
      latitude_x: this.state.x,
      longitude_y: this.state.y,
      name: this.state.placeName,
      address: this.state.address,
      subject: this.state.subject,
      content: this.state.content,
      category: this.state.category,
      rating: this.state.starScore,
      front_image: this.state.front_image,
      image_id: this.state.imageId,
    })
      .then((response) => {
        // 리뷰글 등록후 state값 초기화
        this.setState({
          x: "",
          y: "",
          placeName: "",
          address: "",
          subject: "",
          content: "",
          category: "",
          starScore: 0,
          front_image: null,
          imageId: [],
        });
        const id = response.data.id;
        const userPlaceId = response.data.user_place_id;

        this.setState({ reviewModal: false, fullMap: false });
        this.props.reivewPageMove(userPlaceId);
        this.props.history.push(`/mechelin/review/${userPlaceId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /*
   * 내 맛집 필터 기능
   */
  onClickMyMapFilter = (checked) => {
    MyFilter = checked;
    this.setState({
      myFilter: checked,
    });
  };
  onChangeFriendMapFilter = (checked) => {
    FriendFilter = checked;
    this.setState({
      friendFilter: checked,
    });
  };
  onClickCategoryFilter = (checkedValues) => {
    categoryFilter = checkedValues;
    this.setState({
      categoryFilter: checkedValues,
    });
  };
  onClickBlackListFilter = (checked) => {
    blacklist = checked;
    this.setState({
      blacklist: checked,
    });
  };
  myPlaceRender = (num) => {
    render = render + num;
    this.setState({
      render: this.state.render + num,
    });
  };

  render() {
    return (
      <div>
        {this.state.fullMap ? (
          <div>
            <MainMap
              history={this.props.history}
              MyFilter={MyFilter}
              FriendFilter={FriendFilter}
              categoryFilter={categoryFilter}
              blacklistFilter={blacklist}
              reivewPageMove={this.reivewPageMove.bind(this)}
              render={render}
            />
            {/*하단 메뉴바 */}
            <div style={{ cursor: "pointer" }}>
              <div
                className="menuBall xi-home-o xi-3x"
                onClick={this.showBottomMenu.bind(this)}
                style={{
                  zIndex: this.props.bar ? "-2" : "2",
                  transition: this.props.bar ? "all 1s" : "all 1s ease 0.5s",
                }}
              ></div>
              <div className="subMenuBall">
                <div
                  className="filter"
                  onClick={this.showFilterForm.bind(this)}
                  style={{
                    bottom: this.state.bottomMenu ? "1.5%" : "-20%",
                    left: this.state.bottomMenu ? "37%" : "50%",
                  }}
                >
                  <img src={filter} width="30px" height="20px" alt="" />
                </div>
                <div
                  className="review"
                  onClick={this.showReviewForm.bind(this)}
                  style={{
                    bottom: this.state.bottomMenu ? "12.5%" : "-20%",
                    left: this.state.bottomMenu ? "43.1%" : "50%",
                  }}
                >
                  <img
                    style={{ marginLeft: "5px" }}
                    src={review}
                    width="32px"
                    height="32px"
                    alt=""
                  />
                </div>
                <div
                  className="list"
                  onClick={this.showMyListForm.bind(this)}
                  style={{
                    bottom: this.state.bottomMenu ? "12.5%" : "-20%",
                    right: this.state.bottomMenu ? "43.1%" : "50%",
                  }}
                >
                  <img
                    style={{ marginLeft: "1px" }}
                    src={list}
                    width="30px"
                    height="27px"
                    alt=""
                  />
                </div>
                <div
                  className="friend"
                  onClick={this.showfriendForm.bind(this)}
                  style={{
                    bottom: this.state.bottomMenu ? "1.5%" : "-20%",
                    right: this.state.bottomMenu ? "37%" : "50%",
                  }}
                >
                  <img
                    style={{ marginLeft: "5px" }}
                    src={friend}
                    width="30px"
                    height="30px"
                    alt=""
                  />
                </div>
              </div>
            </div>
            {/* 백그라운드(섹션이 열렸을 때 배경 까맣게 해주는 것) */}
            <div
              className="background"
              style={{
                width: "100vw",
                height: "100vh",
                position: "absolute",
                zIndex: "2",
                opacity: "0.7",
                backgroundColor: this.state.reviewModal ? "black" : "none",
                display: this.state.reviewModal ? "block" : "none",
                top: "0",
                left: "0",
              }}
            ></div>
            {this.state.reviewModal ? (
              <section
                style={{
                  clear: "both",
                  background: "white",
                  border: "1px solid rgba(0,0,0,.2)",
                  borderRadius: "10px",
                  width: "50vw",
                  height: "87vh",
                  boxShadow: "5px 5px 5px rgba(0,0,0,.1)",
                  position: "absolute",
                  zIndex: "9999",
                  left: "50%",
                  top: "7%",
                  transform: "translateX(-50%)",
                  color: "rgba(0, 0, 0, 0.65)",
                }}
              >
                <h3
                  style={{
                    margin: "3vh 2vw",
                    color: "rgba(0, 0, 0, 0.65)",
                  }}
                >
                  리뷰 작성
                </h3>
                <hr
                  style={{
                    border: "1px solid rgba(0,0,0,.1)",
                    marginBottom: "4.5vh",
                  }}
                />
                <div
                  className="formInner"
                  style={{
                    overflowY: "auto",
                    marginLeft: "-1vw",
                    width: "45vw",
                    height: "60vh",
                    boxShadow: "none",
                    margin: "1vh auto 3vh",
                    paddingRight: "2vw",
                  }}
                >
                  <Input
                    name="subject"
                    style={{
                      marginLeft: "0.15vw",
                      width: "20vw",
                      height: "5vh",
                      float: "left",
                    }}
                    type="text"
                    placeholder="제목"
                    onChange={this.changeState.bind(this)}
                  />
                  <select
                    className="form-control"
                    name="category"
                    style={{
                      marginLeft: "1.2vw",
                      width: "10vw",
                      height: "5vh",
                      float: "left",
                      fontSize: "12px",
                      paddingLeft: "3px",
                      paddingRight: "3px",
                      color: "rgba(0, 0, 0, 0.65)",
                    }}
                    onChange={this.changeState.bind(this)}
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
                        onMouseOver={this.onMouseOver.bind(this)}
                        onChange={this.handleChange.bind(this)}
                        sIdx={this.state.sIdx}
                        rating={this.state.rating}
                        cacheIdx={this.state.cacheIdx}
                        cacheRating={this.state.cacheRating}
                        score={this.state.starScore}
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
                      {this.state.starScore === 0
                        ? this.state.starScore
                        : this.state.starScore % 1 === 0
                        ? `${this.state.starScore}.0`
                        : this.state.starScore}
                    </div>
                  </div>
                  <br />
                  <div
                    className="text-editor"
                    style={{ height: "53vh", marginTop: "6vh", clear: "both" }}
                  >
                    <ReactQuill
                      theme="snow"
                      ref={(el) => (this.quillRef = el)}
                      name="content"
                      value={this.state.content} // state 값
                      onChange={this.changeEditor.bind(this)}
                      modules={this.modules}
                      formats={this.formats}
                      style={{
                        margin: "0 auto",
                        width: "41.5vw",
                        height: "40vh",
                      }}
                    />
                  </div>
                  <div
                    className="map"
                    style={{
                      margin: "0 auto 3vh",
                      width: "41.5vw",
                      height: "50vh",
                      border: "0px solid #999",
                    }}
                  >
                    <WriteFormMap mapData={this.mapData.bind(this)} />
                  </div>
                </div>

                <Button
                  style={{
                    clear: "both",
                    width: "10vw",
                    height: "5vh",
                    marginLeft: "12vw",
                  }}
                  onClick={this.onSubmitReview.bind(this)}
                >
                  등록하기
                </Button>
                <Button
                  htmltpe="reset"
                  style={{
                    clear: "both",
                    width: "10vw",
                    height: "5vh ",
                    marginLeft: "4vw",
                  }}
                  onClick={() => {
                    this.setState({
                      reviewModal: false,
                    });
                  }}
                >
                  취소
                </Button>
              </section>
            ) : (
              ""
            )}{" "}
          </div>
        ) : (
          ""
        )}

        {/*필터 모달창 */}
        <section>
          <div
            className="filterModal"
            style={{
              display:
                this.state.filterModal && !this.props.bar ? "block" : "none",
              clear: "both",
              background: "white",
              border: "1px solid rgba(0,0,0,.2)",
              borderRadius: "10px",
              width: "15vw",
              height: "41vh",
              boxShadow: "5px 5px 5px rgba(0,0,0,.1)",
              position: "absolute",
              zIndex: "9999",
              left: "10%",
              bottom: "15%",
            }}
          >
            <div
              className="closeFilter xi-close"
              onClick={() => {
                this.setState({ filterModal: false });
              }}
              style={{
                position: "absolute",
                right: "4%",
                top: "4%",
                fontSize: "3vh",
                color: "rgba(245,145,45)",
                cursor: "pointer",
                zIndex: "1",
              }}
            ></div>
            <div
              id="content"
              style={{
                width: "15vw",
                height: "37vh",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <div
                style={{
                  fontSize: "2.5vh",
                  marginLeft: "2vh",
                  textAlign: "left",
                }}
              >
                필터
              </div>
              <hr
                style={{
                  borderColor: "rgba(0,0,0,.2)",
                  margin: "1vh 0 3vh",
                }}
              />
              <div
                className="checkButton"
                style={{
                  width: "8vw",
                  height: "auto",
                  margin: "0 auto",
                }}
              >
                <Switch
                  defaultChecked
                  onChange={this.onClickMyMapFilter.bind(this)}
                  style={{ marginRight: "1.5vh" }}
                />
                내 맛집
                <br />
                <br />
                <Switch
                  defaultChecked
                  onChange={this.onChangeFriendMapFilter.bind(this)}
                  style={{ marginRight: "1.5vh" }}
                />
                친구 맛집
                <br />
                <br />
                <Switch
                  onChange={this.onClickBlackListFilter.bind(this)}
                  style={{ marginRight: "1.5vh" }}
                />
                블랙리스트
                <br />
                <br />
                <Checkbox.Group
                  style={{ width: "11vw", lineHeight: "5vh" }}
                  options={categoryOptions}
                  defaultValue={["한식", "양식", "중식", "일식"]}
                  onChange={this.onClickCategoryFilter.bind(this)}
                />
                <br />
              </div>
            </div>
          </div>
        </section>

        {/*마이리스트 모달창*/}
        <section>
          <div
            className="mylist"
            style={{
              display:
                this.state.myListModal && !this.props.bar ? "block" : "none",
              clear: "both",
              background: "white",
              border: "1px solid rgba(0,0,0,.2)",
              borderRadius: "10px",
              width: "20vw",
              height: "72vh",
              boxShadow: "5px 5px 5px rgba(0,0,0,.1)",
              position: "absolute",
              zIndex: "9999",
              left: "3%",
              bottom: "5%",
            }}
          >
            <div
              style={{
                fontSize: "2.5vh",
                margin: "2vh 0 1.5vh 3vh",
                textAlign: "left",
              }}
            >
              나의 맛집 리스트
            </div>
            <hr
              style={{
                borderColor: "rgba(0,0,0,.2)",
                margin: "1vh 0 3vh",
              }}
            />
            <div
              style={{
                width: "18vw",
                height: "51vh",
                margin: "0 auto",
              }}
            >
              <MyListComponent
                reivewPageMove={this.reivewPageMove.bind(this)}
                history={this.props.history}
                myPlaceRender={this.myPlaceRender.bind(this)}
              />
            </div>
            <Button
              type="primary"
              onClick={() => {
                this.setState({ myListModal: false });
              }}
              style={{
                transform: "translateX(-50%)",
                position: "absolute",
                top: "90%",
                left: "50%",
              }}
            >
              닫기
            </Button>
          </div>
        </section>

        {/*친구 추가 모달창 */}
        <section>
          <div
            className="friendModal"
            style={{
              display:
                this.state.friendModal && !this.props.bar ? "block" : "none",
              clear: "both",
              background: "white",
              border: "1px solid rgba(0,0,0,.2)",
              borderRadius: "10px",
              width: "20vw",
              height: "25vh",
              boxShadow: "5px 5px 5px rgba(0,0,0,.1)",
              position: "absolute",
              zIndex: "9999",
              right: "10%",
              bottom: "15%",
            }}
          >
            <div
              className="closeFilter xi-close"
              onClick={() => {
                this.setState({ friendModal: false });
              }}
              style={{
                position: "absolute",
                right: "4%",
                top: "8%",
                fontSize: "3vh",
                color: "rgba(245,145,45)",
                cursor: "pointer",
                zIndex: "1",
              }}
            ></div>
            <div
              id="content"
              style={{
                width: "20vw",
                height: "20vh",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <div
                style={{
                  fontSize: "2.5vh",
                  marginLeft: "2vh",
                  textAlign: "left",
                }}
              >
                친구 추가
              </div>
              <hr
                style={{
                  borderColor: "rgba(0,0,0,.2)",
                  margin: "1vh 0 3vh",
                }}
              />
              <Input
                name="friendEmail"
                onChange={this.changeState.bind(this)}
                placeholder="상대방의 이메일 입력하세요."
                style={{
                  width: "15vw",
                  margin: "0 2.5vw",
                  textAlign: "center",
                }}
              ></Input>
              <button
                className="form-control"
                style={{
                  width: "8vw",
                  height: "5vh",
                  marginTop: "5vh",
                  color: "white",
                  margin: "3vh auto 0",
                  border: "none",
                  backgroundColor: "rgba(245,145,45)",
                }}
              >
                친구 요청
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default FullMap;
