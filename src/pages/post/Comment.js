import React from "react";

class Comment extends React.Component {
  state = {};
  componentWillMount() {
    this.nowTime();
  }
  nowTime = () => {
    let now = new Date();
    let timeDiff = now.getTime() - this.props.create_at.getTime();
    let simpleTime = "";
    if ((timeDiff /= 1000 * 60)) {
      simpleTime = "방금 전";
    } else if (timeDiff < 60) {
      simpleTime = timeDiff + "분 전";
    } else if (timeDiff < 60 * 24) {
      simpleTime = timeDiff + "시간 전";
    } else if (timeDiff < 60 * 24 * 30) {
      simpleTime = timeDiff + "일 전";
    } else if (timeDiff < 60 * 24 * 30 * 12) {
      simpleTime = timeDiff + "달 전";
    } else {
      simpleTime = timeDiff + "년 전";
    }
  };
  render() {
    return (
      <div>
        <tr>
          <td>d</td>
        </tr>
      </div>
    );
  }
}
export default Comment;
