import React, { Component } from "react";
import "components/css/loginStyle.css";
import Google from "images/google.png";
import axios from "axios";

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

  //이메일 존재 여부 확인
  checkEmail = (e) => {
    //형식이 맞으면 중복 체크
    const url = "http://localhost:9000/mechelin/signupcheck/email";
    axios
      .post(url, { email: e.email })
      .then((res) => {
        if (res.data === "usenot") {
          this.setState({
            emailCkMsg: "존재하지 않는 이메일 주소입니다.",
          });
        } else {
          this.setState({
            emailCkMsg: "",
          });
        }
      })
      .catch((err) => {
        console.log("이메일 존재 확인:" + err);
      });
  };

  render() {
    return (
      <div>
        <form>
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
                        marginBottom: "10px",
                      }}
                    >
                      로그인 상태 유지
                    </span>
                  </span>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="EMAIL"
                    name="email"
                    onChange={this.handleInform.bind(this)}
                    onKeyUp={this.checkEmail.bind(this)}
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
                  <span
                    style={{
                      marginLeft: "5px",
                      fontWeight: "normal",
                      fontSize: "10px",
                    }}
                  >
                    비밀번호를 잊으셨나요?
                  </span>
                  <button
                    type="button"
                    className="btn btn-md"
                    style={{
                      width: "80px",
                      height: "20px",
                      fontSize: "10px",
                      padding: "0",
                      lineHeight: "10px",
                      float: "right",
                      border: "1px solid rgba(245,145,45)",
                      backgroundColor: "white",
                      color: "rgba(245,145,45)",
                    }}
                  >
                    비밀번호 찾기
                  </button>
                  <br />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>
                  <br />
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      backgroundColor: "rgba(245,145,45)",
                      color: "white",
                      height: "30px",
                    }}
                  >
                    로그인
                  </button>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>
                  <br />
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
