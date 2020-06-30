import React from "react";
import QnAComponent from "components/customer_center/QnA";
import SlideMenu from "components/customer_center/SlideMenu";

class QnA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.getState(false);
  }
  render() {
    return (
      <div style={{ overflow: "auto", height: "100vh", width: "100vw" }}>
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
            margin: "3vw auto",
            height: "90vh",
          }}
        >
          <QnAComponent />
        </div>
      </div>
    );
  }
}
export default QnA;
