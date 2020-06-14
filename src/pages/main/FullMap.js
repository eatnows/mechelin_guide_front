import React from "react";
import star from "images/star.png";
import ReactQuill, { Quill } from "react-quill";
import { ImageUpload } from "quill-image-upload";
import "react-quill/dist/quill.snow.css";
Quill.register("modules/imageUpload", ImageUpload);

class FullMap extends React.Component {
  state = {
    section: false,
    text: "",
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

  changeEditor = (e) => this.setState({ text: e });
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
            <form method="post">
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
                  style={{
                    marginLeft: "0.15vw",
                    width: "20vw",
                    height: "5vh",
                    float: "left",
                  }}
                  type="text"
                  placeholder="제목"
                />
                <select
                  className="form-control"
                  style={{
                    marginLeft: "1.2vw",
                    width: "10vw",
                    height: "5vh",
                    float: "left",
                    fontSize: "12px",
                    paddingLeft: "3px",
                    paddingRight: "3px",
                  }}
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
                    marginTop: "1.1vh",
                    marginLeft: "0.5vw",
                  }}
                >
                  <div
                    style={{
                      width: "3vw",
                      display: "inline-block",
                    }}
                  >
                    평점
                  </div>
                  <div
                    className="star"
                    style={{ display: "inline-block", width: "7vw" }}
                  >
                    <img
                      src={star}
                      alt=""
                      style={{
                        width: "1.2vw",
                        height: "2.3vh",
                      }}
                    />
                    <img
                      src={star}
                      alt=""
                      style={{
                        width: "1.2vw",
                        height: "2.3vh",

                        marginLeft: "0.1vw",
                      }}
                    />
                    <img
                      src={star}
                      alt=""
                      style={{
                        width: "1.2vw",
                        height: "2.3vh",

                        marginLeft: "0.1vw",
                      }}
                    />
                    <img
                      src={star}
                      alt=""
                      style={{
                        width: "1.2vw",
                        height: "2.3vh",

                        marginLeft: "0.1vw",
                      }}
                    />
                    <img
                      src={star}
                      alt=""
                      style={{
                        width: "1.2vw",
                        height: "2.3vh",

                        marginLeft: "0.1vw",
                      }}
                    />
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
                    value={this.state.text} // state 값
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
                    height: "30vh",
                    border: "1px solid #999",
                  }}
                ></div>
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
