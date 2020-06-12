import React, { Component } from "react";
import "components/css/loginStyle.css";
import Google from "images/google.png";
import axios from "axios";
import { NavLink } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailCkMsg: "",
    };
  }

  //값이 바뀌면 state 값을 변경
  handleInform = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //이메일, 비밀번호 체크 후 로그인
  onSubmit = (e) => {
    const url = "http://localhost:9000/mechelin/login";
    axios
      .post(url, { email: e.email, password: e.password })
      .then((res) => {
        if (res.data === "pwfalse" || res.data === "mailfalse") {
          this.setState({
            emailCkMsg:
              "가입하지 않은 이메일 주소이거나, 틀린 비밀번호를 입력하였습니다.",
          });
        } else {
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        console.log("로그인 에러:" + err);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
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
                      type="checkbox"
                      style={{ width: "13px", height: "13px" }}
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
                    placeholder="EMAIL"
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
                    placeholder="PASSWORD"
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
                      backgroundColor: "white",
                    }}
                  >
                    <img
                      src={Google}
                      style={{
                        textAlign: "center",
                        width: "25px",
                        height: "25px",
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
                      <img
                        src={Google}
                        style={{
                          textAlign: "center",
                          width: "25px",
                          height: "25px",
                        }}
                        alt=""
                      />
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
