import React, { useEffect } from "react";
import Post from "components/review/Post";

const Review = (props) => {
  /*view 페이지의 main state 값을 false로 변경 */
  useEffect(() => {
    props.getState(false);
    console.log(`review`);
    console.log(props.userPlaceId);
  }, []);

  return (
    <div>
      <Post userPlaceId={props.userPlaceId} pathFrom="review" />
    </div>
  );
};

export default Review;
