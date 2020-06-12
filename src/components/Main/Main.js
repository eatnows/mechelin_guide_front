import { NavLink } from "react-router-dom";

class Main extends React.Component {
  render() {
    const style = {
      display: "inline-block",
      width: "10vw",
      height: "10vh",
      borderRight: "1px solid white",
      lineHeight: "7vh",
      color: "white",
      fontWeight: "normal",
      fontSize: "15px",
      textAlign: "center",
    };
    return (
      <div>
        <div
          className="logo"
          style={{
            margin: "5vh 0 0 5vw",
            float: "left",
            width: "100px",
            height: "100px",
            border: "1px solid #999",
          }}
        >
          로고 {/* <img src={} alt=""/> */}
        </div>
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
          <button
            type="button"
            className="btn xi-search"
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
            <li>
              <NavLink to="">
                <div style={style}>뉴스피드</div>
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="">
                <div style={style}>타임라인</div>
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="">
                <div style={style}>위시리스트</div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
export default Main;
