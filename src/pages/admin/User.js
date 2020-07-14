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
  const [sorting, setSorting] = useState("0");
  const [filtering, setFiltering] = useState("0");
  useEffect(() => {
    props.getState(false);
    showPageCount();
    getList();
  }, []);

  useEffect(() => {
    if (sorting === "0") {
      if (filtering !== "0") {
        filterDropUser(filtering);
      } else {
        getList();
      }
    } else {
      if (filtering !== "0") {
        filterDropUser(filtering);
      } else {
        sortAuthority(sorting);
      }
    }
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

  /*권한 정렬 */
  const sortAuthority = (e) => {
    console.log(e.key);
    if (e.key === "0") {
      showPageCount();
      getList();
      setSorting("0");
    } else {
      const value = e.key !== "1" || "2" ? sorting : e.key;
      const url =
        "/admin/sortdata?sorting=" +
        value +
        "&startPage=" +
        startPage +
        "&dataCount=" +
        dataCount;
      Axios.get(url)
        .then((res) => {
          setData(res.data);
          if (e.key === "1") {
            setSorting("1");
          } else if (e.key === "2") {
            setSorting("2");
          } else {
            setSorting(e);
          }
        })
        .catch((err) => {
          console.log("sort authority 에러:" + err);
        });
    }
  };

  /*탈퇴 여부 필터링 */
  const filterDropUser = (e) => {
    console.log(e.key);
    if (e.key === "0") {
      showPageCount();
      getList();
      setFiltering("0");
    } else {
      const value = e.key !== "1" || "2" ? filtering : e.key;
      const url =
        "/admin/filterdata?sorting=" +
        sorting +
        "&filtering=" +
        value +
        "&startPage=" +
        startPage +
        "&dataCount=" +
        dataCount;
      Axios.get(url)
        .then((res) => {
          setData(res.data);
          setTotalCount(data.length);
          if (e.key === "1") {
            setFiltering("1");
          } else if (e.key === "2") {
            setFiltering("2");
          } else {
            setFiltering(e);
          }
        })
        .catch((err) => {
          console.log("filter data 에러:" + err);
        });
    }
  };

  const authorityMenu = (
    <Menu style={{ textAlign: "center" }} onClick={sortAuthority}>
      <Menu.Item key="0">
        <span style={{ cursor: "pointer", fontSize: "12px" }}>기본</span>
      </Menu.Item>
      <br />
      <Menu.Item key="1">
        <span style={{ cursor: "pointer", fontSize: "12px" }}>내림차순</span>
      </Menu.Item>
      <br />
      <Menu.Item key="2">
        <span style={{ cursor: "pointer", fontSize: "12px" }}>오름차순</span>
      </Menu.Item>
    </Menu>
  );
  const dropUserMenu = (
    <Menu style={{ textAlign: "center" }} onClick={filterDropUser}>
      <Menu.Item key="0">
        <span style={{ cursor: "pointer", fontSize: "12px" }}>전체 보기</span>
      </Menu.Item>
      <br />
      <Menu.Item key="1">
        <span style={{ cursor: "pointer", fontSize: "12px" }}>탈퇴</span>
      </Menu.Item>
      <Menu.Item key="2">
        <span style={{ cursor: "pointer", fontSize: "12px" }}>정상</span>
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
          top: "4vw",
          transform: "translateX(-50%)",
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

export default User;
