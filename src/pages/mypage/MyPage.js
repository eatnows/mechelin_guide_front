import React, { useState, useEffect } from "react";
import ProfileUpload from "components/mypage/ProfileUpload";
import { Input, Button } from "antd";
import Axios from "util/axios";
import "css/myPageStyle.css";
import SlideMenu from "components/mypage/SlideMenu";

const MyPage = (props) => {
  const [email, setEmail] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [newIntro, setNewIntro] = useState("");
  const [nickname, setNickname] = useState("");
  const [newNickname, setNewNickname] = useState("");
  const [nicknameCkMsg, setNicknameCkMsg] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [possiblePwCkMsg, setPossiblePwCkMsg] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [samePwCkMsg, setSamePwCkMsg] = useState("");
  const [kUser, setKUser] = useState(sessionStorage.getItem("kLogin"));
  const [introChange, setIntroChange] = useState(false);
  const [nickChange, setNickChange] = useState(false);
  const [nicknameSuccess, setNicknameSuccess] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [samePwSuccess, setSamePwSuccess] = useState(false);
  useEffect(() => {
    props.getState(false);
    userInfo();
  }, []);

  /*유저 정보 가져오기 */
  const userInfo = () => {
    console.log("state kuser: " + kUser);
    const url = `/friends/profile?id=${sessionStorage.getItem("userId")}`;
    Axios.get(url)
      .then((res) => {
        console.log(res);
        setEmail(res.data.email);
        setIntroduce(res.data.introduce);
        setNewIntro(res.data.introduce);
        setNickname(res.data.nickname);
        setNewNickname(res.data.nickname);
        setIntroChange(false);
        setNickChange(false);
      })
      .catch((err) => {
        console.log("유저 로드 실패: " + err);
      });
  };
  //값이 바뀌면 state 값을 변경
  const changeNewIntro = (e) => {
    setNewIntro(e.target.value);
  };
  //값이 바뀌면 state 값을 변경
  const changeNewNickname = (e) => {
    setNewNickname(e.target.value);
  };
  //값이 바뀌면 state 값을 변경
  const changeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  //값이 바뀌면 state 값을 변경
  const changeRePassword = (e) => {
    setRePassword(e.target.value);
  };

  // 소개글 변경 클릭
  const onChangeIntro = (e) => {
    setIntroChange(true);
  };

  // 소개글 변경
  const onIntroSubmit = (e) => {
    if (newIntro === introduce || newIntro === "") {
      setIntroChange(false);
    } else {
      const url = `/changeintro`;
      Axios.post(url, {
        id: sessionStorage.getItem("userId"),
        introduce: newIntro,
      })
        .then((res) => {
          userInfo();
        })
        .catch((err) => {
          console.log("소개글 변경 실패: " + err);
        });
    }
  };

  // 닉네임 변경 클릭
  const onChangeNick = (e) => {
    setNickChange(true);
  };

  //닉네임 중복 체크
  const checkNickname = (e) => {
    if (newNickname !== "" && newNickname !== nickname) {
      const url = "/signupcheck/nick?nickname=" + newNickname;
      Axios.get(url)
        .then((res) => {
          if (res.data === "usethis") {
            setNicknameCkMsg("사용 가능한 닉네임입니다.");
            setNicknameSuccess(true);
          } else {
            setNicknameCkMsg("이미 등록된 닉네임입니다.");
            setNicknameSuccess(false);
          }
        })
        .catch((err) => {
          console.log("닉네임 중복 체크 에러:" + err);
        });
    } else {
      setNicknameCkMsg("");
    }
  };
  // 닉네임 변경
  const onNicknameSubmit = (e) => {
    if (newNickname === nickname || newNickname === "") {
      setNickChange(false);
    } else if (nicknameSuccess === true) {
      const url = `/changenick`;
      Axios.post(url, {
        id: sessionStorage.getItem("userId"),
        nickname: newNickname,
      })
        .then((res) => {
          userInfo();
        })
        .catch((err) => {
          console.log("닉네임 변경 실패: " + err);
        });
    }
  };
  //비밀번호 형식 확인
  const checkPW = (e) => {
    //비밀번호 유효성검사(영문,숫자 혼합 6~20)
    const chkPw = (str) => {
      const standard = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[`~!@@#$%^&*|₩₩₩'₩";:₩/?]).*$/;
      return !standard.test(str) ? false : true;
    };

    if (newPassword !== "") {
      if (chkPw(newPassword) === false) {
        setPossiblePwCkMsg(
          "영문, 숫자, 특수문자를 혼합하여 8~20자 이내로 입력해주십시오."
        );
      } else {
        setPossiblePwCkMsg("사용 가능한 비밀번호입니다.");
        setPwSuccess(true);
      }
    } else {
      setPossiblePwCkMsg("");
    }

    //비밀번호, 비밀번호 재입력 값 비교
    if (rePassword !== "") {
      if (newPassword === rePassword) {
        setSamePwCkMsg("비밀번호가 일치합니다.");
        setSamePwSuccess(true);
      } else {
        setSamePwCkMsg("비밀번호가 일치하지 않습니다.");
      }
    } else {
      setSamePwCkMsg("");
    }
  };

  //변경된 비밀번호로 업데이트
  const ChangePwd = (e) => {
    e.preventDefault();
    if (pwSuccess) {
      const url = "/changepwd/reset";
      Axios.post(url, {
        id: sessionStorage.getItem("userId"),
        password: newPassword,
      })
        .then((res) => {
          alert("회원 정보가 변경되었습니다.");
          userInfo();
          props.history.push("/");
        })
        .catch((err) => {
          console.log("update userInfom error:" + err);
        });
    } else {
      alert("비밀번호를 입력해주세요.");
    }
  };

  // 회원 탈퇴
  const dropUser = (e) => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      // 네이버로 회원가입한 유저일 경우 토큰 삭제
      if (sessionStorage.getItem("loginPlatform") === "naver") {
        const naverUrl = `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=앱키&client_secret=시크릿키&access_token=${sessionStorage.getItem(
          "token"
        )}&service_provider=NAVER`;
        Axios.post(naverUrl)
          .then((res) => {
            console.log(res.result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      //구글로 회원가입한 유저일 경우 토큰 삭제

      if (sessionStorage.getItem("loginPlatform") === "google") {
        window.auth2.disconnect();
      }

      //그냥 유저일 경우
      var dropPass = window.prompt("탈퇴하려면 비밀번호를 재입력하세요");
      if (dropPass != null) {
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
              alert("비밀번호가 맞지 않습니다.");
            }
          })
          .catch((err) => {
            console.log("회원 탈퇴 error: " + err);
          });
      } else {
        alert("비밀번호를 입력하세요.");
      }
    }
  };

  return (
    <div>
      <div
        style={{
          width: "10vw",
          height: "10vw",
          position: "absolute",
          left: "3%",
          top: "25%",
        }}
      >
        <SlideMenu />
      </div>
      <form>
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
                {email}
              </td>
            </tr>
            {introChange ? (
              <tr>
                <td>소개글</td>
                <td style={{ paddingBottom: "0" }}>
                  <Input
                    value={newIntro}
                    name="newIntro"
                    onChange={changeNewIntro}
                    style={{
                      width: "18vw",
                      height: "3.5vw",
                      fontWeight: "normal",
                      outline: "none",
                      fontSize: "1vw",
                    }}
                  />{" "}
                  <br />
                  <br />
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <Button
                    type="text"
                    style={{ float: "right", color: "rgba(245,145,45)" }}
                    onClick={onIntroSubmit}
                  >
                    확인
                  </Button>
                </td>
              </tr>
            ) : (
              <tr>
                <td>소개글</td>
                <td>
                  <span style={{ float: "left" }}>{introduce}</span>
                  &nbsp;&nbsp;
                </td>
                <td>
                  <Button
                    type="text"
                    style={{
                      float: "right",
                      color: "rgba(245,145,45)",
                    }}
                    onClick={onChangeIntro}
                  >
                    수정
                  </Button>
                </td>{" "}
              </tr>
            )}{" "}
            {nickChange ? (
              <tr>
                <td>닉네임</td>
                <td style={{ paddingBottom: "0" }}>
                  <Input
                    value={newNickname}
                    name="newNickname"
                    onChange={changeNewNickname}
                    onKeyUp={checkNickname}
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
                      color: nicknameSuccess ? "green" : "red",
                      fontSize: "10px",
                      fontWeight: "normal",
                      textAlign: "center",
                      margin: "10px auto",
                    }}
                  >
                    {nicknameCkMsg}
                  </span>
                  <br />
                </td>
                <td>
                  <Button
                    type="text"
                    style={{ color: "rgba(245,145,45)", float: "right" }}
                    onClick={onNicknameSubmit}
                  >
                    확인
                  </Button>
                </td>
              </tr>
            ) : (
              <tr>
                <td>닉네임</td>

                <td>{nickname}&nbsp;&nbsp;</td>
                <td>
                  <Button
                    type="text"
                    style={{ color: "rgba(245,145,45)", float: "right" }}
                    onClick={onChangeNick}
                  >
                    수정
                  </Button>
                </td>
              </tr>
            )}
            <tr>
              <td>비밀번호</td>
              {kUser === true ||
              sessionStorage.getItem("loginPlatform") !== null ? (
                <td colSpan="2">
                  <span style={{ fontWeight: "bold" }}>
                    소셜 로그인 유저는 비밀번호를 변경하실 수 없습니다.
                  </span>
                </td>
              ) : (
                <td colSpan="2">
                  <Input.Password
                    placeholder="비밀번호"
                    name="newPassword"
                    onChange={changeNewPassword}
                    onKeyUp={checkPW}
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
                      color: pwSuccess ? "green" : "red",
                      fontSize: "10px",
                      fontWeight: "normal",
                      textAlign: "center",
                      margin: "10px auto",
                    }}
                  >
                    {possiblePwCkMsg}
                  </span>
                </td>
              )}
            </tr>
            {kUser === true ||
            sessionStorage.getItem("loginPlatform") !== null ? (
              ""
            ) : (
              <tr>
                <td>비밀번호 확인</td>
                <td colSpan="2">
                  <Input.Password
                    onChange={changeRePassword}
                    onKeyUp={checkPW}
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
                      color: samePwSuccess ? "green" : "red",
                      fontSize: "10px",
                      fontWeight: "normal",
                      textAlign: "center",
                      margin: "10px auto",
                    }}
                  >
                    {samePwCkMsg}
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
                {kUser ? (
                  ""
                ) : (
                  <Button
                    onClick={ChangePwd}
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
                  onClick={dropUser}
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
  );
};
export default MyPage;
