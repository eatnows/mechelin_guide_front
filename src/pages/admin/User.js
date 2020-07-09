import React from "react";
import Axios from "util/axios";
import { Pagination } from "antd";
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  componentWillMount() {
    this.props.getState(false);
    this.getList();
  }
  getList = () => {
    const url = "/admin/user";
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
  render() {
    return (
      <div>
        <form
          style={{
            height: "550px",
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
          </caption>
          <table>
            <thead>
              <tr
                style={{
                  border: "1px solid rgba(0,0,0,.2)",
                  textAlign: "center",
                }}
              >
                <th style={{ width: "100px", fontWeight: "bold" }}>번호</th>
                <th style={{ width: "100px", fontWeight: "bold" }}>프로필</th>
                <th style={{ width: "100px", fontWeight: "bold" }}>닉네임</th>
                <th style={{ width: "100px", fontWeight: "bold" }}>이메일</th>
                <th style={{ width: "100px", fontWeight: "bold" }}>소개글</th>
                <th style={{ width: "100px", fontWeight: "bold" }}>가입일</th>
                <th style={{ width: "100px", fontWeight: "bold" }}>
                  제재 상태
                </th>
                <th style={{ width: "100px", fontWeight: "bold" }}>
                  탈퇴 여부
                </th>
              </tr>
            </thead>
            <tbody>
              {[...this.state.data].map((row, i) => {
                return (
                  <tr
                    style={{
                      border: "1px solid rgba(0,0,0,.2)",
                      textAlign: "center",
                    }}
                  >
                    <td>{this.state.data.id}</td>
                    <td>{this.state.data.profile_url}</td>
                    <td>{this.state.data.nickname}</td>
                    <td>{this.state.data.email}</td>
                    <td>{this.state.data.introduce}</td>
                    <td>{this.state.data.create_at}</td>
                    <td>{this.state.data.authority}</td>
                    <td>{this.state.data.dropuser}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination size="small" total={50} />
        </form>
      </div>
    );
  }
}
export default User;
