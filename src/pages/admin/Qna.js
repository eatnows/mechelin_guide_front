import React, { useState, useEffect } from "react";
import Axios from "util/axios";
import { Pagination } from "antd";
import Search from "antd/lib/input/Search";
import TextArea from "antd/lib/input/TextArea";

const Qna = (props) => {
  const [data, setData] = useState([]);
  const dataCount = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [askId, setAskId] = useState("");
  const [reply, setReply] = useState("");
  useEffect(() => {
    props.getState(false);
    showPageCount();
    getList();
  }, []);

  useEffect(() => {
    const url =
      "/admin/ask?currentPage=" + currentPage + "&dataCount=" + dataCount;
    Axios.get(url)
      .then((res) => {
        setData(res.data);
        console.log("겟리스트");
        console.log(res.data);
      })
      .catch((err) => {
        console.log("list 출력 에러:" + err);
      });
  }, [currentPage]);

  /*문의 유저 검색 */
  const searchAskUser = (v, e) => {
    e.preventDefault();
    if (v === "") {
      getList();
    } else {
      const url =
        "/admin/ask/searchdata?searchData=" +
        v +
        "&currentPage=" +
        currentPage +
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
        console.log("토탈카운트" + totalCount);
      })
      .catch((err) => {
        console.log("ask count 받아오기 에러:" + err);
      });
  };

  /*10개씩 데이터 출력 */
  const getList = () => {
    const url =
      "/admin/ask?currentPage=" + currentPage + "&dataCount=" + dataCount;
    Axios.get(url)
      .then((res) => {
        setData(res.data);
        console.log("겟리스트");
        console.log(res.data);
      })
      .catch((err) => {
        console.log("list 출력 에러:" + err);
      });
  };

  /*문의글 답변 달기 및 답변 수정 */
  const answer = (e) => {
    console.log(e.target.getAttribute("reply"));
    const url =
      "/admin/ask/answer?answer=" +
      e.target.getAttribute("reply") +
      "&id=" +
      e.target.getAttribute("askId");
    Axios.get(url)
      .then((res) => {
        getList();
        setReply("");
      })
      .catch((err) => {
        console.log("list 출력 에러:" + err);
      });
  };

  /*페이지 바뀔 때마다 실행 */
  const nextPage = (e) => {
    setCurrentPage((e - 1) * dataCount);
    console.log(currentPage);
  };

  return (
    <div>
      <form
        style={{
          height: "auto",
          width: "1000px",
          position: "absolute",
          left: "50%",
          top: "5vw",
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
              <th style={{ width: "70px", fontWeight: "bold" }}>
                문의
                <br /> 번호
              </th>
              <th style={{ width: "70px", fontWeight: "bold" }}>
                문의 유저 번호
              </th>
              <th
                style={{
                  width: "150px",
                  fontWeight: "bold",
                }}
              >
                제목
              </th>
              <th style={{ width: "200px", fontWeight: "bold" }}>내용</th>
              <th style={{ width: "120px", fontWeight: "bold" }}>문의일</th>
              <th style={{ width: "200px", fontWeight: "bold" }}>답변</th>
              <th style={{ width: "120px", fontWeight: "bold" }}>답변일</th>
              <th style={{ width: "120px", fontWeight: "bold" }}>답변/수정</th>
            </tr>
          </thead>
          <tbody>
            {[...data].map((row, i) => {
              return (
                <tr
                  key={row.id}
                  style={{
                    border: "1px solid rgba(0,0,0,.2)",
                    textAlign: "center",
                  }}
                >
                  <td>{currentPage + i + 1}</td>
                  <td>{row.id}</td>
                  <td>{row.user_id}</td>
                  <td>{row.subject}</td>
                  <td>{row.content}</td>
                  <td>{row.created_at}</td>
                  <td>{row.reply}</td>
                  <td>{row.reply_created_at}</td>
                  <td>
                    <button
                      className="btn"
                      reply={row.reply}
                      onClick={(e) => {
                        e.preventDefault();
                        setAskId(row.id);
                        setReply(e.target.getAttribute("reply"));
                      }}
                      askId={row.id}
                      style={{ color: "rgba(245,145,45)", margin: "5px" }}
                    >
                      {row.reply === null ? "답변하기" : "수정하기"}
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
        defaultCurrent={1}
        defaultPageSize={dataCount}
        current={currentPage}
        onChange={nextPage}
        style={{
          position: "absolute",
          bottom: "16.5vw",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />{" "}
      <div
        style={{
          width: "1000px",
          position: "absolute",
          left: "50%",
          bottom: "5vw",
          transform: "translateX(-50%)",
          textAlign: "center",
          height: "8vw",
          backgroundColor: "rgba(0,0,0,.1)",
          borderRadius: "20px",
        }}
      >
        <caption
          style={{
            position: "absolute",
            fontWeight: "bold",
            fontSize: "20px",
            color: "rgba(245,145,45)",
            float: "left",
            left: "2.5%",
            bottom: "2.3vw",
          }}
        >
          답변하기
        </caption>{" "}
        <table
          style={{
            position: "absolute",
            left: "12%",
            bottom: "2vw",
            float: "left",
          }}
        >
          <tbody>
            <tr>
              <td>
                {" "}
                <TextArea
                  value={reply}
                  onInput={(e) => {
                    e.preventDefault();
                    setReply(e.target.value);
                    console.log(askId);
                  }}
                  style={{
                    width: "750px",
                    marginRight: "30px",
                    resize: "none",
                  }}
                />
              </td>
              <td>
                <button
                  className="btn"
                  askId={askId}
                  reply={reply}
                  onClick={answer}
                  style={{ color: "rgba(245,145,45)", margin: "5px" }}
                >
                  확인
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Qna;
