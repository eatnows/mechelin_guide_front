import React, { useState, useEffect } from "react";
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
      <h2></h2>
      <Post userPlaceId={props.userPlaceId} />
    </div>
  );
};

export default Review;
