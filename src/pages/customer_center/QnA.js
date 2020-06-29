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
            overflow: "auto",
            width: "100%",
            height: "800px",
            position: "absolute",
            marginTop: "200px",
            marginLeft: "400px",
          }}
        >
          <QnAComponent />
        </div>
      </div>
    );
  }
}
export default QnA;
