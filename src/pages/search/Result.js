import React from "react";

class Result extends React.Component {
  constructor({ match, props }) {
    super(props);
    this.state = {
      email: match.params.email,
    };
  }
  render() {
    return <div>Result</div>;
  }
}
export default Result;
