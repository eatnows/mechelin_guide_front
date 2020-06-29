import React from "react";
import WishlistComponent from "components/wishlist/Wishlist";

class WishList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.getState(false);
  }
  render() {
    return (
      <div>
        <WishlistComponent />
      </div>
    );
  }
}
export default WishList;
