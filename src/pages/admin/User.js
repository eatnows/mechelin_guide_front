import React, { useState, useEffect } from "react";
import Axios from "util/axios";
import { Pagination, Dropdown, Cascader } from "antd";
import Search from "antd/lib/input/Search";
import { DownOutlined } from "@ant-design/icons";
let sorting;
let filtering;
let key;
let startPage;
const User = (props) => {
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [option, setOption] = useState([]);
  const [showDropMenu_A, setShowDropMenu_A] = useState(false);
  const [showDropMenu_B, setShowDropMenu_B] = useState(false);
  useEffect(() => {
    startPage = 0;
    props.getState(false);
    showPageCount();
    getList();
    sorting = 0;
    filtering = 0;
    key = 0;
  }, []);

  const options = [
    {
      value: "id",
      label: "유저 번호",
    },
    {
      value: "email",
      label: "이메일",
    },
    {
      value: "created_at",
      label: "가입일",
    },
  ];

  const changeOptions = (v) => {
    setOption(v[0]);
    console.log(option);
  };

  /*user 검색 */
  const searchUser = (v, e) => {
    e.preventDefault();
    if (v === "") {
      getList();
    } else {
      const url =
        "/admin/searchdata?option=" +
        option +
        "&searchData=" +
        v +
        "&startPage=" +
        startPage +
        "&dataCount=" +
        dataCount;
      Axios.get(url)
        .then((res) => {
          setTotalCount(data.length);
          setData(res.data);
        })
        .catch((err) => {
          console.log("search result error:" + err);
        });
    }
  };

  /*권한 정렬 */
  const sortAuthority = (e) => {
    key = e.target.getAttribute("num");
    console.log(typeof key);
    startPage = 0;
    sorting = 0;
    filtering = 0;
    if (key === "0") {
      showPageCount();
      getList();
    } else {
      const url =
        "/admin/sortdata?sorting=" +
        key +
        "&startPage=" +
        startPage +
        "&dataCount=" +
        dataCount;
      Axios.get(url)
        .then((res) => {
          setData(res.data);
          sorting = key;
        })
        .catch((err) => {
          console.log("sort authority 에러:" + err);
        });
    }
  };

  /*탈퇴 여부 필터링 */
  const filterDropUser = (e) => {
    key = e.target.getAttribute("num");
    sorting = 0;
    filtering = 0;
    startPage = 0;
    if (key === "0") {
      showPageCount();
      getList();
    } else {
      const url =
        "/admin/filterdata?filtering=" +
        key +
        "&startPage=" +
        startPage +
        "&dataCount=" +
        dataCount;
      Axios.get(url)
        .then((res) => {
          filtering = key;
          showFilteredUserCount();
          setData(res.data);
        })
        .catch((err) => {
          console.log("filter data 에러:" + err);
        });
    }
  };

  /*전체 데이터 개수 */
  const showFilteredUserCount = () => {
    const url = "/admin/filteredusercount?filtering=" + filtering;
    Axios.get(url)
      .then((res) => {
        setTotalCount(res.data);
        console.log(totalCount);
      })
      .catch((err) => {
        console.log("filtered user count 받아오기 에러:" + err);
      });
  };

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
    console.log(typeof e);
    if (startPage !== e) startPage = (e - 1) * dataCount;
    if (sorting !== 0) {
      const url =
        "/admin/sortdata?sorting=" +
        sorting +
        "&startPage=" +
        startPage +
        "&dataCount=" +
        dataCount;
      Axios.get(url)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log("sort authority 에러:" + err);
        });
    } else if (filtering !== 0) {
      const url =
        "/admin/filterdata?filtering=" +
        filtering +
        "&startPage=" +
        startPage +
        "&dataCount=" +
        dataCount;
      Axios.get(url)
        .then((res) => {
          showFilteredUserCount();
          setData(res.data);
        })
        .catch((err) => {
          console.log("filter data 에러:" + err);
        });
    } else {
      getList();
    }
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
        <Cascader
          options={options}
          onChange={changeOptions}
          placeholder="구분"
          style={{
            width: "100px",
            float: "right",
            marginTop: "30px",
          }}
        />
        <div style={{ float: "left", clear: "both", marginBottom: "10px" }}>
          <span>
            {" "}
            <div
              style={{
                cursor: "pointer",
                display: "inline-block",
                color: "rgba(0,0,0,.8)",
              }}
              onClick={() => {
                if (showDropMenu_A === true) {
                  setShowDropMenu_A(false);
                } else {
                  setShowDropMenu_A(true);
                  setShowDropMenu_B(false);
                }
              }}
            >
              권한 &nbsp; &nbsp; &nbsp; <DownOutlined />
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; {"       "}
            <div
              style={{
                cursor: "pointer",
                display: "inline-block",
                color: "rgba(0,0,0,.8)",
              }}
              onClick={() => {
                if (showDropMenu_B === true) {
                  setShowDropMenu_B(false);
                } else {
                  setShowDropMenu_B(true);
                  setShowDropMenu_A(false);
                }
              }}
            >
              탈퇴 여부 <DownOutlined />
            </div>
          </span>
          <div
            style={{
              display: showDropMenu_A === true ? "block" : "none",
              textAlign: "center",
              backgroundColor: "white",
              padding: "5px",
              border: "1px solid rgba(0,0,0,.2)",
              position: "absolute",
              top: "6vw",
              left: "0",
              width: "4.5vw",
            }}
          >
            <span
              num="0"
              onClick={sortAuthority}
              style={{ cursor: "pointer", fontSize: "12px" }}
            >
              기본 정렬
            </span>
            <br />
            <span
              num="1"
              onClick={sortAuthority}
              style={{ cursor: "pointer", fontSize: "12px" }}
            >
              내림차순
            </span>
            <br />
            <span
              num="2"
              onClick={sortAuthority}
              style={{ cursor: "pointer", fontSize: "12px" }}
            >
              오름차순
            </span>
          </div>
          <div
            style={{
              display: showDropMenu_B === true ? "block" : "none",
              textAlign: "center",
              backgroundColor: "white",
              padding: "5px",
              border: "1px solid rgba(0,0,0,.2)",
              position: "absolute",
              top: "6vw",
              left: "5.5vw",
              width: "5vw",
            }}
            onClick={filterDropUser}
          >
            <span num="0" style={{ cursor: "pointer", fontSize: "12px" }}>
              전체 보기
            </span>
            <br />
            <span num="1" style={{ cursor: "pointer", fontSize: "12px" }}>
              탈퇴 유저
            </span>
            <br />
            <span num="2" style={{ cursor: "pointer", fontSize: "12px" }}>
              정상 유저
            </span>
          </div>
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
        defaultCurrent={1}
        defaultPageSize={dataCount}
        current={startPage}
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
