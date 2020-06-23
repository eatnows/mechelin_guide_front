import React from "react";
import Axios from "util/axios";

class ChangePwd extends React.Component {
  state = {
    email: "",
    emailCkMsg: "",
    password: "",
    rePassword: "",
    possiblePwCkMsg: "",
    samePwCkMsg: "",
    emailSuccess: false,
    pwSuccess: false,
    samePwSuccess: false,
    clickAuthBtn: "",
    finishSending: false,
    pwCode: "",
    userCode: "",
    timer: "",
  };
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
            if (res.data === "usethis") {
              this.setState({
                emailCkMsg: "존재하지 않는 이메일입니다.",
              });
            } else {
              this.setState({
                emailSuccess: true,
                emailCkMsg: "",
              });
            }
          })
          .catch((err) => {
            console.log("이메일 존재 여부 확인 에러:" + err);
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
      const url = "/login/changepwd?email=" + this.state.email;
      Axios.get(url)
        .then((res) => {
          this.setState({
            pwCode: res.data,
            finishSending: true,
            clickAuthBtn: false,
          });
          this.setTimer();
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

  //인증코드 타이머
  setTimer = () => {
    let mi = 5;
    let s1 = 6;
    let s2 = 10;

    const runTime = () => {
      this.setState({
        timer: mi + ":" + (s1 === 6 ? 0 : s1) + (s2 === 10 ? 0 : s2),
      });
      if (mi === 5 && s1 === 6 && s2 === 10) {
        mi--;
        s1--;
        s2--;
      } else {
        s2--;
        if (mi === 0 && s1 === 0 && s2 === 0) {
          clearInterval(go);
          this.setState({
            timer: "인증시간이 초과되었습니다.",
            pwCode: "",
            finishSending: false,
          });
        } else if (s1 === 0 && s2 === 0) {
          s1 = 6;
          s2 = 10;
        } else if (s2 === 0) {
          s2 = 10;
        } else if (s2 === 9) {
          s1--;
        }
        if (s1 === 5 && s2 === 9) {
          mi--;
        }
      }
    };
    let go = setInterval(runTime, 1000);
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
        });
      }
    } else {
      this.setState({
        samePwCkMsg: "",
      });
    }
  };
  //변경된 비밀번호로 업데이트
  ChangePwd = (e) => {
    e.preventDefault();
    if (
      this.state.pwCode === this.state.userCode &&
      this.state.emailSuccess &&
      this.state.pwSuccess
    ) {
      const url = "/changepwd/reset";
      Axios.post(url, {
        email: this.state.email,
        password: this.state.password,
      })
        .then((res) => {
          this.props.history.push("/");
        })
        .catch((err) => {
          console.log("update userInfom error:" + err);
        });
    } else {
      alert("변경할 수 없습니다. 기입하신 정보를 다시 확인해주세요.");
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.ChangePwd.bind(this)}>
          <table
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              width: "200px",
            }}
          >
            <caption style={{ textAlign: "center", fontSize: "20px" }}>
              비밀번호 재설정
            </caption>

            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.handleInform.bind(this)}
                    onKeyUp={this.checkEmail.bind(this)}
                    onKeyDown={this.changeBtn.bind(this)}
                    name="email"
                    placeholder="이메일"
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
                      margin: "10px auto",
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
                        : "1px solid rgba(245,145,45)",
                      backgroundColor: this.state.finishSending
                        ? "#999"
                        : "white",
                      color: this.state.finishSending
                        ? "white"
                        : "rgba(245,145,45)",
                      verticalAlign: "center",
                      width: "250px",
                      height: "30px",
                    }}
                  >
                    {this.state.clickAuthBtn
                      ? "이메일 발송 중"
                      : this.state.finishSending
                      ? "이메일 발송 완료"
                      : "인증하기"}
                  </button>
                </td>
              </tr>
              <tr
                style={{ display: this.state.finishSending ? "block" : "none" }}
              >
                <td>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="인증코드"
                    name="userCode"
                    style={{
                      width: "250px",
                      outline: "none",
                      height: "50px",
                      fontWeight: "normal",
                      fontSize: "13px",
                    }}
                    onChange={this.handleInform.bind(this)}
                  />
                  <span
                    style={{
                      float:
                        this.state.timer === "인증시간이 초과되었습니다."
                          ? "none"
                          : "right",
                      fontWeight: "normal",
                      color:
                        this.state.timer === "인증시간이 초과되었습니다."
                          ? "red"
                          : "#999",
                      margin:
                        this.state.timer === "인증시간이 초과되었습니다."
                          ? "5px 0 0"
                          : "-33px 15px",
                      fontSize:
                        this.state.timer === "인증시간이 초과되었습니다."
                          ? "11px"
                          : "13px",
                    }}
                  >
                    {this.state.timer}
                  </span>
                </td>
              </tr>
              <tr
                style={{
                  clear: "both",
                }}
              >
                <td>
                  {" "}
                  {this.state.timer === "인증시간이 초과되었습니다." ? (
                    ""
                  ) : (
                    <br />
                  )}
                  <input
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
                    }}
                  />
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
                    <br />
                  </span>
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
                    placeholder="비밀번호 재입력"
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
                      color: this.state.samePwSuccess ? "green" : "red",
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
                    수정하기
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
