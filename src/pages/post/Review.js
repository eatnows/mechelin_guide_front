import React from "react";
import Post from "components/review/Post";

const Review = ({ match }) => {
  return (
    <div>
      <h2></h2>
      <Post id={match.params.id} userPlaceId={match.params.userPlaceId} />
    </div>
  );
};

export default Review;
