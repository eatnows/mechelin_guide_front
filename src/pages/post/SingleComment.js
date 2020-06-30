import React from "react";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { Comment, List, Tooltip, Button } from "antd";

const SingleComment = ({
  item,
  i,
  cLikeChange,
  cUpdateClick,
  cDeleteChange,
}) => {
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

  const like = (e) => {
    cLikeChange(item.id, sessionStorage.getItem("userId"));
  };
  const updateComment = (e) => {
    cUpdateClick(item.id, item.content);
  };
  const deleteComment = (e) => {
    cDeleteChange(item.id);
  };

  const data = [
    {
      actions: [
        <span key="comment-basic-like">
          <Tooltip
            title="Like"
            commentId={item.id}
            userId={sessionStorage.getItem("userId")}
            fill="rgba(245,145,45)"
          >
            {React.createElement(
              item.now_liked === true ? LikeFilled : LikeOutlined,
              {
                onClick: like,
              }
            )}
          </Tooltip>
          <span className="comment-action"> {item.likes}</span>
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
    <div
      key={i}
      style={{
        borderBottom: "1px solid rgba(0,0,0,.2)",
        paddingTop: "5px",
        width: "100%",
      }}
    >
      <List
        className="comment-list"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(a) => (
          <li style={{ width: "48vw" }}>
            <Comment
              actions={a.actions}
              author={a.author}
              avatar={a.avatar}
              content={a.content}
              datetime={a.datetime}
              style={{ float: "left", width: "40vw" }}
            />{" "}
            {sessionStorage.getItem("userId") === item.user_id ? (
              <div
                style={{
                  width: "1vw",
                  position: "absolute",
                  top: "50%",
                  right: "7%",
                  transform: "translateY(-50%)",
                }}
              >
                <Button
                  onClick={updateComment}
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
                  onClick={deleteComment}
                  commentId={item.id}
                >
                  삭제
                </Button>
              </div>
            ) : (
              ""
            )}
          </li>
        )}
      />
    </div>
  );
};

export default SingleComment;
