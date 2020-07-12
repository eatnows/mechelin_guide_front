import React, { useState, useEffect } from "react";
import WishlistComponent from "components/wishlist/Wishlist";
import WishListMap from "components/map/WishListMap";
import Axios from "util/axios";
import SlideMenu from "components/mypage/SlideMenu";

const WishList = (props) => {
  const perPageNum = 7;
  const [pageStart, setPageStart] = useState(0);
  const [totalcount, setTotalCount] = useState("");
  const [render, setRender] = useState("");
  const [result, setResult] = useState([]);
  const [deleteRender, setDeleteRender] = useState("");

  useEffect(() => {
    props.getState(false);
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
  }, [pageStart, deleteRender]);

  const onChangePage = (value) => {
    console.log(value);
    setPageStart((value - 1) * perPageNum);
    //pageStart = value * 5 - 1;
    console.log(pageStart);
    setRender(render + 1);
  };

  const onDeletePage = (value) => {
    setDeleteRender(deleteRender + value);
  };

  return (
    <div style={{ overflow: "auto" }}>
      <div
        style={{
          width: "10vw",
          height: "10vw",
          position: "absolute",
          left: "3%",
          top: "25%",
        }}
      >
        <SlideMenu />
      </div>
      <caption
        style={{
          fontWeight: "bold",
          fontSize: "1.5vw",
          width: "20vw",
          marginTop: "5vw",
          color: "rgba(245,145,45)",
          marginLeft: "20vw",
        }}
      >
        위시 리스트
      </caption>
      <div
        style={{
          marginTop: "2vw",
          marginLeft: "20vw",
          width: "35vw",
          height: "auto",
        }}
      >
        <WishlistComponent
          onChangePage={onChangePage}
          totalcount={totalcount}
          result={result}
          perPageNum={perPageNum}
          history={props.history}
          reivewPageMove={props.reivewPageMove}
          onDeletePage={onDeletePage}
        />
      </div>
      <div
        style={{
          border: "1px solid black",
          width: "35.1vw",
          height: "70.3vh",
          top: "20vh",
          right: "10vw",
          position: "fixed",
        }}
      >
        <WishListMap
          result={result}
          history={props.history}
          reivewPageMove={props.reivewPageMove}
        />
      </div>
    </div>
  );
};
export default WishList;
