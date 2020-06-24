import React from "react";
import { NavLink, Route, BrowserRouter } from "react-router-dom";
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
  MyList,
} from "pages/index.js";
import "components/css/mainStyle.css";

//const textField = new MDCTextField(document.querySelector(".mdc-text-field"));
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
  };
  componentWillMount() {
    if (sessionStorage.getItem("userId") === null) {
      this.props.history.push("/");
    }
  }

  showMenu = () => {
    if (this.state.bar) {
      this.setState({ bar: false, search: "" });
    } else {
      this.setState({ bar: true });
    }
  };
  goAnotherPage = () => {
    this.setState({ bar: false, main: false });
  };
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
  showMypage = () => {
    if (!this.state.mypage) {
      this.setState({
        mypage: true,
      });
    } else {
      this.setState({
        mypage: false,
      });
    }
  };

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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
            style={{
              width: "100px",
              height: "100px",
              border: "1px solid #999",
              cursor: "pointer",
              background: "white",
              borderRadius: "50%",
              lineHeight: "100px",
              zIndex: "1",
              position: "fixed",
              left: "2%",
              top: "4%",
            }}
            onClick={() => {
              localStorage.removeItem("showMenu");
              this.setState({ main: true, bar: false });
            }}
          >
            로고 {/* <img src={} alt=""/> */}
          </div>
        </NavLink>

        {/* 삼항 연산자를 이용해 출력 페이지 변경 */}
        {this.state.main ? (
          <FullMap history={this.props.history} bar={this.state.bar} />
        ) : (
          ""
        )}
        <Route path="/mechelin/faq/:userId" component={FAQ} />
        <Route path="/mechelin/qna/:userId" component={QnA} />
        <Route path="/mechelin/mypage/:userId" component={MyPage} />
        <Route path="/mechelin/wishlist/:userId" component={WishList} />
        <Route path="/mechelin/newsfeed/:userId" component={NewsFeed} />
        <Route path="/mechelin/review/:userPlaceId" component={Review} />
        <Route path="/mechelin/timeline/:userId" component={Timeline} />
        <Route path="/mechelin/result/:userId" component={Result} />
        <Route path="/mechelin/mylist/:userId" component={MyList} />

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
                margin: "7vh auto 5vh ",
                lineHeight: "5vh",
                height: "5vh",
                width: "24vw",
                paddingLeft: "6px",
              }}
            >
              {" "}
              <input
                value={this.state.search}
                placeholder="검색"
                className="search"
                name="search"
                maxLength="100"
                onChange={this.changeInput.bind(this)}
                style={{
                  fontFamily: "Nanum Gothic Coding",
                  fontWeight: "normal",
                  display: "inline-block",
                  height: "5vh",
                  width: "20vw",
                  border: "2px solid rgba(245, 145, 45)",
                  borderRadius: "5px",
                  padding: "0 13px 0 10px",
                  marginLeft: "6px",
                }}
              ></input>
              <NavLink to={"/mechelin/result/" + this.state.userId}>
                <button
                  type="button"
                  className="btn xi-search"
                  onClick={() => {
                    this.setState({ main: false });
                  }}
                  style={{
                    margin: "-1px 0 0 -6px",
                    display: "inline-block",
                    width: "2.5vw",
                    height: "5vh",
                    padding: "0",
                    backgroundColor: "rgba(245,145,45)",
                    color: "white",
                    fontSize: "20px",
                  }}
                ></button>

                {/*각 페이지 이동 버튼 */}
              </NavLink>
            </div>
            <ul
              className="menu"
              style={{
                width: "40vw",
                height: "100vh",
                textAlign: "center",
                marginTop: "10vh",
              }}
            >
              <NavLink to={"/mechelin/newsfeed/" + this.state.userId}>
                <li onClick={this.goAnotherPage.bind(this)}>뉴스피드</li> <br />
              </NavLink>
              <NavLink to={"/mechelin/timeline/" + this.state.userId}>
                <li onClick={this.goAnotherPage.bind(this)}>타임라인</li> <br />
              </NavLink>

              <NavLink to={"/mechelin/mypage/" + this.state.userId}>
                <li
                  onClick={this.goAnotherPage.bind(this)}
                  onMouseOver={this.showMypage.bind(this)}
                >
                  마이페이지
                </li>{" "}
                <br />
              </NavLink>
            </ul>

            {/*마이페이지 하위 메뉴 */}
            <ul
              className="mypage"
              style={{
                position: "fixed",
                top: "28%",
                right: "-25%",
                opacity: this.state.mypage ? "1" : "0",
                pointerEvents: this.state.mypage ? "all" : "none",
                transition: "all 1s",
              }}
            >
              <NavLink to={"/mechelin/mylist/" + this.state.userId}>
                <li onClick={this.goAnotherPage.bind(this)}>나만의맛집</li>
                <br />
                <br />
              </NavLink>
              <NavLink to={"/mechelin/wishlist/" + this.state.userId}>
                <li onClick={this.goAnotherPage.bind(this)}>위시리스트</li>{" "}
                <br />
              </NavLink>
            </ul>

            {/*아래 링크 */}
            <div
              className="bottomMenu"
              style={{
                position: "absolute",
                bottom: "25%",
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
              ·{" "}
              <NavLink to={"/mechelin/faq/" + this.state.userId}>
                <span
                  onClick={this.goAnotherPage.bind(this)}
                  style={{ color: "#999", cursor: "pointer" }}
                >
                  고객센터
                </span>
              </NavLink>
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
                  bottom: "35vh",
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
