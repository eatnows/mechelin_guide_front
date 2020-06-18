import React from "react";

class Review extends React.Component {
  constructor({ match, props }) {
    super(props);
    this.state = {
      email: match.params.email,
    };
  }
  componentWillMount() {}
  render() {
    return <div>Review</div>;
  }
}
export default Review;
