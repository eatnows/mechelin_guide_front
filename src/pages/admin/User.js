import React from "react";
import Axios from "util/axios";
import { Pagination } from "antd";
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], dataCount: 10, startPage: 0, totalCount: "" };
  }
  componentWillMount() {
    this.props.getState(false);
    this.getList();
    this.showPage();
  }

  /*전체 데이터 개수 */
  showPage = () => {
    const url = "/admin/usercount";
    Axios.get(url)
      .then((res) => {
        this.setState({
          totalCount: res.data,
        });
        console.log(this.state.totalCount);
      })
      .catch((err) => {
        console.log("user count 받아오기 에러:" + err);
      });
  };
  /*10개씩 데이터 출력 */
  getList = () => {
    const url =
      "/admin/user?startPage=" +
      this.state.startPage +
      "&dataCount=" +
      this.state.dataCount;
    Axios.get(url)
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("list 출력 에러:" + err);
      });
  };
  /*페이지 바뀔 때마다 실행 */

  nextPage = (e) => {
    this.setState({
      startPage: (e - 1) * this.state.dataCount,
    });
    console.log(this.state.startPage);
    this.getList();
  };

  render() {
    return (
      <div>
        <form
          style={{
            height: "auto",
            width: "1000px",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            textAlign: "center",
          }}
        >
          <caption
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              width: "100px",
              color: "rgba(245,145,45)",
            }}
          >
            유저 목록
          </caption>{" "}
          <br />
          <table>
            <thead>
              <tr
                style={{
                  border: "1px solid rgba(0,0,0,.2)",
                  textAlign: "center",
                  height: "50px",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                <th style={{ width: "80px", fontWeight: "bold" }}>구분</th>
                <th style={{ width: "100px", fontWeight: "bold" }}>
                  유저 번호
                </th>
                <th style={{ width: "100px", fontWeight: "bold" }}>프로필</th>
                <th style={{ width: "100px", fontWeight: "bold" }}>닉네임</th>
                <th style={{ width: "100px", fontWeight: "bold" }}>이메일</th>
                <th style={{ width: "300px", fontWeight: "bold" }}>소개글</th>
                <th style={{ width: "200px", fontWeight: "bold" }}>가입일</th>
                <th style={{ width: "100px", fontWeight: "bold" }}>권한</th>
                <th style={{ width: "120px", fontWeight: "bold" }}>
                  탈퇴 여부
                </th>
              </tr>
            </thead>
            <tbody>
              {[...this.state.data].map((row, i) => {
                return (
                  <tr
                    key={i}
                    style={{
                      border: "1px solid rgba(0,0,0,.2)",
                      textAlign: "center",
                    }}
                  >
                    <td>{i + 1}</td>
                    <td>{row.id}</td>
                    <td>
                      <img
                        src={row.profile_url}
                        alt=""
                        style={{
                          borderRadius: "50%",
                          width: "50px",
                          height: "50px",
                          padding: "5px",
                        }}
                      />
                    </td>
                    <td>{row.nickname}</td>
                    <td>{row.email}</td>
                    <td>{row.introduce}</td>
                    <td>{row.created_at}</td>
                    <td>{row.authority === "ROLE_MEMBER" ? "일반" : "정지"}</td>
                    <td>{row.dropuser === "1" ? "탈퇴" : ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br />
          <br />
          <Pagination
            size="small"
            ref="page"
            total={this.state.totalCount}
            onChange={this.nextPage.bind(this)}
          />
        </form>
      </div>
    );
  }
}
export default User;
