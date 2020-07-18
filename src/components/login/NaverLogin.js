import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Axios from "axios";

const NaverLoginComponent = () => {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={NaverLogin} />
        <Route path="/callback" component={Success} />
      </div>
    </BrowserRouter>
  );
};

const client_id = "앱키";
const redirectURI = encodeURI("http://localhost:3000/callback");
const naver_id_login = new window.naver_id_login(client_id, redirectURI);

class NaverLogin extends React.Component {
  componentDidMount() {
    // const naver_id_login = new window.naver_id_login(client_id, redirectURI);
    // const state = naver_id_login.getUniqState();
    // naver_id_login.setButton("white", 2, 40);
    // naver_id_login.setDomain("http://localhost:3000");
    // naver_id_login.setState(state);
    // naver_id_login.init_naver_id_login();

    var state = naver_id_login.getUniqState();
    naver_id_login.setButton("white", 2, 40);
    naver_id_login.setDomain("http://localhost:3000");
    naver_id_login.setState(state);
    naver_id_login.init_naver_id_login();
  }

  render() {
    return <div id="naver_id_login"></div>;
  }
}

class Success extends React.Component {
  state = {
    nickname: "",
  };

  constructor(props) {
    super(props);
    window.naverSignInCallback = this.naverSignInCallback;
    alert(naver_id_login.getProfileData("email"));
  }

  naverSignInCallback() {
    // 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
    alert(naver_id_login.getProfileData("email"));
    alert(naver_id_login.getProfileData("nickname"));
    alert(naver_id_login.getProfileData("age"));
  }

  componentDidMount() {
    this.setState({
      nickname: naver_id_login.getProfileData("nickname"),
    });
    // const naver_id_login = new window.naver_id_login(client_id, redirectURI);
    // alert(naver_id_login.oauthParams.access_token);
    // console.log("네이버사인인콜백");
    // console.log(naver_id_login.oauthParams.access_token);
    // console.log(naver_id_login.oauthParams.access_token);
    // naver_id_login.get_naver_userprofile("naverSignInCallback()");
    // 접근 토큰 값 출력
    alert(naver_id_login.oauthParams.access_token);
    // 네이버 사용자 프로필 조회
    naver_id_login.get_naver_userprofile(this.naverSignInCallback());
    const url = `http://localhost:9000/mechelin/naverlogin`;
    Axios.post(url, {
      naver: naver_id_login.oauthParams.access_token,
    })
      .then((res) => {
        console.log();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return <div>환영합니다 {this.state.nickname}님</div>;
  }
}

export default NaverLoginComponent;
