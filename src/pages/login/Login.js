import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import kakaotalk from "images/kakaotalk.png";
import KakaoLogin from "react-kakao-login";
import Axios from "util/axios";
import { Input, Checkbox } from "antd";
import styled from "styled-components";
import logo from "images/logo2.png";
import icon from "images/icon.PNG";
import { parse } from "@babel/core";
import NaverLoginComponent from "components/login/NaverLogin";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      email: "",
      emailCkMsg: "",
      password: "",
      kUser: false,
      kUserEmail: "",
      userId: "",
      accessToken: "",
    };
  }
  componentDidMount() {
    if (localStorage.getItem("userId") !== null) {
      sessionStorage.setItem("userId", localStorage.getItem("userId"));
    }
    if (sessionStorage.getItem("userId") !== null) {
      this.props.history.push("/mechelin/" + this.state.userId);
    }
  }
  //값이 바뀌면 state 값을 변경
  handleInform = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  /*체크 상태 변경 */
  ChangeCheck = () => {
    if (this.state.checked === false) {
      this.setState({
        checked: true,
      });
    } else {
      this.setState({
        checked: false,
      });
    }
  };

  //이메일, 비밀번호 체크 후 로그인
  userLogin = (e) => {
    e.preventDefault();

    const url = "/login";
    Axios.post(url, {
      email: this.state.email,
      password: this.state.password,
    })
      .then((res) => {
        console.log(res.data);
        if (
          res.data.check_item === "pwfalse" ||
          res.data.check_item === "mailfalse"
        ) {
          this.setState({
            emailCkMsg:
              "가입하지 않은 이메일 주소이거나, 틀린 비밀번호를 입력하였습니다.",
          });
        } else {
          this.getUserId();
        }
      })
      .catch((err) => {
        console.log("로그인 에러:" + err);
      });
  };
  //카카오 로그인 메소드
  resKakao = (kakao) => {
    const url = `/kakaologin`;
    Axios.post(url, kakao)
      .then((res) => {
        sessionStorage.setItem("kLogin", true);
        sessionStorage.setItem("userId", res.data.id);
        this.setState({
          userId: res.data.id,
          email: res.data.email,
          kUser: true,
        });
      })
      .catch((error) => {
        console.log("카카오 로그인 에러" + error);
      });
  };

  //email 값 보내고 user id 가져오는 메소드
  getUserId = () => {
    const email =
      this.state.kUser === true ? this.state.kUserEmail : this.state.email;
    const url = "/select/id?email=" + email;
    Axios.get(url)
      .then((res) => {
        this.setState({
          userId: res.data,
        });
        sessionStorage.setItem("userId", this.state.userId);
        if (this.state.checked) {
          localStorage.setItem("userId", this.state.userId);
        }
        this.props.history.push("/mechelin/" + this.state.userId);
      })
      .catch((err) => {
        console.log(`get user id error:${err}`);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.userLogin.bind(this)}>
          <table
            className="loginTable"
            align="center"
            style={{ width: "200px", marginTop: "30px" }}
          >
            <tbody>
              <tr>
                <td>
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      margin: "13vh auto 4vh",
                    }}
                  >
                    <img
                      src={logo}
                      alt=""
                      style={{
                        width: "auto",
                        height: "7vw",
                        marginLeft: "-2vw",
                      }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <span style={{ float: "right", marginTop: "8px" }}>
                    <Checkbox
                      className="loginck"
                      type="checkbox"
                      onChange={this.ChangeCheck.bind(this)}
                      checked={this.state.checked}
                    >
                      {" "}
                      로그인 상태 유지
                    </Checkbox>
                  </span>
                  <br />
                  <br />
                  <Input
                    type="text"
                    placeholder="이메일"
                    ref="email"
                    name="email"
                    onChange={this.handleInform.bind(this)}
                    style={{
                      width: "250px",
                      height: "50px",
                      fontWeight: "normal",
                      outline: "none",
                      fontSize: "13px",
                    }}
                  />{" "}
                  <br />
                  <span
                    style={{
                      color: "red",
                      fontSize: "10px",
                      fontWeight: "normal",
                      textAlign: "center",
                      margin: "10px auto",
                    }}
                  >
                    {this.state.emailCkMsg}
                  </span>
                  <br />
                </td>
              </tr>
              <tr>
                <td>
                  <Input.Password
                    placeholder="비밀번호"
                    name="password"
                    onChange={this.handleInform.bind(this)}
                    style={{
                      width: "250px",
                      outline: "none",
                      height: "50px",
                      fontWeight: "normal",
                      fontSize: "13px",
                      fontFamily: "none",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ paddingTop: "10px" }}>
                  <div
                    style={{
                      marginLeft: "5px",
                      fontWeight: "normal",
                      fontSize: "12px",
                      marginTop: "1.4vh",
                      float: "left",
                    }}
                  >
                    비밀번호를 잊으셨나요?
                  </div>
                  <NavLink to="/changepwd">
                    <button
                      type="button"
                      className="btn btn-md"
                      style={{
                        width: "80px",
                        height: "30px",
                        fontSize: "10px",
                        padding: "0",
                        marginTop: "0.5vh",
                        float: "right",
                        border: "1px solid rgba(245,145,45)",
                        backgroundColor: "white",
                        color: "rgba(245,145,45)",
                      }}
                    >
                      비밀번호 찾기
                    </button>
                  </NavLink>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      margin: "5vh 0",
                      backgroundColor: "rgba(245,145,45)",
                      color: "white",
                      height: "40px",
                      width: "100px",
                    }}
                  >
                    로그인
                  </button>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>
                  <KakaoLogin
                    jsKey="fd5a9908b3ef1290f9c3d52aadfd29f1"
                    onSuccess={(result) => {
                      this.resKakao(result);
                    }}
                    onFailure={(result) => console.log(result)}
                    getProfile={true}
                  />
                  &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                  <NavLink to="/signup">
                    <button
                      type="button"
                      className="btn"
                      style={{
                        borderRadius: "100%",
                        border: "1px solid lightgray",
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#9CC557 ",
                      }}
                    >
                      <img
                        src={icon}
                        style={{
                          textAlign: "center",
                          width: "40px",
                          height: "30px",
                          marginLeft: "-8px",
                        }}
                        alt=""
                      />
                    </button>
                  </NavLink>
                  <NaverLoginComponent />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

const KakaoBtn = () => {
  const style = {
    borderRadius: "100%",
    border: "1px solid lightgray",
    width: "50px",
    height: "50px",
    backgroundColor: "#fee500",
  };
  return (
    <div style={style}>
      <img
        src={kakaotalk}
        style={{
          textAlign: "center",
          width: "28px",
          height: "28px",
          margin: "5px 0 0 -1px",
        }}
        alt=""
      />
    </div>
  );
};
export default Login;
