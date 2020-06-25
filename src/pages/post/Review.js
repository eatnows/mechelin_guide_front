import React, { useState } from "react";
import Post from "components/review/Post";
import { Router } from "react-router-dom";

const Review = ({ match, props }) => {
  return (
    <div>
      <h2></h2>
      <Post userPlaceId={match.params.userPlaceId} />
    </div>
  );
};

export default Review;
