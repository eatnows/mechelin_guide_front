import React from "react";
import { NavLink, Route } from "react-router-dom";
import {
  FullMap,
  FAQ,
  QnA,
  MyPage,
  WishList,
  NewsFeed,
  Review,
  Timeline,
  Result,
} from "pages/index.js";
import "css/mainStyle.css";
import { Input } from "antd";
import logo from "images/logo.png";
import logo2 from "images/logo2.png";
import Axios from "util/axios";
import User from "../admin/User";
import Report from "../admin/Report";
import Qna from "../admin/Qna";
let keyword;
let userPlaceId;
let targetUserId;
let listData2 = [];
class View extends React.Component {
  state = {
    main: true,
    section: false,
    bar: false,
    userId: sessionStorage.getItem("userId"),
    name: "",
    search: "",
    lock: true,
    mypage: false,
    cc: false,
    userPlaceid: "",
    listData2: [],
    targetUserId: "",
  };

  componentWillMount() {
    /*세션스토리지에 유저아이디가 없으면 로그인 화면으로 돌아감 */
    if (sessionStorage.getItem("userId") === null) {
      this.props.history.push("/");
    }
  }

  /*다른 페이지에서 스테이트 값을 받아와서 스테이트값을 변경시켜줌*/
  getState = (state) => {
    this.setState({ main: state });
  };

  /*메인 화면을 보여줌 */
  showMenu = () => {
    if (this.state.bar) {
      this.setState({ bar: false, search: "" });
    } else {
      this.setState({ bar: true });
    }
  };

  /*다른 페이지로 이동할 때 메뉴화면 제거 */
  goAnotherPage = () => {
    sessionStorage.setItem("targetUser", sessionStorage.getItem("userId"));
    this.setState({ bar: false });
  };

  /*로그인 버튼에 마우스를 올리면 아이콘 변경*/
  changeLock = () => {
    if (!this.state.lock) {
      this.setState({
        lock: true,
      });
    } else {
      this.setState({
        lock: false,
      });
    }
  };

  /*마이페이지에 마우스를 올리면 서브메뉴를 보여줌*/
  showMypage = () => {
    if (!this.state.mypage) {
      this.setState({
        mypage: true,
        cc: false,
      });
    } else {
      this.setState({
        mypage: false,
      });
    }
  };

  /*고객센터에 마우스를 올리면 서브메뉴를 보여줌*/
  showCC = () => {
    if (!this.state.cc) {
      this.setState({
        cc: true,
        mypage: false,
      });
    } else {
      this.setState({
        cc: false,
      });
    }
  };

  /*검색창 값이 변하면 스테이트에 변한 값을 담아줌 */
  changeInput = (e) => {
    keyword = e.target.value;
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  /*
   * 검색창에서 엔터 입력시
   */
  KeyUpSearchBar = (e) => {
    if (e.key === "Enter") {
      console.log("엔터");
      this.cleanSearch();
      this.props.history.push(`/mechelin/result/${this.state.userId}`);
    }
  };

  /*
   * 검색 버튼 클릭시 검색창 초기화
   */
  cleanSearch = () => {
    const url = `/post/search?user_id=${sessionStorage.getItem(
      "userId"
    )}&keyword=${this.state.search}`;
    Axios.get(url)
      .then((res) => {
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          const text = res.data[i].content.replace(/(<([^>]+)>)/gi, "");
          listData2.push({
            // href: "https://ant.design",
            title: res.data[i].name,
            avatar: res.data[i].profile_url,
            description: res.data[i].subject,
            content: text,
            frontImage: res.data[i].front_image,
            likes: res.data[i].likes,
            commentCount: res.data[i].comment_count,
            wishCount: res.data[i].wish_count,
            userPlaceId: res.data[i].user_place_id,
          });
        }

        this.setState({
          search: "",
          bar: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    listData2 = [];
  };
  /*
   * 리뷰 페이지로 넘어가기 위한 메소드
   */
  reivewPageMove = (user_place_id) => {
    userPlaceId = user_place_id;
    this.setState({
      userPlaceid: user_place_id,
    });
  };
  /*
   * 타임라인 페이지로 넘어가기 위한 메소드
   */
  timelinePageMove = (target_user_id) => {
    targetUserId = target_user_id;
    this.setState({
      targetUserId: target_user_id,
    });
  };

  render() {
    return (
      <div>
        {/*메뉴화면 숨기기 위해서 배경 넣어줌 */}
        <div
          className="background"
          style={{
            width: "100vw",
            height: "100vh",
            zIndex: "-1",
            backgroundColor: "white",
            position: "absolute",
          }}
        ></div>

        {/*로고*/}
        <NavLink to={"/mechelin/" + this.state.userId}>
          <div
            className="logo"
            onClick={() => {
              this.setState({ main: true, bar: false });
              console.log(this.state.main, this.state.bar);
              console.log("a");
            }}
            style={{
              cursor: "pointer",
              lineHeight: "17.5vh",
              zIndex: "1",
              position: "fixed",
              left: "2%",
              top: "3%",
            }}
          >
            <img
              src={!this.state.main || this.state.bar ? logo2 : logo}
              alt=""
              style={{
                width: "auto",
                height: "17.5vh",
              }}
            />
          </div>
        </NavLink>

        {/* 삼항 연산자를 이용해 출력 페이지 변경 */}
        {this.state.main ? (
          <FullMap
            history={this.props.history}
            bar={this.state.bar}
            reivewPageMove={this.reivewPageMove.bind(this)}
          />
        ) : (
          ""
        )}
        <Route
          path="/mechelin/faq/:userId"
          render={() => {
            return (
              <FAQ
                getState={this.getState.bind(this)}
                userId={this.state.userId}
              />
            );
          }}
        />
        <Route
          path="/mechelin/qna/:userId"
          render={() => {
            return (
              <QnA
                getState={this.getState.bind(this)}
                userId={this.state.userId}
              />
            );
          }}
        />
        <Route
          path="/mechelin/mypage/:userId"
          render={() => {
            return (
              <MyPage
                getState={this.getState.bind(this)}
                userId={this.state.userId}
                history={this.props.history}
              />
            );
          }}
        />
        <Route
          path="/mechelin/wishlist/:userId"
          render={() => {
            return (
              <WishList
                getState={this.getState.bind(this)}
                userId={this.state.userId}
                reivewPageMove={this.reivewPageMove.bind(this)}
                history={this.props.history}
              />
            );
          }}
        />
        <Route
          path="/mechelin/newsfeed/:userId"
          render={() => {
            return (
              <NewsFeed
                getState={this.getState.bind(this)}
                userId={this.state.userId}
                history={this.props.history}
              />
            );
          }}
        />
        <Route
          path="/mechelin/review/:userPlaceId"
          render={() => {
            return (
              <Review
                getState={this.getState.bind(this)}
                userPlaceId={userPlaceId}
                history={this.props.history}
                timelinePageMove={this.timelinePageMove.bind(this)}
              />
            );
          }}
        />

        <Route
          path="/mechelin/timeline/:userId"
          render={() => {
            return (
              <Timeline
                getState={this.getState.bind(this)}
                userId={this.state.userId}
                history={this.props.history}
                targetUserId={this.state.targetUserId}
              />
            );
          }}
        />
        <Route
          path="/mechelin/result/:userId"
          render={() => {
            return (
              <Result
                getState={this.getState.bind(this)}
                userId={this.state.userId}
                search={keyword}
                listData2={listData2}
                reivewPageMove={this.reivewPageMove.bind(this)}
                history={this.props.history}
              />
            );
          }}
        />
        <Route
          path="/mechelin/admin/user"
          render={() => {
            return (
              <User
                getState={this.getState.bind(this)}
                userId={this.state.userId}
              />
            );
          }}
        />
        <Route
          path="/mechelin/admin/qna"
          render={() => {
            return (
              <Qna
                getState={this.getState.bind(this)}
                userId={this.state.userId}
              />
            );
          }}
        />
        <Route
          path="/mechelin/admin/report"
          render={() => {
            return (
              <Report
                getState={this.getState.bind(this)}
                userId={this.state.userId}
              />
            );
          }}
        />

        {/* 메뉴 바 */}
        <div
          className={
            this.state.bar
              ? "xi-close barIcon xi-2x closeBar"
              : "xi-bars barIcon xi-2x openBar"
          }
          onClick={this.showMenu.bind(this)}
          style={{
            textAlign: "center",
            borderRadius: "50%",
            cursor: "pointer",
            zIndex: "1",
            position: "fixed",
          }}
        ></div>

        {/* 메뉴 화면 */}
        <section>
          {/* 배경 설정 */}
          <div
            className={this.state.bar ? "barSection" : "defaultBar"}
            style={{
              boxShadow:
                !this.state.bar && this.state.main
                  ? "3px 3px 10px #999"
                  : "none",
              zIndex: "0",
            }}
          ></div>

          {/*메뉴 구성 요소 */}
          <div
            className="inner"
            style={{
              opacity: this.state.bar ? "1" : "0",
              zIndex: this.state.bar ? "2" : "-2",
              transition: this.state.bar ? "all 0.3s ease .4s" : "all 1s",
              position: "absolute",
              left: "50%",
              top: "0%",
              transform: "translate(-50%)",
            }}
          >
            {/* 검색창 */}
            <div
              className="searchBar"
              style={{
                margin: "7vh auto 3vh ",
                lineHeight: "5vh",
                height: "5vh",
                width: "24vw",
                paddingLeft: "6px",
              }}
            >
              {" "}
              <Input
                value={this.state.search}
                placeholder="내슐랭 리뷰를 찾아보세요!"
                className="search"
                name="search"
                maxLength="100"
                onChange={this.changeInput.bind(this)}
                onKeyUp={this.KeyUpSearchBar.bind(this)}
                style={{
                  fontFamily: "Nanum Gothic Coding",
                  fontWeight: "normal",
                  display: "inline-block",
                  height: "5vh",
                  width: "20.3vw",
                  border: "2px solid rgba(245, 145, 45)",
                  borderRadius: "5px",
                  padding: "0 13px 0 10px",
                  marginLeft: "6px",
                }}
              />
              <NavLink to={"/mechelin/result/" + this.state.userId}>
                <button
                  type="button"
                  className="btn xi-search"
                  onClick={this.cleanSearch.bind(this)}
                  value={!this.state.search === "" ? this.state.search : ""}
                  style={{
                    margin: "-1px 0 0 -6px",
                    display: "inline-block",
                    width: "2.5vw",
                    height: "5vh",
                    border: "2px solid rgba(245, 145, 45)",
                    padding: "0",
                    backgroundColor: "rgba(245,145,45)",
                    color: "white",
                    fontSize: "20px",
                  }}
                ></button>
              </NavLink>
            </div>{" "}
            {/*각 페이지 이동 버튼 */}
            {sessionStorage.getItem("userId") === "10" ? (
              <span>
                <ul
                  className="menu"
                  style={{
                    width: "40vw",
                    height: "100vh",
                    textAlign: "center",
                    marginTop: "5vh",
                  }}
                >
                  <NavLink to={"/mechelin/admin/user"}>
                    <li
                      onClick={this.goAnotherPage.bind(this)}
                      style={{
                        fontSize: "7vw",
                      }}
                    >
                      유저 관리
                    </li>{" "}
                    <br />
                  </NavLink>
                  <NavLink to={"/mechelin/admin/qna"}>
                    <li
                      onClick={this.goAnotherPage.bind(this)}
                      style={{
                        fontSize: "7vw",
                      }}
                    >
                      1:1 문의
                    </li>{" "}
                    <br />
                  </NavLink>
                  <NavLink to={"/mechelin/admin/report"}>
                    <li
                      id="mypage"
                      onClick={this.goAnotherPage.bind(this)}
                      style={{
                        fontSize: "7vw",
                      }}
                    >
                      신고 목록{" "}
                    </li>{" "}
                    <br />
                  </NavLink>
                </ul>
              </span>
            ) : (
              <span>
                <ul
                  className="menu"
                  style={{
                    width: "40vw",
                    height: "100vh",
                    textAlign: "center",
                  }}
                >
                  <NavLink to={"/mechelin/newsfeed/" + this.state.userId}>
                    <li
                      onClick={this.goAnotherPage.bind(this)}
                      style={{
                        fontSize:
                          this.state.mypage || this.state.cc ? "4vw" : "6vw",
                        marginBottom:
                          this.state.mypage || this.state.cc ? "-5vh" : "-2vh",
                        marginTop:
                          this.state.cc || this.state.mypage ? "2vh" : "0",
                      }}
                    >
                      뉴스 피드
                    </li>{" "}
                    <br />
                  </NavLink>
                  <NavLink to={"/mechelin/timeline/" + this.state.userId}>
                    <li
                      onClick={this.goAnotherPage.bind(this)}
                      style={{
                        fontSize:
                          this.state.mypage || this.state.cc ? "4vw" : "6vw",
                        marginBottom:
                          this.state.mypage || this.state.cc ? "-5vh" : "-2vh",
                        marginTop:
                          this.state.cc || this.state.mypage ? "2vh" : "0",
                      }}
                    >
                      타임라인
                    </li>{" "}
                    <br />
                  </NavLink>
                  <li
                    id="mypage"
                    onClick={this.showMypage.bind(this)}
                    style={{
                      fontSize: this.state.cc ? "4vw" : "6vw",
                      marginBottom: this.state.cc
                        ? "-5vh"
                        : this.state.mypage
                        ? "15vh"
                        : "-2vh",
                      cursor: "pointer",
                      marginTop:
                        this.state.cc || this.state.mypage ? "2vh" : "0",
                      color: this.state.mypage ? "rgba(245, 145, 45)" : "black",
                    }}
                  >
                    마이 페이지
                  </li>{" "}
                  <br />
                  <li
                    id="cc"
                    onClick={this.showCC.bind(this)}
                    style={{
                      cursor: "pointer",
                      fontSize: this.state.mypage ? "4vw" : "6vw",
                      marginBottom: this.state.mypage
                        ? "-5vh"
                        : this.state.cc
                        ? "10vh"
                        : "-2vh",
                      marginTop: this.state.cc ? "2vh" : "0",
                      color: this.state.cc ? "rgba(245, 145, 45)" : "black",
                    }}
                  >
                    고객 센터
                  </li>{" "}
                  <br />
                </ul>
                {/*마이페이지 하위 메뉴 */}
                <ul
                  className="mypage"
                  style={{
                    position: "fixed",
                    top: "51.5%",
                    right: "50%",
                    transform: "translate(50%)",
                    opacity: this.state.mypage ? "1" : "0",
                    pointerEvents: this.state.mypage ? "all" : "none",
                    transition: "all 1s",
                    textAlign: "center",
                  }}
                >
                  <NavLink to={"/mechelin/wishlist/" + this.state.userId}>
                    <li onClick={this.goAnotherPage.bind(this)}>위시 리스트</li>{" "}
                    <br /> <br />
                  </NavLink>
                  <NavLink to={"/mechelin/mypage/" + this.state.userId}>
                    <li onClick={this.goAnotherPage.bind(this)}>
                      회원 정보 수정
                    </li>{" "}
                    <br />
                  </NavLink>
                </ul>
                {/*고객센터 하위 메뉴 */}
                <ul
                  className="cc"
                  style={{
                    position: "fixed",
                    bottom: "25.5%",
                    right: "50%",
                    transform: "translate(50%)",
                    opacity: this.state.cc ? "1" : "0",
                    pointerEvents: this.state.cc ? "all" : "none",
                    transition: "all 1s",
                  }}
                >
                  <NavLink to={"/mechelin/faq/" + this.state.userId}>
                    <li onClick={this.goAnotherPage.bind(this)}>FAQ</li>
                    <br />
                    <br />
                  </NavLink>
                  <NavLink to={"/mechelin/qna/" + this.state.userId}>
                    <li onClick={this.goAnotherPage.bind(this)}>QnA</li> <br />
                  </NavLink>
                </ul>
              </span>
            )}
            {/*아래 링크 */}
            <div
              className="bottomMenu"
              style={{
                position: "fixed",
                bottom: "20%",
                height: "5vh",
                lineHeight: "5vh",
                textAlign: "center",
                width: "40vw",
              }}
            >
              <NavLink to="">
                <span
                  onClick={this.goAnotherPage.bind(this)}
                  style={{ color: "#999", cursor: "pointer" }}
                >
                  개인정보처리방침
                </span>
              </NavLink>{" "}
              ·{" "}
              <NavLink to="">
                <span
                  onClick={this.goAnotherPage.bind(this)}
                  style={{ color: "#999", cursor: "pointer" }}
                >
                  Copyright
                </span>
              </NavLink>{" "}
              ·{" "}
              <NavLink to="">
                <span
                  onClick={this.goAnotherPage.bind(this)}
                  style={{ color: "#999", cursor: "pointer" }}
                >
                  이용약관
                </span>
              </NavLink>{" "}
            </div>
            {/* 로그아웃 */}
            <NavLink to="/">
              <div
                className={
                  this.state.lock
                    ? "xi-lock-o xi-2x lock"
                    : "xi-unlock-o xi-2x unlock"
                }
                onClick={() => {
                  sessionStorage.clear();
                  localStorage.clear();
                }}
                style={{
                  position: "fixed",
                  right: "-25vw",
                  bottom: "25vh",
                }}
                onMouseOver={this.changeLock.bind(this)}
                onMouseLeave={this.changeLock.bind(this)}
              ></div>
            </NavLink>
          </div>
        </section>
      </div>
    );
  }
}
export default View;
