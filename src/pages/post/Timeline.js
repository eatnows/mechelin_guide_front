import React from "react";

class Timeline extends React.Component {
  constructor({ match, props }) {
    super(props);
    this.state = {
      email: match.params.email,
    };
  }
  componentWillMount() {}
  render() {
    return <div>Timeline</div>;
  }
}
export default Timeline;
