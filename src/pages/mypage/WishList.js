import React from "react";

class WishList extends React.Component {
  constructor({ match, props }) {
    super(props);
    this.state = {
      email: match.params.email,
    };
  }
  render() {
    return <div>WishList</div>;
  }
}
export default WishList;
