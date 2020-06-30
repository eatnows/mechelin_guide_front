import React from "react";
import ProfileUpload from "components/mypage/ProfileUpload";
import { Input, Button } from "antd";
import Axios from "util/axios";
import "css/myPageStyle.css";

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kUser: sessionStorage.getItem("kLogin"),
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
    console.log("state kuser: " + this.state.kUser);
    const url = `/friends/profile?id=${sessionStorage.getItem("userId")}`;
    Axios.get(url)
      .then((res) => {
        console.log(res);
        this.setState({
          email: res.data.email,
          introduce: res.data.introduce,
          newIntro: res.data.introduce,
          nickname: res.data.nickname,
          newNickname: res.data.nickname,
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
          console.log("소개글 변경 실패: " + err);
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
        id: sessionStorage.getItem("userId"),
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

  // 회원 탈퇴
  dropUser = (e) => {
    var dropPass = window.prompt("탈퇴하려면 비밀번호를 재입력하세요");
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      const url = `/dropout`;
      Axios.post(url, {
        id: sessionStorage.getItem("userId"),
        password: dropPass,
      })
        .then((res) => {
          if (res.data.check_item === "valid") {
            sessionStorage.removeItem("userId");
            window.location.reload();
          } else {
            alert("비밀번호가 맞지 않습니다");
          }
        })
        .catch((err) => {
          console.log("회원 탈퇴 error: " + err);
        });
    }
  };

  render() {
    return (
      <div>
        <div>
          {" "}
          <form>
            {" "}
            <caption
              style={{
                position: "absolute",
                fontSize: "1.5vw",
                fontWeight: "bold",
                top: "10vw",
                left: "3.5vw",
                color: "rgba(245,145,45)",
              }}
            >
              회원정보 수정
            </caption>
            <table
              className="myPageTable"
              style={{
                width: "40vw",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <thead>
                <tr>
                  <th
                    colSpan="3"
                    align="center"
                    style={{
                      margin: "0 auto",
                      paddingBottom: "4vh",
                      align: "center",
                    }}
                  >
                    {" "}
                    <ProfileUpload />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>이메일</td>
                  <td colSpan="2" style={{ fontWeight: "bold" }}>
                    {this.state.email}
                  </td>
                </tr>
                {this.state.introChange ? (
                  <tr>
                    <td>소개글</td>
                    <td style={{ paddingBottom: "0" }}>
                      <Input
                        value={this.state.newIntro}
                        name="newIntro"
                        onChange={this.handleInform.bind(this)}
                        style={{
                          width: "18vw",
                          height: "3.5vw",
                          fontWeight: "normal",
                          outline: "none",
                          fontSize: "1vw",
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
                        {this.state.nicknameCkMsg}
                      </span>
                      <br />
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <Button
                        type="text"
                        style={{ float: "right", color: "rgba(245,145,45)" }}
                        onClick={this.onIntroSubmit.bind(this)}
                      >
                        확인
                      </Button>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td>소개글</td>
                    <td>
                      <span style={{ float: "left" }}>
                        {this.state.introduce}
                      </span>
                      &nbsp;&nbsp;
                    </td>
                    <td>
                      <Button
                        type="text"
                        style={{
                          float: "right",
                          color: "rgba(245,145,45)",
                        }}
                        onClick={this.onChangeIntro.bind(this)}
                      >
                        수정
                      </Button>
                    </td>{" "}
                  </tr>
                )}{" "}
                {this.state.nickChange ? (
                  <tr>
                    <td>닉네임</td>
                    <td style={{ paddingBottom: "0" }}>
                      <Input
                        ref="nickname"
                        value={this.state.newNickname}
                        name="newNickname"
                        onChange={this.handleInform.bind(this)}
                        onKeyUp={this.checkNickname.bind(this)}
                        style={{
                          width: "18vw",
                          height: "3.5vw",
                          fontWeight: "normal",
                          outline: "none",
                          fontSize: "1vw",
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
                        {this.state.nicknameCkMsg}
                      </span>
                      <br />
                    </td>
                    <td>
                      <Button
                        type="text"
                        style={{ color: "rgba(245,145,45)", float: "right" }}
                        onClick={this.onNicknameSubmit.bind(this)}
                      >
                        확인
                      </Button>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td>닉네임</td>

                    <td>{this.state.nickname}&nbsp;&nbsp;</td>
                    <td>
                      <Button
                        type="text"
                        style={{ color: "rgba(245,145,45)", float: "right" }}
                        onClick={this.onChangeNick}
                      >
                        수정
                      </Button>
                    </td>
                  </tr>
                )}
                <tr>
                  <td>비밀번호</td>
                  {this.state.kUser ? (
                    <td colSpan="2">
                      <span style={{ fontWeight: "bold" }}>
                        카카오 유저는 비밀번호를 변경하실 수 없습니다.
                      </span>
                    </td>
                  ) : (
                    <td colSpan="2">
                      <Input.Password
                        placeholder="비밀번호"
                        name="newPassword"
                        onChange={this.handleInform.bind(this)}
                        onKeyUp={this.checkPW.bind(this)}
                        style={{
                          width: "18vw",
                          outline: "none",
                          height: "3.5vw",
                          fontWeight: "normal",
                          fontSize: "1vw",
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
                  )}
                </tr>
                {this.state.kUser ? (
                  ""
                ) : (
                  <tr>
                    <td>비밀번호 확인</td>
                    <td colSpan="2">
                      <Input.Password
                        onChange={this.handleInform.bind(this)}
                        onKeyUp={this.checkPW.bind(this)}
                        name="rePassword"
                        placeholder="비밀번호 재입력"
                        style={{
                          width: "18vw",
                          outline: "none",
                          height: "3.5vw",
                          fontWeight: "normal",
                          fontSize: "1vw",
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
                )}
                <tr>
                  <td
                    colSpan="3"
                    style={{ paddingTop: "3vh", textAlign: "center" }}
                  >
                    {this.state.kUser ? (
                      ""
                    ) : (
                      <Button
                        onClick={this.ChangePwd.bind(this)}
                        type="primary"
                        style={{
                          height: "3vw",
                          width: "5.5vw",
                          display: "inline-block",
                          marginRight: "2vw",
                        }}
                      >
                        저장
                      </Button>
                    )}
                    <Button
                      onClick={this.dropUser.bind(this)}
                      style={{
                        display: "inline-block",
                        color: "rgba(0,0,0,.4)",
                        height: "3vw",
                      }}
                    >
                      회원탈퇴
                    </Button>
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
