import React, { useState, useEffect } from "react";
import useIntersect from "./useIntersect";
import Axios from "axios";
import Comment from "../../pages/post/Comment";
import e from "cors";

const fakeFetch = (delay = 1000) =>
  new Promise((res) => setTimeout(res, delay));

const ListItem = ({ contact, i, likesChange }) => {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (contact.user_id === sessionStorage.getItem("userId")) {
      setShowBtn(true);
    }
  }, []);

  return (
    <div key={i}>
      <table
        style={{
          width: "600px",
          height: "500px",
          border: "1px solid black",
        }}
      >
        <thead>
          {showBtn ? (
            <tr>
              <td colSpan="2">수정</td>
              <td>삭제</td>
            </tr>
          ) : (
            ""
          )}
        </thead>
        <tbody>
          <tr>
            <td>프로필 사진</td>

            <td>닉네임 : {contact.nickname}</td>

            <td>작성일 : {contact.created_at}</td>

            <td>{i}번째 리뷰글</td>
            <td>평점 {contact.rating}</td>
          </tr>
          <tr>
            <td colSpan="3">제목 : {contact.subject}</td>
          </tr>
          <tr>
            <td>
              내용 :{" "}
              <div dangerouslySetInnerHTML={{ __html: contact.content }}></div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">
              <button type="button" onClick={likesChange} postId={contact.id}>
                공감
                <br />
                <span>{contact.likes}</span>
              </button>
            </td>
          </tr>
          <tr>
            <td colSpan="5">
              {/* 댓글 영역 import */}
              <Comment postId={contact.id} />
            </td>
          </tr>
        </tfoot>
      </table>
      <br />
    </div>
  );
};

let item = 3;
let dataLength = 0;
let theposition;
let userPlaceId;
let likes = "";
const Post = (props) => {
  const [state, setState] = useState({ itemCount: 3, isLoading: false });
  const [result, setResult] = useState([]);
  const [theposition, setTheposition] = useState("");
  const [likes, setLikes] = useState(false);
  console.log("state구역");
  /* fake async fetch */
  const fetchItems = async () => {
    const url = `http://localhost:9000/mechelin/post/review?user_place_id=${props.userPlaceId}&row=${item}`;
    Axios.get(url)
      .then((response) => {
        console.log(response.data);
        console.log(`item : ${item}`);
        setResult(response.data);
        console.log(response.data.length);
        dataLength = response.data.length;
        item = dataLength;
      })
      .catch((error) => {
        console.log(error);
      });

    setState((prev) => ({ ...prev, isLoading: true }));
    await fakeFetch();
    setState((prev) => ({
      itemCount: prev.itemCount + 3,
      isLoading: false,
    }));
    item += 3;
  };
  /* initial fetch */
  useEffect(() => {
    fetchItems();
  }, []);
  const [_, setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    await fetchItems();
    observer.observe(entry.target);
  }, {});
  const { itemCount, isLoading } = state;
  if (!itemCount) return null;

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = winScroll / height;

    setTheposition(scrolled);
  };
  /*
   * 공감 버튼 클릭시 실행되는 메소드
   */
  const onClickLikes = (e) => {
    const url = `http://localhost:9000/mechelin/likes/post`;
    Axios.post(url, {
      user_id: sessionStorage.getItem("userId"),
      post_id: e.target.getAttribute("postId"),
    })
      .then((response) => {
        console.log(response.data);
        onClickLikesRender();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /*
   *  공감 버튼을 눌렀을때 바로 반영될 수 있게 하는 메소드
   */
  const onClickLikesRender = () => {
    console.log(item);
    item = dataLength;
    console.log(item);
    const url = `http://localhost:9000/mechelin/post/review?user_place_id=${props.userPlaceId}&row=${item}`;
    Axios.get(url)
      .then((response) => {
        setResult(response.data);
        item += 3;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className="App"
      style={{
        overflow: "auto",
        width: "1000px",
        height: "500px",
        marginTop: "200px",
        marginLeft: "300px",
      }}
    >
      {[...result].map((contact, i) => {
        return <ListItem contact={contact} i={i} likesChange={onClickLikes} />;
      })}
      <div ref={setRef} className="Loading">
        {isLoading && "Loading..."}
      </div>
    </div>
  );
};
export default Post;
