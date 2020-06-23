import React, { useState } from "react";
import Post from "components/review/Post";
import { Router } from "react-router-dom";

const Review = ({ match, props }) => {
  const [email, setEmail] = useState(match.params.email);
  return (
    <div>
      <h2></h2>
      <Post userPlaceId={match.params.userPlaceId} />
    </div>
  );
};

export default Review;
