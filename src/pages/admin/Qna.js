import React, { useState, useEffect } from "react";
import Axios from "util/axios";
import { Pagination, Input } from "antd";
import Search from "antd/lib/input/Search";

const Qna = (props) => {
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(10);
  const [startPage, setStartPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [reply, setReply] = useState(false);
  useEffect(() => {
    props.getState(false);
    showPageCount();
    getList();
  }, []);

  useEffect(() => {
    getList();
  }, [startPage]);

  /*문의 유저 검색 */
  const searchAskUser = (v, e) => {
    e.preventDefault();
    if (v === "") {
      getList();
    } else {
      const url =
        "/admin/ask/searchdata?searchData=" +
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

  /*전체 데이터 개수 */
  const showPageCount = () => {
    const url = "/admin/askcount";
    Axios.get(url)
      .then((res) => {
        setTotalCount(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("ask count 받아오기 에러:" + err);
      });
  };

  /*10개씩 데이터 출력 */
  const getList = () => {
    console.log("실행");
    const url = "/admin/ask?startPage=" + startPage + "&dataCount=" + dataCount;
    Axios.get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("list 출력 에러:" + err);
      });
    console.log("겟리스트");
  };

  /*문의글 답변 달기 및 답변 수정 */
  const answer = (e) => {
    console.log(e.target.getAttribute("askId"));
    const url =
      "/admin/ask/answer?reply=" +
      reply +
      "&id=" +
      e.target.getAttribute("askId");
    Axios.get(url)
      .then((res) => {
        getList();
        setShowInput(false);
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
          1:1 문의글 목록
        </caption>{" "}
        <span style={{ position: "absolute", top: "1.5vw", right: "0" }}>
          <Search placeholder="검색" onSearch={searchAskUser} />
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
              <th style={{ width: "70px", fontWeight: "bold" }}>문의 번호</th>
              <th style={{ width: "100px", fontWeight: "bold" }}>
                문의 유저 번호
              </th>
              <th
                style={{
                  padding: "10px 0",
                  width: "120px",
                  fontWeight: "bold",
                }}
              >
                제목
              </th>
              <th style={{ width: "120px", fontWeight: "bold" }}>내용</th>
              <th style={{ width: "200px", fontWeight: "bold" }}>문의 날짜</th>
              <th style={{ width: "120px", fontWeight: "bold" }}>답변</th>
              <th style={{ width: "120px", fontWeight: "bold" }}>답변일</th>
              <th style={{ width: "150px", fontWeight: "bold" }}>답변/수정</th>
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
                  <td>{row.user_id}</td>
                  <td>{row.subject}</td>
                  <td>{row.content}</td>
                  <td>{row.created_at}</td>
                  <td>
                    {showInput === true ? (
                      <Input
                        value={reply}
                        onInput={(e) => setReply(e.target.value)}
                      />
                    ) : (
                      row.reply
                    )}
                  </td>
                  <td>{row.reply_created_at}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={answer}
                      askId={row.id}
                      style={{ color: "rgba(245,145,45)", margin: "5px" }}
                    >
                      확인
                    </button>
                    <button
                      className="btn"
                      onClick={() => setShowInput(true)}
                      askId={row.id}
                      style={{ color: "rgba(245,145,45)", margin: "5px" }}
                    >
                      {row.replay === null ? "답변하기" : "수정하기"}
                    </button>
                    <br />
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

export default Qna;
