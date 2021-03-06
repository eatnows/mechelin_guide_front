import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import Axios from "util/axios";
import SingleComment from "./SingleComment";
import profile from "images/default_profile.png";
/*
  댓글 영역
*/
const Comment = ({ postId }) => {
  const [list, setList] = useState([]);
  const [writeComment, setWriteComment] = useState("");
  const [updateView, setUpdateView] = useState(false);
  const [updateId, setUpdateId] = useState("");
  /*
    componentWillMount
  */
  useEffect(() => {
    // 최초 출력
    commentList();
  }, []);

  /*
    댓글 list 갱신 (+재출력)
  */
  const commentList = () => {
    const url = `comment/getcomments`;
    Axios.post(url, {
      post_id: postId,
      user_id: sessionStorage.getItem("userId"),
    })
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*
    댓글 좋아요 클릭 시 실행(SingleComment 와 바인드)
  */
  const onCommentLike = (commentId, userId) => {
    const url = `likes/comment`;
    Axios.post(url, {
      comment_id: commentId,
      user_id: userId,
    })
      .then((response) => {
        // 재출력
        commentList();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /*
    댓글 삭제 클릭 시 실행(SingleComment 와 바인드)
  */
  const onCommentDelete = (commentId) => {
    const url = `comment/deletecomment` + `?comment_id=${commentId}`;
    Axios.get(url)
      .then((response) => {
        // 재출력
        commentList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*
    댓글 추가
  */
  const commentInsert = (postId, userId) => {
    if (writeComment === "") {
      return;
    }
    const url = `comment/insertcomment`;
    Axios.post(url, {
      user_id: userId,
      post_id: postId,
      content: writeComment,
    })
      .then((response) => {
        setWriteComment("");
        commentList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*
    댓글 수정 내용+버튼 표시
  */
  const setCommentUpdate = (commentId, content) => {
    setUpdateView(true);
    setUpdateId(commentId);
    setWriteComment(content);
  };

  /*
    댓글 수정 제출
  */
  const onCommentUpdate = () => {
    const url = `comment/updatecomment`;
    Axios.post(url, {
      id: updateId,
      content: writeComment,
    })
      .then((response) => {
        setUpdateView(false);
        setWriteComment("");
        commentList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {/* 단일 댓글 하나씩 import */}
      {[...list].map((item, i) => {
        return (
          <SingleComment
            item={item}
            key={i}
            cLikeChange={onCommentLike}
            cUpdateClick={setCommentUpdate}
            cDeleteChange={onCommentDelete}
          />
        );
      })}
      {/* 새 댓글 작성 영역 */}
      <div
        style={{
          marginTop: "10px",
          padding: ".3vw 0 1vw",
          borderTop: "rgba(0,0,0,.2)",
        }}
      >
        <img
          src={profile}
          alt=""
          style={{
            width: "33px",
            height: "33px",
            display: "inline-block",
          }}
        />
        <Input
          type="text"
          value={writeComment}
          onInput={(e) => setWriteComment(e.target.value)}
          style={{
            marginLeft: "10px",
            width: "84%",
            height: "35px",
            display: "inline-block",
          }}
        />
        {/* 댓글수정 시 내용변경 */}
        <div style={{ marginLeft: "10px", display: "inline-block" }}>
          {updateView ? (
            <Button
              type="primary"
              onClick={(e) => onCommentUpdate()}
              style={{ backgroundColor: "#9CC557", borderColor: "#9CC557 " }}
            >
              수정
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() =>
                commentInsert(postId, sessionStorage.getItem("userId"))
              }
            >
              작성
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Comment;
