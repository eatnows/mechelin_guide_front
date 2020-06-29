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
      <Pagination
        size="small"
        defaultCurrent={1}
        defaultPageSize={perPageNum} //default size of page
        onChange={onChangePage}
        total={totalcount}
      />
    </div>
  );
};

export default WishlistComponent;
