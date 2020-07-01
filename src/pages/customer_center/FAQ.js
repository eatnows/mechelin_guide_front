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
            width: "10vw",
            height: "10vw",
            position: "absolute",
            left: "3%",
            top: "25%",
          }}
        >
          <SlideMenu />
        </div>
        <div
          style={{
            width: "50vw",
            height: "auto",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <FAQComponent />
        </div>
      </div>
    );
  }
}
export default FAQ;
