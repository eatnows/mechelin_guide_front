import React, { Component } from "react";
import Axios from "axios";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailCkMsg: "",
      emailCheck: "",
      nickname: "",
      nicknameCkMsg: "",
      nicknameCheck: "",
      password: "",
      rePassword: "",
      possiblePwCkMsg: "",
      samePwCkMsg: "",
      pwCheck: "",
    };
  }

  //값이 바뀌면 state 값을 변경
  handleInform = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //이메일 형식 확인
  checkEmail = (e) => {
    //이메일 유효성검사(영문,숫자,-_. 혼합 ID @ domain 주소)
    const chkEmail = (str) => {
      var standard = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      return standard.test(str) ? true : false;
    };
    if (this.state.email !== "") {
      if (chkEmail(this.state.email) !== true) {
        this.setState({
          emailCkMsg: "이메일 형식이 유효하지 않습니다.",
        });
      } else {
        //형식이 맞으면 중복 체크
        const url = "http://localhost:9000/mechelin/signupcheck/email";
        Axios.post(url, { email: e.email })
          .then((res) => {
            if (res.data === "usenot") {
              this.setState({
                emailCkMsg: "",
                emailCheck: this.state.email,
              });
            } else {
              this.setState({
                emailCkMsg: "이미 등록된 이메일입니다.",
              });
            }
          })
          .catch((err) => {
            console.log("이메일 중복 체크 에러:" + err);
          });
      }
    } else {
      this.setState({
        emailCkMsg: "",
      });
    }
  };

  //닉네임 중복 체크
  checkNickname = (e) => {
    if (this.state.nickname !== "") {
      const url = "http://localhost:9000/mechelin/signupcheck/nick";
      Axios.post(url, { nickname: e.nickname })
        .then((res) => {
          if (res.data === "usenot") {
            this.setState({
              nicknameCkMsg: "",
              nicknameCheck: this.state.nickname,
            });
          } else {
            this.setState({
              nicknameCkMsg: "이미 등록된 닉네임입니다.",
            });
          }
        })
        .catch((err) => {
          console.log("닉네임 중복 체크 에러:" + err);
        });
    } else {
      this.setState({
        nicknameCkMsg: "",
      });
    }
  };

  //비밀번호 형식 확인
  checkPW = (e) => {
    //비밀번호 유효성검사(영문,숫자 혼합 6~20)
    const chkPw = (str) => {
      const standard = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[`~!@@#$%^&*|₩₩₩'₩";:₩/?]).*$/;
      return !standard.test(str) ? false : true;
    };

    if (this.state.password !== "") {
      if (chkPw(this.state.password) === false) {
        this.setState({
          possiblePwCkMsg:
            "영문, 숫자, 특수문자를 혼합하여 8~20자 이내로 입력해주십시오.",
        });
      } else {
        this.setState({
          possiblePwCkMsg: "",
        });
      }
    } else {
      this.setState({
        possiblePwCkMsg: "",
      });
    }

    //비밀번호, 비밀번호 재입력 값 비교
    if (this.state.rePassword !== "") {
      if (this.state.password === this.state.rePassword) {
        this.setState({
          samePwCkMsg: "",
          pwCheck: this.state.rePassword,
        });
      } else {
        this.setState({
          samePwCkMsg: "비밀번호가 일치하지 않습니다.",
        });
      }
    } else {
      this.setState({
        samePwCkMsg: "",
      });
    }
  };

  //회원 가입 시 정보 테이블에 저장
  onSendUserInform = () => {
    if (
      this.state.emailCheck === this.state.email &&
      this.state.nicknameCheck === this.state.nickname &&
      this.state.pwCheck === this.state.password
    ) {
      const url = "http://localhost:9000/mechelin/signup";
      Axios.post(url, {
        email: this.state.email,
        nickname: this.state.nickname,
        password: this.state.password,
      })
        .then((res) => {
          this.props.history.push("/welcome");
        })
        .catch((err) => {
          console.log("insert userInfom error:" + err);
        });
    } else {
      alert("가입할 수 없습니다. 기입된 정보를 다시 확인해주세요.");
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSendUserInform.bind(this)}>
          <table align="center" style={{ width: "200px", marginTop: "100px" }}>
            <tbody>
              <tr>
                <td>
                  <div
                    style={{
                      border: "1px solid lightgray",
                      width: "100px",
                      height: "100px",
                      margin: "0 auto",
                    }}
                  >
                    로고
                  </div>
                  <br />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.handleInform.bind(this)}
                    onKeyUp={this.checkEmail.bind(this)}
                    name="email"
                    placeholder="EMAIL"
                    style={{
                      width: "250px",
                      outline: "none",
                      height: "50px",
                      fontWeight: "normal",
                      fontSize: "13px",
                    }}
                  />
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
                  <button
                    type="button"
                    className="btn"
                    style={{
                      border: "1px solid rgba(245,145,45)",
                      backgroundColor: "white",
                      color: "rgba(245,145,45)",
                      verticalAlign: "center",
                      width: "250px",
                      height: "30px",
                    }}
                  >
                    인증하기
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.handleInform.bind(this)}
                    onKeyUp={this.checkNickname.bind(this)}
                    name="nickname"
                    placeholder="NICKNAME"
                    style={{
                      width: "250px",
                      outline: "none",
                      height: "50px",
                      fontWeight: "normal",
                      fontSize: "13px",
                    }}
                  />
                  <span
                    style={{
                      color: "red",
                      fontSize: "10px",
                      fontWeight: "normal",
                      textAlign: "center",
                      margin: "10px auto",
                    }}
                  >
                    {this.state.nicknameCkMsg}
                  </span>
                  <br />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="password"
                    className="form-control"
                    onChange={this.handleInform.bind(this)}
                    onKeyUp={this.checkPW.bind(this)}
                    name="password"
                    placeholder="PASSWORD"
                    style={{
                      width: "250px",
                      outline: "none",
                      height: "50px",
                      fontWeight: "normal",
                      fontSize: "13px",
                    }}
                  />
                  <span
                    style={{
                      color: "red",
                      fontSize: "10px",
                      fontWeight: "normal",
                      textAlign: "center",
                      margin: "10px auto",
                    }}
                  >
                    {this.state.possiblePwCkMsg}
                  </span>
                  <br />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="password"
                    className="form-control"
                    onChange={this.handleInform.bind(this)}
                    onKeyUp={this.checkPW.bind(this)}
                    name="rePassword"
                    placeholder="PASSWORD"
                    style={{
                      width: "250px",
                      outline: "none",
                      height: "50px",
                      fontWeight: "normal",
                      fontSize: "13px",
                    }}
                  />
                  <span
                    style={{
                      color: "red",
                      fontSize: "10px",
                      fontWeight: "normal",
                      textAlign: "center",
                      margin: "10px auto",
                    }}
                  >
                    {this.state.samePwCkMsg}
                  </span>
                  <br />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      backgroundColor: "rgba(245,145,45)",
                      color: "white",
                      width: "250px",
                      height: "30px",
                    }}
                  >
                    회원가입
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}
