import React from "react";

class WishList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.getState(false);
  }
  render() {
    return <div>WishList</div>;
  }
}
export default WishList;
