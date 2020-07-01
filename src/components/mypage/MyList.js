import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Pagination, Button, Modal } from "antd";
import Axios from "util/axios";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const MyListComponent = (props) => {
  const perPageNum = 5;
  const [pageStart, setPageStart] = useState(0);
  const [totalcount, setTotalCount] = useState("");
  const [result, setResult] = useState([]);
  const [deleteRender, setDeleteRender] = useState("");
  const [render, setRender] = useState("");
  let num = 0;
  const onChangePage = (value) => {
    console.log(value);
    setPageStart((value - 1) * perPageNum);
    console.log(pageStart);
    setRender(render + 1);
  };

  useEffect(() => {
    const url = `/userplace/count?user_id=${sessionStorage.getItem("userId")}`;
    Axios.get(url)
      .then((res) => {
        console.log(res.data);
        setTotalCount(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const url = `/post/timeline?user_id=${sessionStorage.getItem(
      "userId"
    )}&pageStart=${pageStart}&perPageNum=${perPageNum}`;
    Axios.get(url)
      .then((res) => {
        console.log(res.data);
        setResult(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageStart, deleteRender]);

  /*
   * 상호명 눌렀을 시 상세페이지로 이동
   */
  const onClickPlaceName = (e) => {
    const userPlaceId = e.target.getAttribute("userPlaceId");
    props.reivewPageMove(userPlaceId);
    props.history.push(`/mechelin/review/${userPlaceId}`);
  };
  /*
   * 삭제 버튼 클릭시 실행되는 함수
   */

  const showDeleteConfirm = (e) => {
    const userPlaceId = e.target.getAttribute("userPlaceId");
    console.log("버튼함수");
    console.log(userPlaceId);
    confirm({
      title: "정말 삭제 하시겠습니까?",
      icon: <ExclamationCircleOutlined />,
      content: "내 맛집에서 삭제하시려면 확인을 눌러주세요",
      okText: "확인",
      okType: "danger",
      cancelText: "취소",
      onOk() {
        const url = `/userplace/show/${userPlaceId}/1`;
        Axios.put(url)
          .then((res) => {
            console.log(res);
            props.myPlaceRender(num);
            num = num + 1;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      onCancel() {},
    });
  };
  return (
    <div>
      <div>
        {[...result].map((contact, i) => {
          return (
            <table>
              <tr>
                <td rowSpan="2">
                  <img
                    src={contact.front_image}
                    alt=""
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>
                  <span
                    onClick={onClickPlaceName}
                    style={{ cursor: "pointer" }}
                    userPlaceId={contact.user_place_id}
                  >
                    {contact.name}
                  </span>
                </td>
              </tr>
              <tr>
                <td>{contact.address}</td>
              </tr>
              <tr>
                <td>
                  <span>
                    <input
                      onClick={showDeleteConfirm}
                      type="button"
                      userPlaceId={contact.user_place_id}
                      value="삭제"
                    />
                  </span>
                </td>
              </tr>
            </table>
          );
        })}
      </div>
      <div>
        <Pagination
          size="small"
          defaultCurrent={1}
          defaultPageSize={perPageNum} //default size of page
          onChange={onChangePage}
          total={totalcount}
        />
      </div>
    </div>
  );
};

export default MyListComponent;
