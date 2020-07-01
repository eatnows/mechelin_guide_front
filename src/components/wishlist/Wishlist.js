import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Pagination, Button, Modal } from "antd";
import Axios from "util/axios";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const WishlistComponent = (props) => {
  const onChangePage = (value) => {
    props.onChangePage(value);
  };

  /*
   * 상호명 눌렀을 시 상세페이지로 이동
   */
  const onClickPlaceName = (e) => {
    const userPlaceId = e.target.getAttribute("userPlaceId");
    console.log(e.target);
    // props.reivewPageMove(userPlaceId);
    // props.history.push(`/mechelin/review/${userPlaceId}`);
  };
  /*
   * 삭제 버튼 클릭시 실행되는 함수
   */

  const showDeleteConfirm = (e) => {
    const wishListId = e.target.getAttribute("wishListId");
    console.log("버튼함수");
    console.log(wishListId);
    confirm({
      title: "정말 삭제 하시겠습니까?",
      icon: <ExclamationCircleOutlined />,
      content: "위시리스트에서 삭제하시려면 확인을 눌러주세요",
      okText: "확인",
      okType: "danger",
      cancelText: "취소",
      onOk() {
        const url = `/wishlist/delete/${wishListId}`;
        Axios.delete(url)
          .then((res) => {
            console.log(res);
            props.onDeletePage(1);
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
        <table style={{ width: "34vw", textAlign: "left" }}>
          {[...props.result].map((contact, i) => {
            return (
              <tr>
                <td style={{ padding: " .5vw 0" }}>
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
                  <br />
                  <span>{contact.address}</span>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Button
                    type="text"
                    onClick={showDeleteConfirm}
                    wishlistId={contact.wishlist_id}
                    style={{ color: "rgba(0,0,0,.4)" }}
                  >
                    삭제
                  </Button>{" "}
                </td>
              </tr>
            );
          })}
        </table>
      </div>{" "}
      <div style={{ marginTop: "1vw", textAlign: "center" }}>
        <Pagination
          size="small"
          defaultCurrent={1}
          defaultPageSize={props.perPageNum} //default size of page
          onChange={onChangePage}
          total={props.totalcount}
        />
      </div>
    </div>
  );
};

export default WishlistComponent;
