import React from "react";
import Axios from "util/axios";
import Comment from "pages/post/Comment";
//import Comment from "pages";
class NewsFeed extends React.Component {
  constructor({ match, props }) {
    super(props);
    this.state = {
      email: match.params.email,
      Data: [],
      time: "",
      ex: "2020-05-09 05:30",
      row: 5,
    };
  }
  componentWillMount() {
    this.getAllPost();
    this.nowTime();
  }
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
    let createAt = parseDate("2020-05-04 04:45");
    let timeDiff = now.getTime() - createAt.getTime();
    timeDiff /= 1000 * 60;

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
  render() {
    return (
      <div>
        {this.state.Data.map((row, idx) => (
          <form>
            <table
              style={{
                border: "1px solid #999",
                width: "50vw",
                position: "absolute",
                left: "50%",
                top: "20%",
                transform: "translateX(-50%)",
              }}
              className="table"
            >
              <thead>
                <tr style={{ width: "50%" }}>
                  <th colSpan="2">{row.name}</th>
                </tr>
                <tr>
                  <th>사진:{row.profile_url}</th>
                  <th>
                    닉네임:{row.nickname}
                    <br />
                    작성일:{row.create_at}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="2">
                    제목:{row.subject}{" "}
                    <div style={{ float: "right" }}>{row.rating}점</div>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">내용:{row.content}</td>
                </tr>
                <tr>
                  <td colSpan="2">좋아요:{row.likes}</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <Comment row={row} idx={idx} key={row.num} />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        ))}
        {this.state.time}
      </div>
    );
  }
}
export default NewsFeed;
