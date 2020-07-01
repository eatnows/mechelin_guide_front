import React, { useEffect } from "react";
import Post from "components/review/Post";

const Review = (props) => {
  /*view 페이지의 main state 값을 false로 변경 */
  useEffect(() => {
    props.getState(false);
    console.log(`review`);
    console.log(props.userPlaceId);
  }, []);

  const timelinePageMove = (user_id) => {
    props.timelinePageMove(user_id);
  };
  return (
    <div>
      <div style={{ overflow: "auto", height: "100vh" }}>
        <Post
          userPlaceId={props.userPlaceId}
          pathFrom="review"
          history={props.history}
          timelinePageMove={timelinePageMove}
        />
      </div>
    </div>
  );
};

export default Review;
