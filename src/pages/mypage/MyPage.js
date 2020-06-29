import React from "react";
import ProfileUpload from "components/mypage/ProfileUpload";
import { tab } from "material-components-web";
import { Input } from "antd";
import { NavLink } from "react-router-dom";
import Axios from "util/axios";

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kUser: this.props.kUser,
      email: "",
      introduce: "",
      newIntro: "",
      introChange: false,
      nickname: "",
      newNickname: "",
      nickChange: false,
      nicknameSuccess: false,
      nicknameCkMsg: "",
      newPassword: "",
      pwSuccess: false,
      possiblePwCkMsg: "",
      rePassword: "",
      samePwSuccess: false,
      samePwCkMsg: "",
    };
  }
  componentWillMount() {
    this.props.getState(false);
    this.userInfo();
  }

  userInfo = () => {
    const url = `/friends/profile?id=${sessionStorage.getItem("userId")}`;
    Axios.get(url)
      .then((res) => {
        console.log(res);
        this.setState({
          email: res.data.email,
          nickname: res.data.nickname,
          newNickname: res.data.nickname,
          introduce: res.data.introduce,
          introChange: false,
          nickChange: false,
        });
      })
      .catch((err) => {
        console.log("유저 로드 실패: " + err);
      });
  };
  //값이 바뀌면 state 값을 변경
  handleInform = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // 소개글 변경 클릭
  onChangeIntro = (e) => {
    this.setState({ introChange: true });
  };

  // 소개글 변경
  onIntroSubmit = (e) => {
    if (
      this.state.newIntro === this.state.introduce ||
      this.state.newIntro === ""
    ) {
      this.setState({ introChange: false });
    } else {
      const url = `/changeintro`;
      Axios.post(url, {
        id: sessionStorage.getItem("userId"),
        introduce: this.state.newIntro,
      })
        .then((res) => {
          this.userInfo();
        })
        .catch((err) => {
          console.log("닉네임 변경 실패: " + err);
        });
    }
  };

  // 닉네임 변경 클릭
  onChangeNick = (e) => {
    this.setState({ nickChange: true });
  };
  //닉네임 중복 체크
  checkNickname = (e) => {
    if (
      this.state.newNickname !== "" &&
      this.state.newNickname !== this.state.nickname
    ) {
      const url = "/signupcheck/nick?nickname=" + this.state.newNickname;
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
  // 닉네임 변경
  onNicknameSubmit = (e) => {
    if (
      this.state.newNickname === this.state.nickname ||
      this.state.newNickname === ""
    ) {
      this.setState({ nickChange: false });
    } else {
      const url = `/changenick`;
      Axios.post(url, {
        id: sessionStorage.getItem("userId"),
        nickname: this.state.newNickname,
      })
        .then((res) => {
          this.userInfo();
        })
        .catch((err) => {
          console.log("닉네임 변경 실패: " + err);
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

    if (this.state.newPassword !== "") {
      if (chkPw(this.state.newPassword) === false) {
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
      if (this.state.newPassword === this.state.rePassword) {
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
    if (this.state.pwSuccess) {
      const url = "/changepwd/reset";
      Axios.post(url, {
        email: this.state.email,
        password: this.state.newPassword,
      })
        .then((res) => {
          this.userInfo();
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
        MyPage
        <ProfileUpload />
        <div>
          <form>
            <table align="center" style={{ width: "200px", marginTop: "30px" }}>
              <tbody>
                <tr>
                  <td>이메일</td>
                  <td>{this.state.email}</td>
                </tr>
                <tr>
                  <td>소개글</td>
                  {this.state.introChange ? (
                    <td>
                      <Input
                        type="text"
                        value={this.state.newIntro}
                        name="newIntro"
                        onChange={this.handleInform.bind(this)}
                        style={{
                          width: "250px",
                          height: "50px",
                          fontWeight: "normal",
                          outline: "none",
                          fontSize: "13px",
                        }}
                      />{" "}
                      <button
                        type="button"
                        onClick={this.onIntroSubmit.bind(this)}
                      >
                        변경
                      </button>
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
                        {this.state.nicknameCkMsg}
                      </span>
                      <br />
                    </td>
                  ) : (
                    <td>
                      {this.state.introduce}&nbsp;&nbsp;
                      <button
                        type="button"
                        onClick={this.onChangeIntro.bind(this)}
                      >
                        수정
                      </button>
                    </td>
                  )}
                </tr>
                <tr>
                  <td>닉네임</td>
                  {this.state.nickChange ? (
                    <td>
                      <Input
                        type="text"
                        ref="nickname"
                        value={this.state.newNickname}
                        name="newNickname"
                        onChange={this.handleInform.bind(this)}
                        onKeyUp={this.checkNickname.bind(this)}
                        style={{
                          width: "250px",
                          height: "50px",
                          fontWeight: "normal",
                          outline: "none",
                          fontSize: "13px",
                        }}
                      />{" "}
                      <button
                        type="button"
                        onClick={this.onNicknameSubmit.bind(this)}
                      >
                        변경
                      </button>
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
                        {this.state.nicknameCkMsg}
                      </span>
                      <br />
                    </td>
                  ) : (
                    <td>
                      {this.state.nickname}&nbsp;&nbsp;
                      <button type="button" onClick={this.onChangeNick}>
                        수정
                      </button>
                    </td>
                  )}
                </tr>
                <tr>
                  <td>비밀번호</td>
                  <td>
                    <Input.Password
                      placeholder="비밀번호"
                      name="newPassword"
                      onChange={this.handleInform.bind(this)}
                      onKeyUp={this.checkPW.bind(this)}
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
                  </td>
                </tr>
                <tr>
                  <td></td>
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
                    <button
                      onClick={this.ChangePwd.bind(this)}
                      type="button"
                      className="btn"
                      style={{
                        margin: "5vh 0",
                        backgroundColor: "rgba(245,145,45)",
                        color: "white",
                        height: "40px",
                        width: "100px",
                      }}
                    >
                      저장하기
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    );
  }
}
export default MyPage;
