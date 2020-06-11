import React from "react";
import { NavLink } from "react-router-dom";
import "components/css/allStyle.css";
class Welcome extends React.Component {
  render() {
    return (
      <div
        style={{
          textAlign: "center",
          fontFamily: "BBTreeGR",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            width: "100px",
            height: "100px",
            border: "1px solid #999",
            marginTop: "20vh",
          }}
        >
          logo
        </div>
        <h2 style={{ fontFamily: "BBTreeGL", marginTop: "10vh" }}>
          <span
            style={{
              fontWeight: "bold",
              color: "rgba(245,145,45)",
            }}
          >
            내슐랭 가이드
          </span>
          에 오신 것을 환영합니다!
        </h2>
        <br />
        <br />
        <h4>
          이제 나만의 맛집 지도를 만들고, <br />
          <br />
          밥친구와 함께 공유할 수 있습니다.
        </h4>
        <br />
        <br />
        <NavLink to="/Login">
          <button
            type="button"
            className="btn"
            style={{
              backgroundColor: "rgba(245,145,45)",
              color: "white",
              height: "50px",
              width: "300px",
              fontSize: "20px",
              margin: "0 auto",
            }}
          >
            시작하기
          </button>
        </NavLink>
      </div>
    );
  }
}
export default Welcome;
