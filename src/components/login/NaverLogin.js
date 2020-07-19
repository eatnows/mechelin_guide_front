import React from "react";

const client_id = "앱키";
const redirectURI = encodeURI(`http://localhost:3000/navercallback`);
const naver_id_login = new window.naver_id_login(client_id, redirectURI);

class NaverLogin extends React.Component {
  componentDidMount() {
    const naver_id_login = new window.naver_id_login(client_id, redirectURI);
    const state = naver_id_login.getUniqState();
    naver_id_login.setButton("white", 2, 40);
    naver_id_login.setDomain("http://localhost:3000/");
    naver_id_login.setState(state);
    naver_id_login.setPopup();
    naver_id_login.init_naver_id_login();
  }

  render() {
    return <div id="naver_id_login"></div>;
  }
}

export default NaverLogin;
