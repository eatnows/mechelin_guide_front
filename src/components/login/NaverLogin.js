import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Axios from "axios";

// const NaverLoginComponent = () => {
//   return (
//     <BrowserRouter>
//       <Route exact path="/" component={NaverLogin} />
//       <Route path="/navercallback" component={Success} />
//     </BrowserRouter>
//   );
// };

const client_id = "앱키";
const redirectURI = encodeURI(`http://localhost:3000/navercallback`);
const naver_id_login = new window.naver_id_login(client_id, redirectURI);

class NaverLogin extends React.Component {
  componentDidMount() {
    // const naver_id_login = new window.naver_id_login(client_id, redirectURI);
    // const state = naver_id_login.getUniqState();
    // naver_id_login.setButton("white", 2, 40);
    // naver_id_login.setDomain("http://localhost:3000");
    // naver_id_login.setState(state);
    // naver_id_login.init_naver_id_login();
    const naver_id_login = new window.naver_id_login(client_id, redirectURI);
    const state = naver_id_login.getUniqState();
    naver_id_login.setButton("white", 2, 40);
    naver_id_login.setDomain("http://localhost:3000/");
    naver_id_login.setState(state);
    naver_id_login.init_naver_id_login();
  }

  render() {
    return <div id="naver_id_login"></div>;
  }
}

// class Success extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       nickname: "",
//     };
//     window.naverSignInCallback = this.naverSignInCallback.bind(this);
//     alert(naver_id_login.getProfileData("email"));
//   }

//   naverSignInCallback() {
//     window.naverSignInCallback = this.naverSignInCallback.bind(this);
//     // 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
//     alert(naver_id_login.getProfileData("email"));
//     alert(naver_id_login.getProfileData("nickname"));
//     alert(naver_id_login.getProfileData("age"));
//   }

//   componentDidMount() {
//     window.naverSignInCallback = this.naverSignInCallback.bind(this);
//     this.setState({
//       nickname: naver_id_login.getProfileData("nickname"),
//     });
//     alert(naver_id_login.oauthParams.access_token);
//     // 네이버 사용자 프로필 조회
//     naver_id_login.get_naver_userprofile("naverSignInCallback()");
//     const url = `http://localhost:9000/mechelin/naverlogin`;
//     Axios.post(url, {
//       naver: naver_id_login.oauthParams.access_token,
//     })
//       .then((res) => {
//         console.log();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   render() {
//     return <div>환영합니다 {this.state.nickname}님</div>;
//   }
// }

export default NaverLogin;
