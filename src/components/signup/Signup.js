import React, { Component } from "react";
import Axios from "axios";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailCk: "",
      nickname: "",
      password: "",
      rePassword: "",
      possiblePwCk: "",
      samePwCk: "",
      pwCheck: "",
    };
  }

  //회원 가입 시 정보 테이블에 저장
  onSendUserInform = (e) => {
    console.log("insert userInform");
    const url = "http://localhost:9000/mechelin/join.do";
    Axios.post(url, {
      email: e.email,
      nickname: e.nickname,
      password: e.password,
    })
      .then((res) => {
        this.showMain();
      })
      .catch((err) => {
        console.log("insert userInfom error:" + err);
      });
  };

  //값이 바뀌면 state 값을 변경
  handleInform = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //이메일 형식 확인
  checkEmail = (e) => {
    //이메일 유효성검사(영문,숫자,-_. 혼합 ID @ domain 주소)
    const chkEmail = function (str) {
      var standard = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      return standard.test(str) ? true : false;
    };
    if (this.state.email !== "") {
      if (chkEmail(this.state.email) !== true) {
        this.setState({
          emailCk: "이메일 형식이 유효하지 않습니다.",
        });
      } else {
        this.setState({
          emailCk: "",
        });
      }
    } else {
      this.setState({
        emailCk: "",
      });
    }

    //   const inputEmail = {
    //     email: this.state.email
    //   }
    //   const emailInfo = {
    //     method: "POST",
    //     body: JSON.stringify(inputEmail),
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   };
    //    if (chkEmail(this.state.email) === false) {
    //     alert("이메일 형식이 유효하지 않습니다.");
    //     this.setState({
    //       email: ""
    //     });
    //   } else {
    //     fetch("http://localhost:9000/mechelin/email", emailInfo)
    //       .then(res => res.json())
    //       .then(json => {
    //         if (json === true) {
    //           alert("사용가능한 이메일입니다");
    //           this.setState({
    //             emailCheck: this.state.email
    //           });
    //         } else {
    //           alert("사용중인 이메일입니다");
    //         }
    //       });
    //   }
    // };
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
          possiblePwCk:
            "영문, 숫자, 특수문자를 혼합하여 8~20자 이내로 입력해주십시오.",
        });
      } else {
        this.setState({
          possiblePwCk: "",
        });
      }
    } else {
      this.setState({
        possiblePwCk: "",
      });
    }

    //비밀번호, 비밀번호 재입력 값 비교
    if (this.state.rePassword !== "") {
      if (this.state.password === this.state.rePassword) {
        this.setState({
          samePwCk: "",
          pwCheck: this.state.rePassword,
        });
      } else {
        this.setState({
          samePwCk: "비밀번호가 일치하지 않습니다.",
        });
      }
    } else {
      this.setState({
        samePwCk: "",
      });
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
                  <span style={{ color: "red", fontSize: "15px" }}>
                    {this.state.emailCk}
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
                  <span style={{ color: "red", fontSize: "15px" }}>
                    {this.state.possiblePwCk}
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
                  <span style={{ color: "red", fontSize: "15px" }}>
                    {this.state.samePwCk}
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
