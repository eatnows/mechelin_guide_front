import React from "react";

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

  return (
    <div>
      <tr>
        <td>
          (프로필사진 자리)
          <img src={item.profile_url} alt="" />
        </td>
      </tr>
      <tr>
        <td>닉네임 {item.nickname}</td>
        <td>수정시간 {nowTime(item.updated_at)}</td>
      </tr>
      <tr>
        <td>내용 {item.content}</td>
      </tr>
      <tr>
        {/* 좋아요 버튼 */}
        <button
          type="button"
          onClick={cLikeChange}
          commentId={item.id}
          userId={sessionStorage.getItem("userId")}
        >
          좋아요 {item.likes}
        </button>

        {/* 로그인 유저가 댓글의 유저면 수정/삭제 표시 */}
        {sessionStorage.getItem("userId") === item.user_id ? (
          <span>
            <button
              onClick={cUpdateClick}
              commentId={item.id}
              content={item.content}
            >
              수정
            </button>
            <button onClick={cDeleteChange} commentId={item.id}>
              삭제
            </button>
          </span>
        ) : (
          ""
        )}
      </tr>
    </div>
  );
};

export default SingleComment;
