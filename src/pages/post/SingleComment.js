import React, { useState, useEffect } from "react";

const nowTime = (data) => {
  let now = new Date();
  let timeDiff = now.getTime() - data.getTime();
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

const SingleComment = ({ item, i, cLikeChange, cDeleteChange }) => {
  return (
    <div>
      <tr>
        <td>
          프로필사진 자리
          <img src={item.profile_url} alt="" />
        </td>
      </tr>
      <tr>
        <td>닉네임 {item.nickname}</td>
        <td>수정시간 {item.updated_at}</td>
        {/* <td>수정시간 {nowTime(item.updated_at)}</td> */}
      </tr>
      <tr>
        <td>내용 {item.content}</td>
      </tr>
      <tr>
        <button
          type="button"
          onClick={cLikeChange}
          commentId={item.id}
          userId={item.user_id}
        >
          좋아요 {item.likes}
        </button>
        <button commentId={item.id}>수정</button>
        <button onClick={cDeleteChange} commentId={item.id}>
          삭제
        </button>
      </tr>
    </div>
  );
};

export default SingleComment;
