import React from "react";
import Axios from "util/axios";
import Post from "components/review/Post";
import { Button } from "antd";

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      profileUser: sessionStorage.getItem("targetUser"),
      following: "팔로우하기",
      sameUser: true,
    };
  }
  componentWillMount() {
    this.props.getState(false);
    this.getProfile();
  }

  /*
    프로필 영역 로드
  */
  getProfile = () => {
    const url = `/friends/profile?id=${this.state.profileUser}`;
    Axios.get(url)
      .then((response) => {
        this.setState({ profile: response.data });
      })
      .catch((err) => {
        console.log("get profile error:" + err);
      });
    // 접속 유저와 프로필 유저가 다를 경우에만 팔로우 확인 실행
    if (sessionStorage.getItem("userId") !== this.state.profileUser) {
      this.setState({ sameUser: false });
      this.getFollow();
    }
  };

  /*
    팔로우 상태 확인
  */
  getFollow = () => {
    const url = `/friends/checkfriend`;
    Axios.post(url, {
      request_user_id: sessionStorage.getItem("userId"),
      target_user_id: this.state.profileUser,
    })
      .then((response) => {
        if (response.data === "friend") {
          this.setState({ following: "언팔하기" });
        } else if (response.data === "wait") {
          this.setState({ following: "팔로우 대기" });
        } else if (response.data === "send again") {
          this.setState({ following: "다시 신청" });
        } else if (response.data === "accept") {
          this.setState({ following: "팔로우 수락" });
        } else {
          this.setState({ following: "팔로우하기" });
        }
      })
      .catch((err) => {
        console.log("get follow error:" + err);
      });
  };
  /*
    팔로우 처리 버튼 클릭
  */
  onFollowClick = (e) => {
    let url = ``;
    if (e.target.value === "refuse") {
      // 팔로우 거절을 선택했다면
      url = `/friends/deletefriend`;
    } else if (
      this.state.following === "팔로우 수락" &&
      e.target.value !== "refuse"
    ) {
      // 프로필 유저가 나에게 신청을 보냈다면
      url = `/friends/acceptfriend`;
      Axios.get(url, {
        params: {
          request: this.state.profileUser,
          target: sessionStorage.getItem("userId"),
        },
      })
        .then((response) => {
          // 팔로우 상태 재확인
          this.getFollow();
          return;
        })
        .catch((err) => {
          console.log("accept error:" + err);
        });
    } // 서로 팔로우가 아니라면
    else if (this.state.following === "팔로우하기") {
      url = `/friends/addfriend`;
    } // 지금 팔로우 중이라면
    else if (this.state.following === "언팔하기") {
      url = `/friends/deletefriend`;
    } // 팔로우 신청한 지 3시간이 지났다면
    else if (this.state.following === "다시 신청") {
      url = `/friends/addfriend`;
    } // 팔로우 대기는 클릭해도 아무 일 없음
    else return;

    // 상황에 따른 url로 보내기
    Axios.post(url, {
      request_user_id: sessionStorage.getItem("userId"),
      target_user_id: this.state.profileUser,
    })
      .then((response) => {
        // 팔로우 상태 재확인
        this.getFollow();
      })
      .catch((err) => {
        console.log("follow click error:" + err);
      });
  };

  render() {
    return (
      <div
        style={{
          overflow: "auto",
          height: "100vh",
        }}
      >
        <div
          style={{
            height: "80vh",
            width: "52vw",
            margin: "10vh auto 0",
          }}
        >
          <table
            style={{
              height: "80vh",
              width: "50vw",
              margin: "10vh auto 0",
            }}
          >
            <thead>
              <tr style={{ width: "50vw" }}>
                <th style={{ paddingRight: "0" }}>
                  {" "}
                  <img
                    src={this.state.profile.profile_url}
                    alt=""
                    style={{
                      width: "5vw",
                      borderRadius: "50%",
                      height: "5vw",
                    }}
                  />
                </th>
                <th style={{ width: "44vw" }}>
                  <div
                    style={{
                      fontSize: "1.3vw",
                      marginRight: "0.7vw",
                      display: "inline-block",
                    }}
                  >
                    {this.state.profile.nickname}
                  </div>
                  {/* 팔로우버튼은 자신과 다른 유저일 때만 노출 */}
                  {this.state.sameUser ? (
                    ""
                  ) : this.state.following !== "팔로우 수락" ? (
                    <Button onClick={this.onFollowClick}>
                      {this.state.following}
                    </Button>
                  ) : (
                    <div>
                      <Button onClick={this.onFollowClick}>팔로우 수락</Button>
                      <Button onClick={this.onFollowClick} value="refuse">
                        팔로우 거절
                      </Button>
                    </div>
                  )}
                  <br />{" "}
                  <div style={{ marginLeft: "5px", marginTop: "10px" }}>
                    {" "}
                    {this.state.profile.introduce}
                  </div>
                </th>
              </tr>
            </thead>
          </table>{" "}
          <div style={{ marginTop: "2vw" }}>
            {this.state.following === "언팔하기" ||
            sessionStorage.getItem("targetUser") ===
              sessionStorage.getItem("userId") ? (
              <Post userId={this.state.profileUser} pathFrom="timeline" />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Timeline;
