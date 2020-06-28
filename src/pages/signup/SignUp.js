import React, { Component } from "react";
import Axios from "util/axios";
import logo from "images/logo2.png";
import { Input } from "antd";
import { NavLink } from "react-router-dom";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailCkMsg: "",
      nickname: "",
      nicknameCkMsg: "",
      password: "",
      rePassword: "",
      possiblePwCkMsg: "",
      samePwCkMsg: "",
      clickAuthBtn: "",
      finishSending: false,
      emailSuccess: false,
      nicknameSuccess: false,
      pwSuccess: false,
      samePwSuccess: false,
    };
  }

  //값이 바뀌면 state 값을 변경
  handleInform = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //이메일 형식 확인
  checkEmail = () => {
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
        const url = "/signupcheck/email?email=" + this.state.email;
        Axios.get(url)
          .then((res) => {
            if (res.data.check_item === "usethis") {
              this.setState({
                emailCkMsg: "사용 가능한 이메일입니다.",
                emailSuccess: true,
              });
            } else if (res.data.check_item === "kakaouser") {
              this.setState({
                emailCkMsg: "카카오로 가입된 이메일입니다.",
                emailSuccess: false,
              });
            } else {
              this.setState({
                emailCkMsg: "이미 등록된 이메일입니다.",
                emailSuccess: false,
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
  //이메일 인증 버튼 클릭시 실행되는 메소드
  sendMail = () => {
    this.setState({
      clickAuthBtn: true,
    });
    if (this.state.email !== "" && this.state.emailSuccess) {
      const url = "/validsend?email=" + this.state.email;
      console.log("hi" + this.state.email);
      Axios.get(url)
        .then((res) => {
          this.setState({
            finishSending: true,
            clickAuthBtn: false,
          });
        })
        .catch((err) => {
          console.log("유저 메일 주소 전달 오류:" + err);
        });
    } else if (this.state.email === "") {
      this.setState({
        emailCkMsg: "이메일을 입력해주세요.",
      });
    }
  };
  //이메일 입력창 변경시 버튼 활성화
  changeBtn = () => {
    this.setState({
      finishSending: false,
    });
  };
  //닉네임 중복 체크
  checkNickname = (e) => {
    if (this.state.nickname !== "") {
      const url = "/signupcheck/nick?nickname=" + this.state.nickname;
      Axios.get(url)
        .then((res) => {
          if (res.data === "usethis") {
            this.setState({
              nicknameCkMsg: "사용 가능한 닉네임입니다.",
              nicknameSuccess: true,
            });
          } else {
            this.setState({
              nicknameCkMsg: "이미 등록된 닉네임입니다.",
              nicknameSuccess: false,
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
          pwSuccess: false,
        });
      } else {
        this.setState({
          possiblePwCkMsg: "사용 가능한 비밀번호입니다.",
          pwSuccess: true,
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
          samePwCkMsg: "비밀번호가 일치합니다.",
          samePwSuccess: true,
        });
      } else {
        this.setState({
          samePwCkMsg: "비밀번호가 일치하지 않습니다.",
          samePwSuccess: false,
        });
      }
    } else {
      this.setState({
        samePwCkMsg: "",
      });
    }
  };

  //회원 가입 시 정보 테이블에 저장
  sendUserInform = (e) => {
    e.preventDefault();

    const url = "/signup";
    Axios.post(url, {
      email: this.state.email,
      nickname: this.state.nickname,
      password: this.state.password,
    })
      .then((res) => {
        if (res.data === "success") {
          if (
            this.state.emailSuccess &&
            this.state.nicknameSuccess &&
            this.state.pwSuccess
          ) {
            this.props.history.push("/welcome");
          } else {
            alert("가입할 수 없습니다. 기입하신 정보를 다시 확인해주세요.");
          }
        } else {
          alert("이메일 인증이 완료되지 않았습니다.");
        }
      })
      .catch((err) => {
        console.log("insert userInfom error:" + err);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.sendUserInform.bind(this)}>
          <table
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              width: "200px",
            }}
          >
            <tbody>
              <tr>
                <td>
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      margin: "0 auto",
                    }}
                  >
                    <img
                      src={logo}
                      alt=""
                      style={{
                        width: "auto",
                        height: "100px",
                      }}
                    />
                  </div>
                  <br />
                </td>
              </tr>
              <tr>
                <td>
                  <Input
                    type="text"
                    className="form-control"
                    onChange={this.handleInform.bind(this)}
                    onKeyUp={this.checkEmail.bind(this)}
                    onKeyDown={this.changeBtn.bind(this)}
                    name="email"
                    ref="email"
                    placeholder="이메일"
                    style={{
                      width: "250px",
                      outline: "none",
                      height: "50px",
                      fontWeight: "normal",
                      fontSize: "13px",
                    }}
                  />
                  <br />
                  <span
                    style={{
                      color: this.state.emailSuccess ? "green" : "red",
                      fontSize: "10px",
                      fontWeight: "normal",
                      textAlign: "center",
                      margin: "0 auto 10px",
                    }}
                  >
                    {this.state.emailCkMsg}
                  </span>
                  <br />
                  <button
                    type="button"
                    className="btn"
                    onClick={this.sendMail.bind(this)}
                    disabled={
                      this.state.clickAuthBtn || this.state.finishSending
                    }
                    style={{
                      border: this.state.finishSending
                        ? "1px solid #ccc"
                        : this.state.clickAuthBtn && !this.state.emailSuccess
                        ? "1px solid red"
                        : "1px solid rgba(245,145,45)",
                      backgroundColor: this.state.finishSending
                        ? "#999"
                        : "white",
                      color: this.state.finishSending
                        ? "white"
                        : this.state.clickAuthBtn && !this.state.emailSuccess
                        ? "red"
                        : "rgba(245,145,45)",
                      verticalAlign: "center",
                      width: "250px",
                      height: "30px",
                    }}
                  >
                    {this.state.clickAuthBtn && this.state.emailSuccess
                      ? "이메일 발송 중"
                      : this.state.clickAuthBtn && !this.state.emailSuccess
                      ? "이메일 발송 불가"
                      : this.state.finishSending
                      ? "이메일 발송 완료"
                      : "인증하기"}
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <br />
                  <Input
                    type="text"
                    className="form-control"
                    onChange={this.handleInform.bind(this)}
                    onKeyUp={this.checkNickname.bind(this)}
                    name="nickname"
                    placeholder="닉네임"
                    style={{
                      width: "250px",
                      outline: "none",
                      height: "50px",
                      fontWeight: "normal",
                      fontSize: "13px",
                    }}
                  />{" "}
                  <br />
                  <span
                    style={{
                      color: this.state.nicknameSuccess ? "green" : "red",
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
                  <Input
                    type="password"
                    className="form-control"
                    onChange={this.handleInform.bind(this)}
                    onKeyUp={this.checkPW.bind(this)}
                    name="password"
                    placeholder="비밀번호"
                    style={{
                      width: "250px",
                      outline: "none",
                      height: "50px",
                      fontWeight: "normal",
                      fontSize: "13px",
                      fontFamily: "none",
                    }}
                  />{" "}
                  <br />
                  <span
                    style={{
                      color: this.state.pwSuccess ? "green" : "red",
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
                  <Input
                    type="password"
                    className="form-control"
                    onChange={this.handleInform.bind(this)}
                    onKeyUp={this.checkPW.bind(this)}
                    name="rePassword"
                    placeholder="비밀번호 재입력"
                    style={{
                      width: "250px",
                      outline: "none",
                      height: "50px",
                      fontWeight: "normal",
                      fontSize: "13px",
                      fontFamily: "none",
                    }}
                  />
                  <br />
                  <span
                    style={{
                      color: this.state.samePwSuccess ? "green" : "red",
                      fontSize: "10px",
                      fontWeight: "normal",
                      textAlign: "center",
                      margin: "10px auto",
                    }}
                  >
                    {this.state.samePwCkMsg}
                  </span>{" "}
                  <br />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>
                  {" "}
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
              <tr>
                <td>
                  <br />
                  <NavLink to="/">
                    <button
                      type="button"
                      className="btn"
                      style={{
                        backgroundColor: "white",
                        color: "#9CC557 ",
                        width: "250px",
                        height: "30px",
                        border: "1px solid #9CC557 ",
                      }}
                    >
                      돌아가기
                    </button>
                  </NavLink>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}
