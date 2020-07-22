import React, { useState, useEffect } from "react";
import Axios from "util/axios";

const client_id = "앱키";
const redirectURI = encodeURI(`http://localhost:3000/navercallback`);

class NaverCallback extends React.Component {
  state = {
    nickname: "",
    // inner_profileParams: [age, birthday, email, enc_id, gender, id, nickname, profile_image, name],
  };

  constructor(props) {
    super(props);
    window.naverSignInCallback = this.naverSignInCallback.bind(this);
  }
  componentDidMount() {
    const naver_id_login = new window.naver_id_login(client_id, redirectURI);
    console.log(naver_id_login.oauthParams.access_token);
    naver_id_login.get_naver_userprofile("naverSignInCallback();");
  }

  naverSignInCallback() {
    const naver_id_login = new window.naver_id_login(client_id, redirectURI);
    const url = `/naverlogin`;
    Axios.post(url, {
      token: naver_id_login.oauthParams.access_token,
    })
      .then((res) => {
        console.log(res);
        sessionStorage.setItem("userId", res.data);
        sessionStorage.setItem("loginPlatform", "naver");
        sessionStorage.setItem(
          "token",
          naver_id_login.oauthParams.access_token
        );
        this.props.history.push(`/mechelin/${res.data}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return <div></div>;
  }
}

export default NaverCallback;
