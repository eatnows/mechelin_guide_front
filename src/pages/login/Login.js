import React, { Component } from "react";
import "components/css/loginStyle.css";
import { NavLink } from "react-router-dom";
import kakaotalk from "images/kakaotalk.png";
import Axios from "util/axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      email: "",
      emailCkMsg: "",
      password: "",
      kUserEmail: "",
    };
  }
  componentWillMount() {
    if (localStorage.getItem("check") === "checked") {
      this.props.history.push("/mechelin");
    } else {
      localStorage.clear();
    }
  }
  //값이 바뀌면 state 값을 변경
  handleInform = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

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
    if (this.state.checked) {
      localStorage.setItem("check", "checked");
    }
    const url = "/login";
    Axios.post(url, {
      email: this.state.email,
      password: this.refs.password.value,
    })
      .then((res) => {
        if (res.data === "pwfalse" || res.data === "mailfalse") {
          this.setState({
            emailCkMsg:
              "가입하지 않은 이메일 주소이거나, 틀린 비밀번호를 입력하였습니다.",
          });
        } else {
          localStorage.setItem("email", this.state.email);
          this.props.history.push("/mechelin/:userid");
        }
      })
      .catch((err) => {
        console.log("로그인 에러:" + err);
      });
  };

  kUserLogin = (e) => {
    this.setState({
      kUser: true,
    });
    const url = "/login/kakaologin";
    Axios.get(url)
      .then((res) => {
        this.setState({
          kUserEmail: res.data,
        });
        localStorage.setItem("email", this.state.kUserEmail);
        localStorage.setItem("kLogin", true);
      })
      .catch((err) => {
        console.log(`카카오 로그인 에러:${err}`);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.userLogin.bind(this)}>
          <table align="center" style={{ width: "200px", marginTop: "30px" }}>
            <tbody>
              <tr>
                <td>
                  <div
                    style={{
                      border: "1px solid lightgray",
                      width: "100px",
                      height: "100px",
                      margin: "7vh auto",
                    }}
                  >
                    로고
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <span style={{ float: "right", marginTop: "8px" }}>
                    <input
                      className="loginck"
                      type="checkbox"
                      style={{ width: "13px", height: "13px" }}
                      onChange={this.ChangeCheck.bind(this)}
                      checked={this.state.checked}
                    />
                    <span
                      style={{
                        marginLeft: "5px",
                        fontWeight: "normal",
                        fontSize: "13px",
                      }}
                    >
                      로그인 상태 유지
                    </span>
                  </span>
                  <br />
                  <br />
                  <input
                    type="text"
                    className="form-control"
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
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="비밀번호"
                    ref="password"
                    style={{
                      width: "250px",
                      outline: "none",
                      height: "50px",
                      fontWeight: "normal",
                      fontSize: "13px",
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
                      fontSize: "10px",
                      marginTop: "2vh",
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
                      margin: "8vh 0",
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
                  <button
                    type="button"
                    className="btn"
                    style={{
                      borderRadius: "100%",
                      border: "1px solid lightgray",
                      width: "50px",
                      height: "50px",
                      backgroundColor: "#ede10d",
                    }}
                  >
                    <img
                      src={kakaotalk}
                      style={{
                        textAlign: "center",
                        width: "28px",
                        height: "28px",
                        margin: "3.5px 0 0 -1px",
                      }}
                      alt=""
                    />
                  </button>
                  &nbsp;&nbsp;
                  <NavLink to="/signup">
                    <button
                      type="button"
                      className="btn"
                      style={{
                        borderRadius: "100%",
                        border: "1px solid lightgray",
                        width: "50px",
                        height: "50px",
                        backgroundColor: "white",
                      }}
                    >
                      미쉐린 회원가입
                      {/*<img
                        src={Google}
                        style={{
                          textAlign: "center",
                          width: "25px",
                          height: "25px",
                        }}
                        alt=""
                      />*/}
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

export default Login;
