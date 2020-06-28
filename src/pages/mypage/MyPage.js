import React from "react";
import ProfileUpload from "components/mypage/ProfileUpload";

class MyPage extends React.Component {
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
        MyPage
        <ProfileUpload />
      </div>
    );
  }
}
export default MyPage;
