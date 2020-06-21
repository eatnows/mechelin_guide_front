import React from "react";

class MyList extends React.Component {
  constructor({ match }, props) {
    super(props);
    this.state = {
      email: match.params.email,
    };
  }
  render() {
    return <div>MyList</div>;
  }
}
export default MyList;
