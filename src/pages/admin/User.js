import React, { useState, useEffect } from "react";
import Axios from "util/axios";
import { Pagination, Menu, Dropdown, Input } from "antd";
import Search from "antd/lib/input/Search";
import { DownOutlined } from "@ant-design/icons";

const User = (props) => {
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(10);
  const [startPage, setStartPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    props.getState(false);
    showPageCount();
    getList();
  }, []);

  useEffect(() => {
    getList();
  }, [startPage]);

  /*user 검색 */
  const searchUser = (v, e) => {
    e.preventDefault();
    if (v === "") {
      getList();
    } else {
      setSearchData(v);
      const url =
        "/admin/searchdata?searchData=" +
        v +
        "&startPage=" +
        startPage +
        "&dataCount=" +
        dataCount;

      Axios.get(url)
        .then((res) => {
          setData(res.data);
          setTotalCount(data.length);
        })
        .catch((err) => {
          console.log("search result error:" + err);
        });
    }
  };

  /* */
  const sortAuthority = (e) => {
    const url = "/admin/sortdata";
    Axios.get(url)
      .then((res) => {
        setData(res.data);
        setTotalCount(data.length);
      })
      .catch((err) => {
        console.log("sort authority 에러:" + err);
      });
    console.log(e);
  };

  const authorityMenu = (
    <Menu style={{ textAlign: "center" }} onClick={sortAuthority}>
      <Menu.Item key="0">
        <span style={{ cursor: "pointer", fontSize: "12px" }}>전체 보기</span>
      </Menu.Item>
      <br />
      <Menu.Item key="1">
        <span style={{ cursor: "pointer", fontSize: "12px" }}>일반</span>
      </Menu.Item>
      <br />
      <Menu.Item key="2">
        <span style={{ cursor: "pointer", fontSize: "12px" }}>정지</span>
      </Menu.Item>
    </Menu>
  );
  const dropUserMenu = (
    <Menu style={{ textAlign: "center" }}>
      <Menu.Item key="0">
        <span style={{ cursor: "pointer", fontSize: "12px" }}>전체 보기</span>
      </Menu.Item>
      <br />
      <Menu.Item key="1">
        <span style={{ cursor: "pointer", fontSize: "12px" }}>탈퇴</span>
      </Menu.Item>
    </Menu>
  );

  /*전체 데이터 개수 */
  const showPageCount = () => {
    const url = "/admin/usercount";
    Axios.get(url)
      .then((res) => {
        setTotalCount(res.data);
        console.log(totalCount);
      })
      .catch((err) => {
        console.log("user count 받아오기 에러:" + err);
      });
  };

  /*10개씩 데이터 출력 */
  const getList = () => {
    console.log("실행");
    const url =
      "/admin/user?startPage=" + startPage + "&dataCount=" + dataCount;
    Axios.get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("list 출력 에러:" + err);
      });
    console.log("겟리스트");
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
            marginBottom: "10px",
            float: "left",
          }}
        >
          유저 목록
        </caption>{" "}
        <Search
          placeholder="검색"
          onSearch={searchUser}
          style={{ width: 200, marginTop: "30px", float: "right" }}
        />
        <div style={{ float: "left", clear: "both", marginBottom: "10px" }}>
          <span>
            {" "}
            <Dropdown overlay={authorityMenu} trigger={["click"]}>
              <span
                className="ant-dropdown-link"
                style={{ cursor: "pointer", color: "rgba(0,0,0,.8)" }}
              >
                권한 <DownOutlined />
              </span>
            </Dropdown>
            &nbsp; &nbsp; &nbsp; {"       "}
            <Dropdown overlay={dropUserMenu} trigger={["click"]}>
              <span
                className="ant-dropdown-link"
                // onClick={handleMenuClick}
                style={{ cursor: "pointer", color: "rgba(0,0,0,.8)" }}
              >
                탈퇴 여부 <DownOutlined />
              </span>
            </Dropdown>
          </span>
        </div>
        <br />
        <table style={{ clear: "both" }}>
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
              <th style={{ width: "100px", fontWeight: "bold" }}>유저 번호</th>
              <th style={{ width: "100px", fontWeight: "bold" }}>프로필</th>
              <th style={{ width: "100px", fontWeight: "bold" }}>닉네임</th>
              <th style={{ width: "100px", fontWeight: "bold" }}>이메일</th>
              <th style={{ width: "300px", fontWeight: "bold" }}>소개글</th>
              <th style={{ width: "200px", fontWeight: "bold" }}>가입일</th>
              <th style={{ width: "100px", fontWeight: "bold" }}>권한</th>
              <th style={{ width: "120px", fontWeight: "bold" }}>탈퇴 여부</th>
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
                  <td>
                    <img
                      src={row.profile_url}
                      alt=""
                      style={{
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
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
        <Pagination size="small" total={totalCount} onChange={nextPage} />
      </form>
    </div>
  );
};

export default User;
