import React, { useState, useEffect } from "react";

import Axios from "axios";
import SingleComment from "./SingleComment";

/*
  댓글 영역
*/
const Comment = ({ postId, userId }) => {
  const [list, setList] = useState([]);

  /*
    componentWillMount
  */
  useEffect(() => {
    // 출력
    commentList();
  }, []);

  /*
    댓글 list 갱신 (재출력)
  */
  const commentList = () => {
    const url = `http://localhost:9000/mechelin/comment/getcomments?post_id=${postId}`;
    Axios.get(url)
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
  const onCommentLike = (e) => {
    const url = `http://localhost:9000/mechelin/likes/upcommlike`;
    Axios.post(url, {
      comment_id: e.target.getAttribute("commentId"),
      user_id: e.target.getAttribute("userId"),
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
  const onCommentDelete = (e) => {
    const url =
      `http://localhost:9000/mechelin/comment/deletecomm` +
      `?comment_id=${e.target.getAttribute("commentId")}`;
    Axios.get(url)
      .then((response) => {
        // 재출력
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
            i={i}
            cLikeChange={onCommentLike}
            cDeleteChange={onCommentDelete}
          />
        );
      })}
    </div>
  );
};
export default Comment;
