import React from "react";
import FAQComponent from "components/customer_center/FAQ";
import SlideMenu from "components/customer_center/SlideMenu";

class FAQ extends React.Component {
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
            width: "400px",
            height: "600px",
            position: "absolute",
            marginTop: "200px",
            marginLeft: "50px",
          }}
        >
          <SlideMenu />
        </div>
        <div
          style={{
            width: "800px",
            height: "500px",
            position: "absolute",
            marginTop: "200px",
            marginLeft: "500px",
          }}
        >
          <FAQComponent />
        </div>
      </div>
    );
  }
}
export default FAQ;
