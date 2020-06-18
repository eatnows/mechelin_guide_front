import React from "react";

class MyPage extends React.Component {
  constructor({ match, props }) {
    super(props);
    this.state = {
      email: match.params.email,
    };
  }
  render() {
    return <div>MyPage</div>;
  }
}
export default MyPage;
