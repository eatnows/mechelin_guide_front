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
  MyList,
} from "pages/index.js";
import "components/css/mainStyle.css";
import { MDCTextField } from "@material/textfield";

//const textField = new MDCTextField(document.querySelector(".mdc-text-field"));
class View extends React.Component {
  state = {
    main: true,
    section: false,
    bar: false,
    userId: sessionStorage.getItem("userId"),
    name: "",
    displayLabel: true,
    outline: false,
    search: "",
    lock: true,
    mypage: false,
  };
  componentWillMount() {
    if (sessionStorage.getItem("userId") === null) {
      this.props.history.push("/");
    }
  }
  clickInput = () => {
    if (!this.state.outline) {
      this.setState({
        outline: true,
        displayLabel: false,
      });
    } else {
      this.setState({
        outline: false,
        displayLabel: true,
      });
    }
  };
  showMenu = () => {
    if (this.state.bar) {
      this.setState({ bar: false });
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
        <NavLink to={"/mechelin/" + this.state.userId}>
          <div
            className="logo"
            style={{
              margin: "5vh 0 0 5vw",
              float: "left",
              width: "100px",
              height: "100px",
              border: "1px solid #999",
              cursor: "pointer",
              background: "white",
              borderRadius: "50%",
              lineHeight: "100px",
            }}
            onClick={() => {
              this.setState({ main: true });
            }}
          >
            로고 {/* <img src={} alt=""/> */}
          </div>
        </NavLink>

        {/* 삼항 연산자를 이용해 출력 페이지 변경 */}
        {this.state.main ? <FullMap /> : ""}
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
            zIndex: "9999",
            position: "fixed",
          }}
        ></div>
        {/*하단 메뉴바 */}
        <div
          style={{
            opacity: this.state.bar ? "0" : "1",
            transition: "all 1s ease 0.5s",
          }}
        >
          <div className="menuBall xi-caret-up xi-2x"></div>
          <div className="subMenuBall">
            <div>필터</div>
            <div>리뷰 등록</div>
            <div>DM</div>
            <div>친구 추가</div>
          </div>
        </div>
        {/* 메뉴 화면 */}
        <section style={{ zIndex: "10" }}>
          {/* 배경설정 */}
          <div className={this.state.bar ? "barSection" : "defaultBar"}></div>
          <div
            className="inner"
            style={{
              opacity: this.state.bar ? "1" : "0",
              transition: "all 0.3s ease .4s",
              position: "absolute",
              left: "50%",
              transform: "translate(-50%)",
            }}
          >
            {/* 검색창 */}
            <div
              className="searchBar"
              style={{
                margin: "7vh auto 5vh",
                lineHeight: "5vh",
                height: "5vh",
                width: "24vw",
              }}
            >
              {" "}
              <label
                class={
                  this.state.outline
                    ? "mdc-text-field mdc-text-field--outlined outline"
                    : "mdc-text-field mdc-text-field--outlined"
                }
                style={{
                  display: "inline-block",
                  height: "5vh",
                  width: "20vw",
                }}
              >
                <input
                  type="text"
                  class="mdc-text-field__input"
                  aria-labelledby="my-label-id"
                  name="search"
                  onFocus={this.clickInput.bind(this)}
                  onBlur={this.clickInput.bind(this)}
                  onChange={this.changeInput.bind(this)}
                />
                <span class="mdc-notched-outline ">
                  <span class="mdc-notched-outline__leading"></span>
                  <span class="mdc-notched-outline__notch">
                    {this.state.displayLabel ? (
                      <span
                        class="mdc-floating-label"
                        id="my-label-id"
                        style={{ fontSize: "10pt", lineHeight: "5vh" }}
                      >
                        검색{" "}
                      </span>
                    ) : (
                      ""
                    )}
                  </span>
                  <span class="mdc-notched-outline__trailing"></span>
                </span>
              </label>
              <NavLink to={"/mechelin/result/" + this.state.userId}>
                <button
                  type="button"
                  className="btn xi-search"
                  onClick={() => {
                    this.setState({ main: false });
                  }}
                  style={{
                    display: "inline-block",
                    width: "3vw",
                    height: "5vh",
                    padding: 0,
                    backgroundColor: "rgba(245,145,45)",
                    color: "white",
                    fontSize: "20px",
                  }}
                ></button>
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

            <ul
              className="mypage"
              style={{
                position: "fixed",
                top: "29%",
                right: "-25%",
                opacity: this.state.mypage ? "1" : "0",
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
