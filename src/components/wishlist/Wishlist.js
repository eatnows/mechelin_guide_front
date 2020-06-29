import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Pagination } from "antd";
import Axios from "util/axios";

// let pageStart = 0;
const WishlistComponent = () => {
  const perPageNum = 5;
  const [pageStart, setPageStart] = useState(0);
  const [totalcount, setTotalCount] = useState("");
  const [render, setRender] = useState("");
  const [result, setResult] = useState([]);
  useEffect(() => {
    const url = `wishlist/totalcount?user_id=${sessionStorage.getItem(
      "userId"
    )}`;
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
    const url = `/wishlist/pagedata?user_id=${sessionStorage.getItem(
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
  }, [pageStart]);

  const onChangePage = (value) => {
    console.log(value);
    setPageStart((value - 1) * perPageNum);
    //pageStart = value * 5 - 1;
    console.log(pageStart);
    setRender(render + 1);
  };
  return (
    <div>
      <div>
        <h1>가보고 싶은 맛집</h1>
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
          defaultPageSize={perPageNum} //default size of page
          onChange={onChangePage}
          total={totalcount}
        />
      </div>
    </div>
  );
};

export default WishlistComponent;
