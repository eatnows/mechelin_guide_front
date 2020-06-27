import React from "react";
import Axios from "util/axios";
import Comment from "pages/post/Comment";
import "css/postStyle.css";
import profile from "images/default_profile.png";
import insta from "images/insta.jpg";
import { Rate } from "antd";
var nowTime = (data) => {
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
//import Comment from "pages";
class NewsFeed extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      Data: [],
      time: "",
      row: sessionStorage.getItem("userId"),
      realTime: "",
      heart: "",
    };
  }
  componentWillMount() {
    this.getAllPost();
    this.props.getState(false);
    console.log("현재날짜:" + this.state.realTime);
  }

  /*포스트 내용 가져오기 */
  getAllPost = () => {
    let url =
      "/post/newsfeed/getallpost?user_id=" +
      sessionStorage.getItem("userId") +
      "&row=" +
      0;
    //this.state.row;
    Axios.get(url)
      .then((res) => {
        console.log(res.data);

        this.setState({
          Data: res.data,
        });
        console.log(this.state.Data);
      })
      .catch((err) => {
        console.log("getAllPost error:" + err);
      });
  };

  //게시글 올린 날짜(현재시간 기준으로 얼마나 지났는지 표시)
  nowTime = () => {
    // parse a date in yyyy-mm-dd format
    const parseDate = (input) => {
      var parts = input.match(/(\d+)/g);
      // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
      var createAt = new Date(
        parts[0],
        parts[1] - 1,
        parts[2],
        parts[3],
        parts[4]
      ); // months are 0-based
      return createAt;
    };

    let now = new Date();
    let createAt = parseDate(this.state.realTime);
    let timeDiff = now.getTime() - createAt.getTime();
    timeDiff /= 1000 * 60;

    if (isNaN(timeDiff) || timeDiff < 0) return;

    let simpleTime = "";
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
    this.setState({
      time: simpleTime,
    });
  };

  /*좋아요 클릭시 이미지 변경 */
  clickHeart = () => {
    if (this.state.heart) {
      this.setState({
        heart: false,
      });
    } else {
      this.setState({
        heart: true,
      });
    }
  };

  render() {
    return (
      <div>
        <div className="sideMenu">뉴스피드</div>
        <div className="list">
          {this.state.Data.map((row, idx) => (
            <form>
              <table className="postTable">
                <thead>
                  <tr>
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
                  <tr style={{ backgroundColor: "white" }}>
                    <th
                      style={{
                        paddingRight: "0",
                        width: "65px",
                      }}
                    >
                      <img
                        src={profile}
                        alt=""
                        style={{
                          width: "3vw",
                          borderRadius: "50%",
                          height: "3vw",
                        }}
                      />
                      {/* <img src={row.profile_url} alt="" /> */}
                    </th>
                    <th colspan="3" style={{ paddingLeft: "10px" }}>
                      {row.nickname}
                      <br />
                      {this.state.realTime}
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
                  <tr style={{ backgroundColor: "white" }}>
                    <td colSpan="5">
                      <span
                        dangerouslySetInnerHTML={{ __html: row.content }}
                      ></span>
                      <img src={insta} alt="" width="100%" height="70%" />
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          height: "30px",
                          width: "50px",
                          lineHeight: "30px",
                          fontSize: "20px",
                        }}
                      >
                        <div
                          className={
                            this.state.heart ? "xi-heart-o" : "xi-heart"
                          }
                          style={{
                            cursor: "pointer",
                            fontSize: "25px",
                            color: "rgba(156, 197, 87)",
                          }}
                          onClick={this.clickHeart.bind(this)}
                        >
                          {" "}
                        </div>{" "}
                        <span style={{ color: "#7D67AF" }}>{row.likes}</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">
                      <Comment postId={row.id} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          ))}
        </div>
      </div>
    );
  }
}
export default NewsFeed;
