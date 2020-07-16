import React, { useState, useEffect } from "react";
import Axios from "util/axios";
import { Pagination, Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const Report = (props) => {
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(5);
  const [startPage, setStartPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    props.getState(false);
    showPageCount();
    getList();
  }, []);

  useEffect(() => {
    getList();
  }, [startPage]);

  /*권한 정렬 */
  const sortCreatedAt = (e) => {
    console.log(e.key);
    if (e.key === "0") {
      showPageCount();
      getList();
    } else {
      const url =
        "/admin/report/sortdata?startPage=" +
        startPage +
        "&dataCount=" +
        dataCount;
      Axios.get(url)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log("sort created_at 에러:" + err);
        });
    }
  };

  const authorityMenu = (
    <Menu style={{ textAlign: "center" }} onClick={sortCreatedAt}>
      <Menu.Item key="0">
        <span style={{ cursor: "pointer", fontSize: "12px" }}>과거순</span>
      </Menu.Item>
      <br />
      <Menu.Item key="1">
        <span style={{ cursor: "pointer", fontSize: "12px" }}>최신순</span>
      </Menu.Item>
    </Menu>
  );

  /*전체 데이터 개수 */
  const showPageCount = () => {
    const url = "/admin/reportcount";
    Axios.get(url)
      .then((res) => {
        setTotalCount(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("report count 받아오기 에러:" + err);
      });
  };

  /*10개씩 데이터 출력 */
  const getList = () => {
    console.log("실행");
    const url =
      "/admin/report?startPage=" + startPage + "&dataCount=" + dataCount;
    Axios.get(url)
      .then((res) => {
        setData(res.data);
        console.log("겟리스트");
      })
      .catch((err) => {
        console.log("list 출력 에러:" + err);
      });
  };

  /*제재 상태 변경 */
  const changeAuthority = (e) => {
    console.log(e.target.getAttribute("id"));
    const url =
      "/admin/report/changeauthority?&id=" +
      e.target.getAttribute("reportedUserId");
    Axios.get(url)
      .then((res) => {
        getList();
      })
      .catch((err) => {
        console.log("list 출력 에러:" + err);
      });
  };

  /*신고글 삭제*/
  const deleteReport = (e) => {
    const url =
      "/admin/report/deletereport?id=" + e.target.getAttribute("reportId");
    Axios.get(url)
      .then((res) => {
        showPageCount();
        getList();
        console.log("삭제완료");
      })
      .catch((err) => {
        console.log("list 출력 에러:" + err);
      });
  };

  /*페이지 바뀔 때마다 실행 */
  const nextPage = (e) => {
    setStartPage((e - 1) * dataCount);
    console.log(startPage);
  };

  return (
    <div>
      <form
        style={{
          height: "auto",
          width: "1000px",
          position: "absolute",
          left: "50%",
          top: "4vw",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <caption
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            width: "200px",
            color: "rgba(245,145,45)",
          }}
        >
          신고된 글 목록
        </caption>{" "}
        <span style={{ position: "absolute", top: "1.5vw", right: "0" }}>
          {" "}
          <Dropdown overlay={authorityMenu} trigger={["click"]}>
            <span
              className="ant-dropdown-link"
              style={{ cursor: "pointer", color: "rgba(0,0,0,.8)" }}
            >
              시간순 <DownOutlined />
            </span>
          </Dropdown>
        </span>
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
              <th style={{ width: "70px", fontWeight: "bold" }}>구분</th>
              <th style={{ width: "100px", fontWeight: "bold" }}>신고 번호</th>
              <th
                style={{
                  padding: "10px 0",
                  width: "120px",
                  fontWeight: "bold",
                }}
              >
                신고한
                <br />
                유저 번호
              </th>
              <th style={{ width: "120px", fontWeight: "bold" }}>
                신고당한
                <br />
                유저 번호
              </th>
              <th style={{ width: "120px", fontWeight: "bold" }}>
                해당 글 번호
              </th>
              <th style={{ width: "300px", fontWeight: "bold" }}>신고 사유</th>
              <th style={{ width: "200px", fontWeight: "bold" }}>신고 날짜</th>
              <th style={{ width: "150px", fontWeight: "bold" }}>제재/삭제</th>
            </tr>
          </thead>
          <tbody>
            {[...data].map((row, i) => {
              return (
                <tr
                  key={i}
                  style={{
                    border: "1px solid rgba(0,0,0,.2)",
                    textAlign: "center",
                  }}
                >
                  <td>{startPage + i + 1}</td>
                  <td>{row.id}</td>
                  <td>{row.register_user_id}</td>
                  <td>{row.reported_user_id}</td>
                  <td>
                    <NavLink to={`/mechelin/review/` + row.post_id}>
                      {row.post_id}
                    </NavLink>
                  </td>
                  <td>{row.content}</td>
                  <td>{row.created_at}</td>
                  <td style={{}}>
                    <button
                      className="btn"
                      onClick={changeAuthority}
                      reportedUserId={row.reported_user_id}
                      style={{
                        color:
                          row.authority === "ROLE_BAN"
                            ? "rgba(0,0,0,.5)"
                            : "rgba(245,145,45)",
                        margin: "5px",
                        pointerEvents:
                          row.authority === "ROLE_BAN" ? "none" : "auto",
                      }}
                    >
                      {row.authority === "ROLE_BAN" ? "제재 완료" : "제재하기"}
                    </button>
                    <br />
                    <button
                      type="button"
                      onClick={deleteReport}
                      reportId={row.id}
                      className="btn"
                      style={{ color: "rgba(245,145,45)", marginBottom: "5px" }}
                    >
                      삭제하기
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
      <Pagination
        size="small"
        total={totalCount}
        onChange={nextPage}
        style={{
          position: "absolute",
          bottom: "4vw",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
};

export default Report;
