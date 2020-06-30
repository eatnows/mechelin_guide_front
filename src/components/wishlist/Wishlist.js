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
        <h1>가보고 싶은 맛집</h1>
        {[...props.result].map((contact, i) => {
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
                      wishlistId={contact.wishlist_id}
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
          defaultPageSize={props.perPageNum} //default size of page
          onChange={onChangePage}
          total={props.totalcount}
        />
      </div>
    </div>
  );
};

export default WishlistComponent;
