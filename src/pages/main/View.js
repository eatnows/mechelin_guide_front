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
class View extends React.Component {
  state = {
    main: true,
    section: false,
    bar: false,
    userId: sessionStorage.getItem("userId"),
  };
  componentWillMount() {
    if (sessionStorage.getItem("userId") === null) {
      this.props.history.push("/");
    }
  }
  render() {
    const garoStyle = {
      display: "inline-block",
      width: "10vw",
      height: "7vh",
      borderRight: "1px solid white",
      lineHeight: "7vh",
      color: "white",
      fontWeight: "normal",
      fontSize: "15px",
      textAlign: "center",
      cursor: "pointer",
    };
    const activeStyle = {
      color: "white",
    };

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
        <div
          className={
            this.state.bar
              ? "xi-close barIcon xi-2x closeBar"
              : "xi-bars barIcon xi-2x openBar"
          }
          onClick={() => {
            if (this.state.bar) {
              this.setState({ bar: false });
            } else {
              this.setState({ bar: true });
            }
          }}
          style={{
            color: "rgba(245,145,45)",
            height: "6vh",
            width: "6vh",
            backgroundColor: "white",
            position: "absolute",
            top: "6%",
            right: "2%",
            textAlign: "center",
            borderRadius: "50%",
            lineHeight: "6vh",
            cursor: "pointer",
            zIndex: "9999",
            transition: "all 1s",
            transform: "rotate(180deg)",
            border: this.state.bar ? "1px solid rgba(245,145,45)" : "none",
          }}
        ></div>
        <section>
          <div className={this.state.bar ? "barSection" : "defaultBar"}></div>
          <div
            style={{
              opacity: this.state.bar ? "1" : "0",
              transition: "all 0.3s ease .4s",
              position: "absolute",
            }}
          >
            <div className="searchBar">
              <input
                type="text"
                className="form-control"
                placeholder="search"
                style={{
                  float: "left",
                  margin: "7.5vh 0 0 15vw",
                  width: "20vw",
                }}
              />
              <NavLink to={"/mechelin/result/" + this.state.userId}>
                <button
                  type="button"
                  className="btn xi-search"
                  onClick={() => {
                    this.setState({ main: false });
                  }}
                  style={{
                    margin: "7.5vh 15vw 0 0",
                    float: "left",
                    width: "3vw",
                    height: "35px",
                    padding: 0,
                    backgroundColor: "rgba(245,145,45)",
                    color: "white",
                    fontSize: "20px",
                  }}
                ></button>
              </NavLink>
            </div>
            <ul
              style={{
                width: "15vw",
                height: "100vh",
                textAlign: "center",
                fontSize: "15px",
                color: "rgba(245,145,45)",
                lineHeight: "7vh",
              }}
            >
              <NavLink to={"/mechelin/mylist/" + this.state.userId}>
                <li
                  style={{
                    marginBottom: "2vh",
                    height: "7vh",
                    width: "10vw",
                  }}
                >
                  나만의맛집
                </li>
              </NavLink>
              <NavLink to={"/mechelin/newsfeed/" + this.state.userId}>
                <li
                  style={{
                    marginBottom: "2vh",
                    width: "10vw",
                    height: "7vh",
                  }}
                >
                  뉴스피드
                </li>
              </NavLink>
              <NavLink to={"/mechelin/timeline/" + this.state.userId}>
                <li
                  style={{
                    marginBottom: "2vh",
                    width: "10vw",
                    height: "7vh",
                  }}
                >
                  타임라인
                </li>
              </NavLink>
              <NavLink to={"/mechelin/wishlist/" + this.state.userId}>
                <li
                  style={{
                    marginBottom: "2vh",
                    width: "10vw",
                    height: "7vh",
                  }}
                >
                  위시리스트
                </li>
              </NavLink>
              <NavLink to={"/mechelin/mypage/" + this.state.userId}>
                <li
                  style={{
                    marginBottom: "2vh",
                    width: "10vw",
                    height: "7vh",
                  }}
                >
                  마이페이지
                </li>
              </NavLink>
              <NavLink to="/">
                <li
                  style={{
                    marginBottom: "2vh",
                    width: "10vw",
                    height: "7vh",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    sessionStorage.clear();
                    localStorage.clear();
                  }}
                >
                  로그아웃
                </li>
              </NavLink>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}
export default View;
