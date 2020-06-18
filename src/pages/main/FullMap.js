import React from "react";

import ReactQuill, { Quill } from "react-quill";
import { ImageUpload } from "quill-image-upload";
import "react-quill/dist/quill.snow.css";
//import e from "cors";
import StarRate from "./StarRate";
import WriteFormMap from "components/map/WriteFormMap";
import Axios from "axios";
import { Link } from "react-router-dom";

Quill.register("modules/imageUpload", ImageUpload);

class FullMap extends React.Component {
  state = {
    section: false,
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
      url: "http://192.168.0.5:3000/images", // server url
      method: "POST", // change query method, default 'POST'
      name: "images", // 아래 설정으로 image upload form의 key 값을 변경할 수 있다.
      headers: {
        //Authorization: `Bearer ${}`,
        "X-Total-Count": 0,
      },
      callbackOK: (serverResponse, next) => {
        // 성공하면 리턴되는 함수
        next(serverResponse);
      },
      callbackKO: (serverError) => {
        // 실패하면 리턴되는 함수
        console.log(serverError);
        // alert(serverError);
      },
      // optional
      // add callback when a image have been chosen
      checkBeforeSend: (file, next) => {
        console.log(file);
        next(file); // go back to component and send to the server
      },
    },
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    // imageDrop: true, // imageDrop 등록
    // imageResize: {} // imageResize 등록
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
   * 카테고리 변경했을때 실행
   */
  handleCategory = (e) => {
    this.setState({
      category: e.target.value,
    });
  };
  /*
   * 제목에 기입했을때 실행
   */
  handleSubject = (e) => {
    this.setState({
      subject: e.target.value,
    });
  };
  /*
   * 리뷰글 등록 버튼 클릭시 실행
   */
  onSubmitReview = (e) => {
    e.preventDefault();
    //데이터 유효성 검사
    // if (this.state.subject === "") {
    //   alert("제목을 입력해주세요.");
    //   return false;
    // }
    // if (this.state.content === "") {
    //   alert("내용을 입력해주세요.");
    //   return false;
    // }
    // if (this.state.category === "") {
    //   alert("카테고리를 선택해주세요.");
    //   return false;
    // }
    // if (this.state.starScore === 0) {
    //   alert("맛집 평가를 해주세요.");
    //   return false;
    // }
    // if (this.state.x === 0 && this.state.y === 0) {
    //   alert("맛집을 등록해주세요.");
    //   return false;
    // }
    // if (this.state.placeName === "") {
    //   alert("상호명을 입력해주세요.");
    //   return false;
    // }

    const url = "http://localhost:9000/mechelin/post/add";
    Axios.post(url, {
      user_id: 5,
      latitude_x: this.state.x,
      longitude_y: this.state.y,
      name: this.state.placeName,
      address: this.state.address,
      subject: this.state.subject,
      content: this.state.content,
      category: this.state.category,
      rating: this.state.starScore,
      front_image: this.state.front_image,
    })
      .then((response) => {
        console.log("데이터 주고받기 완료");
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
        });
        const userPlaceId = response.data.user_place_id;
        console.log(response.data.user_place_id);
        this.props.history.push(`/review/${userPlaceId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const seroStyle = {
      width: "5vw",
      height: "10vh",
      borderBottom: "1px solid white",
      lineHeight: "10vh",
      color: "white",
      fontWeight: "normal",
      fontSize: "15px",
      textAlign: "center",
    };

    return (
      <div>
        <div
          className="background"
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            zIndex: "2",
            opacity: "0.7",
            backgroundColor: this.state.section ? "black" : "none",
            display: this.state.section ? "block" : "none",
          }}
        ></div>
        {this.state.section ? (
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
            }}
          >
            <form onSubmit={this.onSubmitReview.bind(this)}>
              <h3 style={{ margin: "3vh 2vw" }}>리뷰 작성</h3>
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
                <input
                  className="form-control"
                  name="subject"
                  style={{
                    marginLeft: "0.15vw",
                    width: "20vw",
                    height: "5vh",
                    float: "left",
                  }}
                  type="text"
                  placeholder="제목"
                  onChange={this.handleSubject.bind(this)}
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
                  }}
                  onChange={this.handleCategory.bind(this)}
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
                    }}
                  >
                    <StarRate
                      onMouseOver={this.onMouseOver.bind(this)}
                      onChange={this.handleChange.bind(this)}
                      sIdx={this.state.sIdx}
                      rating={this.state.rating}
                      cacheIdx={this.state.cacheIdx}
                      cacheRating={this.state.cacheRating}
                      score={this.state.score}
                    />
                  </div>
                  <div
                    style={{
                      width: "2vw",
                      lineHeight: "5vh",
                      display: "inline-block",
                      fontSize: "1.5em",
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

              <button
                type="submit"
                className="btn btn-warning"
                style={{
                  clear: "both",
                  width: "10vw",
                  height: "5vh",
                  color: "white",
                  marginLeft: "12vw",
                }}
              >
                등록하기
              </button>
              <button
                type="reset"
                className="btn btn-warning"
                style={{
                  clear: "both",
                  width: "10vw",
                  height: "5vh ",
                  color: "white",
                  marginLeft: "4vw",
                }}
                onClick={() => {
                  this.setState({
                    section: false,
                  });
                }}
              >
                취소
              </button>
            </form>
          </section>
        ) : (
          ""
        )}{" "}
        <nav style={{ float: "right" }}>
          <ul
            style={{
              width: "5vw",
              height: "30vh",
              backgroundColor: "rgba(245,145,45)",
              borderRadius: "10px",
              transform: "translate(50%,95%)",
              position: "absolute",
              left: "90%",
              top: "0%",
              cursor: "pointer",
            }}
          >
            <li
              style={seroStyle}
              onClick={() => {
                this.setState({ idx: 3 });
              }}
            >
              필터
            </li>
            <li
              style={seroStyle}
              onClick={() => {
                this.setState({ section: true });
              }}
            >
              리뷰 작성
            </li>
            <li
              style={seroStyle}
              onClick={() => {
                this.setState({ idx: 5 });
              }}
            >
              DM
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default FullMap;
