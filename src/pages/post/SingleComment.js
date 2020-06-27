import React, { useState } from "react";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import { Comment, List, Tooltip, Button } from "antd";
const SingleComment = ({ item, cLikeChange, cUpdateClick, cDeleteChange }) => {
  //게시글 올린 날짜(현재시간 기준으로 얼마나 지났는지 표시)
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

  const [likes, setLikes] = useState(`${item.likes}`);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const like = (e) => {
    setLikes(`${item.likes}`);
    setAction("liked");
    cLikeChange(e);
  };

  const data = [
    {
      actions: [
        <span key="comment-basic-like">
          <Tooltip
            title="Like"
            commentId={item.id}
            userId={sessionStorage.getItem("userId")}
          >
            {React.createElement(
              action === "liked" ? LikeFilled : LikeOutlined,
              {
                onClick: like,
              }
            )}
          </Tooltip>
          <span className="comment-action">{likes}</span>
        </span>,
        <span key="comment-list-reply-to-0">답글 달기</span>,
      ],
      author: `${item.nickname}`,
      avatar: `${item.profile_url}`,
      content: <p>{item.content}</p>,
      datetime: `${nowTime(item.updated_at)}`,
    },
  ];

  return (
    <div>
      <tr style={{ borderTop: "1px solid #9CC557", width: "100%" }}>
        <td colSpan="5">
          <List
            className="comment-list"
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(a) => (
              <li width="100%">
                <Comment
                  actions={a.actions}
                  author={a.author}
                  avatar={a.avatar}
                  content={a.content}
                  datetime={a.datetime}
                />{" "}
                {sessionStorage.getItem("userId") === item.user_id ? (
                  <span style={{ float: "right" }}>
                    <Button
                      onClick={cUpdateClick}
                      commentId={item.id}
                      content={item.content}
                      style={{
                        color: "#7D67AF ",
                        borderRadius: "5px",
                        backgroundColor: "white",
                      }}
                    >
                      수정
                    </Button>
                    <Button
                      style={{
                        color: "red",
                        borderRadius: "5px",
                        backgroundColor: "white",
                      }}
                      onClick={cDeleteChange}
                      commentId={item.id}
                    >
                      삭제
                    </Button>
                  </span>
                ) : (
                  ""
                )}
              </li>
            )}
          />
        </td>
      </tr>
    </div>
  );
};

export default SingleComment;
