import React from "react";
import Axios from "axios";

class ChangePwd extends React.Component {
  state = {
    email: "",
    emailCkMsg: "",
    emailCheck: "",
    password: "",
    rePassword: "",
    possiblePwCkMsg: "",
    samePwCkMsg: "",
    pwCheck: "",
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
        // 형식이 맞으면 user table에서 user num 받아오기
        const url =
          "http: localhost:9000/mechelin/changepwd/email?email=" +
          this.state.email;
        Axios.get(url)
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
  // 비밀번호 형식 확인
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

  render() {
    return (
      <div>
        <h2>비밀번호 재설정</h2>
        <form>
          <table>
            <tbody>
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
export default ChangePwd;
