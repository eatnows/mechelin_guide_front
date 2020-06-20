import React from "react";
import Axios from "util/axios";
//import Comment from "pages";
class NewsFeed extends React.Component {
  constructor({ match, props }) {
    super(props);
    this.state = {
      email: match.params.email,
      Data: [],
      time: "",
      ex: "2020-05-09 05:30",
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
    let createAt = parseDate(this.props.create_at);
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
    let url = "/newsfeed/getAllPost?email=" + this.state.email;
    Axios.get(url)
      .then((res) => {
        this.setState({
          Data: res.data,
        });
      })
      .catch((err) => {
        console.log("getAllPost error:" + err);
      });
  };
  render() {
    return (
      <div>
        {this.state.Data.map((row, idx) => (
          <table>
            <thead>
              <th>
                <td>{this.state.Data.row.subject}</td>
                <td>{this.state.Data.row.rating}</td>
              </th>
              <th>
                <td>{this.state.Data.row.profile_url}</td>
                <td>
                  {this.state.Data.row.nickname}
                  <br />
                  {this.state.Data.row.create_at}
                </td>
              </th>
            </thead>
            <tbody>
              <tr>{this.state.Data.row.content}</tr>
              <tr>{this.state.Data.row.likes}</tr>
              <tr>{/* {  <Comment row={row} idx={idx} key={row.num} />} */}</tr>
            </tbody>
          </table>
        ))}
        {this.state.time}
      </div>
    );
  }
}
export default NewsFeed;
