import React from "react";
import { NavLink, Route } from "react-router-dom";
import FullMap from "pages/main/FullMap";
import FAQ from "pages/customer_center/FAQ";
import QnA from "pages/customer_center/QnA";
import MyPage from "pages/mypage/MyPage";
import WishList from "pages/mypage/WishList";
import NewsFeed from "pages/post/NewsFeed";
import Review from "pages/post/Review";
import Timeline from "pages/post/Timeline";
import Result from "pages/search/Result";

class View extends React.Component {
  state = { main: true, section: false, bar: false };
  render() {
    const garoStyle = {
      display: "inline-block",
      width: "10vw",
      height: "10vh",
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
        <NavLink to="/">
          <div
            className="logo"
            style={{
              margin: "5vh 0 0 5vw",
              float: "left",
              width: "100px",
              height: "100px",
              border: "1px solid #999",
              cursor: "pointer",
            }}
            onClick={() => {
              this.setState({ main: true });
            }}
          >
            로고 {/* <img src={} alt=""/> */}
          </div>
        </NavLink>
        <div>
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
          <NavLink to="/result">
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
        <nav style={{ float: "right" }}>
          <ul
            style={{
              width: "30vw",
              height: "7vh",
              backgroundColor: "rgba(245,145,45)",
              borderRadius: "10px",
              margin: "5vh 5vw 0 0",
            }}
          >
            <NavLink to="/newsfeed">
              <li>
                <div
                  onClick={() => {
                    this.setState({ main: false });
                  }}
                  style={garoStyle}
                >
                  뉴스피드
                </div>
              </li>
            </NavLink>
            <NavLink to="/timeline">
              <li>
                <div
                  onClick={() => {
                    this.setState({ main: false });
                  }}
                  style={garoStyle}
                >
                  타임라인
                </div>
              </li>
            </NavLink>
            <NavLink to="/wishlist">
              <li>
                <div
                  onClick={() => {
                    this.setState({ main: false });
                  }}
                  style={garoStyle}
                >
                  위시리스트
                </div>
              </li>
            </NavLink>
          </ul>
        </nav>
        {/* 삼항 연산자를 이용해 출력 페이지 변경 */}
        {this.state.main ? <FullMap /> : ""}
        <Route path="/faq" component={FAQ} />
        <Route path="/qna" component={QnA} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/wishlist" component={WishList} />
        <Route path="/newsfeed" component={NewsFeed} />
        <Route path="/review" component={Review} />
        <Route path="/timeline" component={Timeline} />
        <Route path="/result" component={Result} />
        <div
          className="bottomBar"
          style={{
            width: "100%",
            height: "5vh",
            backgroundColor: "rgba(245,145,45)",
            color: "white",
            position: "absolute",
            bottom: "0%",
          }}
        >
          <div
            style={{
              height: "5vh",
              width: "5vw",
              lineHeight: "5vh",
              float: "left",
            }}
          >
            로고
          </div>

          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              height: "5vh",
              lineHeight: "5vh",
              clear: "both",
              bottom: "0",
              color: "white",
            }}
          >
            <NavLink to="" activeStyle={activeStyle}>
              <span
                onClick={() => {
                  this.setState({ main: false });
                }}
                style={{ cursor: "pointer" }}
              >
                개인정보처리방침
              </span>
            </NavLink>{" "}
            ·{" "}
            <NavLink to="" activeStyle={activeStyle}>
              <span
                onClick={() => {
                  this.setState({ main: false });
                }}
                style={{ cursor: "pointer" }}
              >
                Copyright
              </span>
            </NavLink>{" "}
            ·{" "}
            <NavLink to="" activeStyle={activeStyle}>
              <span
                onClick={() => {
                  this.setState({ main: false });
                }}
                style={{ cursor: "pointer" }}
              >
                이용약관
              </span>
            </NavLink>{" "}
            ·{" "}
            <NavLink to="/faq" activeStyle={activeStyle}>
              <span
                onClick={() => {
                  this.setState({ main: false });
                }}
                style={{ cursor: "pointer" }}
              >
                고객센터
              </span>
            </NavLink>
          </div>
          <div
            className="xi-bars xi-2x"
            onClick={() => {
              this.setState({ bar: true });
            }}
            style={{
              color: "white",
              height: "5vh",
              width: "4vw",
              float: "right",
              textAlign: "center",
              lineHeight: "5vh",
              cursor: "pointer",
            }}
          ></div>
        </div>
        {this.state.bar ? (
          <section
            style={{
              width: "15vw",
              height: "100vh",
              backgroundColor: "white",
              border: "1px solid #999",
              position: "absolute",
              bottom: "5vh",
              right: "0",
            }}
          >
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
              <li
                style={{
                  marginBottom: "2vh",
                  height: "7vh",
                  width: "10vw",
                }}
              >
                나만의맛집
              </li>
              <li
                style={{
                  marginBottom: "2vh",
                  width: "10vw",
                  height: "7vh",
                }}
              >
                뉴스피드
              </li>
              <li
                style={{
                  marginBottom: "2vh",
                  width: "10vw",
                  height: "7vh",
                }}
              >
                타임라인
              </li>
              <li
                style={{
                  marginBottom: "2vh",
                  width: "10vw",
                  height: "7vh",
                }}
              >
                위시리스트
              </li>
              <li
                style={{
                  marginBottom: "2vh",
                  width: "10vw",
                  height: "7vh",
                }}
              >
                마이페이지
              </li>
              <li
                style={{
                  marginBottom: "2vh",
                  width: "10vw",
                  height: "7vh",
                }}
              >
                로그아웃
              </li>
            </ul>
          </section>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default View;
