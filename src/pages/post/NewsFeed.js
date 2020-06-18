import React from "react";

class NewsFeed extends React.Component {
  constructor({ match, props }) {
    super(props);
    this.state = {
      email: match.params.email,
    };
  }
  componentWillMount() {}
  render() {
    return <div>{this.state.email}</div>;
  }
}
export default NewsFeed;
