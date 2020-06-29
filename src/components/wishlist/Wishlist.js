import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Pagination } from "antd";
import Axios from "util/axios";

// let pageStart = 0;
const WishlistComponent = (props) => {
  const onChangePage = (value) => {
    props.onChangePage(value);
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
                <td>{contact.name}</td>
              </tr>
              <tr>
                <td>{contact.address}</td>
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
