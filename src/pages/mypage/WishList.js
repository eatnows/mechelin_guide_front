import React from "react";
import WishlistComponent from "components/wishlist/Wishlist";
import WishListMap from "components/map/WishListMap";

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
        <div
          style={{
            position: "absolute",
            marginTop: "300px",
            marginLeft: "100px",
          }}
        >
          <WishlistComponent />
        </div>
        <div
          style={{
            border: "1px solid black",
            width: "800px",
            height: "650px",
            position: "absolute",
            marginTop: "150px",
            marginLeft: "600px",
          }}
        >
          <WishListMap />
        </div>
      </div>
    );
  }
}
export default WishList;
