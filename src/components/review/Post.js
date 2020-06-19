import React, { useState, useEffect } from "react";
import useIntersect from "./useIntersect";

const fakeFetch = (delay = 1000) =>
  new Promise((res) => setTimeout(res, delay));

const ListItem = ({ number }) => (
  <div className="ListItem">
    <span>{number}</span>
  </div>
);
function Post() {
  const [state, setState] = useState({ itemCount: 0, isLoading: false });
  /* fake async fetch */
  const fetchItems = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    await fakeFetch();
    setState((prev) => ({
      itemCount: prev.itemCount + 20,
      isLoading: false,
    }));
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
  return (
    <div
      className="App"
      style={{
        overflow: "auto",
        width: "1500px",
        height: "700px",
        marginTop: "200px",
        marginLeft: "300px",
      }}
    >
      {[...Array(itemCount)].map((_, i) => {
        return <ListItem key={i} number={i} />;
      })}
      <div ref={setRef} className="Loading">
        {isLoading && "Loading..."}
      </div>
    </div>
  );
}
export default Post;

/*
import React, { useEffect, useState, useRef } from "react";
import queryString from "query-string";
import Axios from "axios";

const Post = (props) => {
  const [placeName, setPlaceName] = useState("");
  const [nickname, setNickname] = useState("");
  const [postCount, setPostCount] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [rating, setRating] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState("");
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [preItems, setPreItems] = useState(0);
  const [items, setItems] = useState(3);
  const targetRef = useRef(null);
  const rootRef = useRef(null);
  const [state, setState] = useState({ itemCount: 0, isLoading: false });

  const fetchItems = () => {
    console.log("!!");
    setItems(items + 3);
    setResult(result.concat(data.splice(items + 3, items + 6)));
    // setItems(items + 3);
    // setResult(data.slice(items + 3, items + 6));
    // setItems(items + 3);
    // setResult(data.slice(items + 3, items + 6));
  };
  useEffect(() => {
    const url = `http://localhost:9000/mechelin/post/review?user_place_id=${props.userPlaceId}`;
    Axios.get(url)
      .then((response) => {
        //const data = response.data;
        setData(response.data);

        setResult(response.data.slice(items, items + 3));
        // setPlaceName(data.name);
        // setNickname(data.nickname);
        // setPostCount(data.post_count);
        // setProfileUrl(data.profile_url);
        // setCreatedAt(data.created_at);
        // setRating(data.rating);
        // setSubject(data.subject);
        // setContent(data.content);
        // setLikes(data.likes);
      })
      .catch((error) => {
        console.log(error);
      });
    fetchItems();
  }, []);
  //const target = useRef(null);

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      await fetchItems();
      observer.observe(entry.target);
    }
  };
  //옵저버 등록
  const [target, setTarget] = useState(null);
  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);
  const { itemCount, isLoading } = state;

  return (
    <div
      id="reviewForm"
      className="reviewForm"
      style={{
        overflow: "auto",
        width: "1500px",
        height: "700px",
        marginTop: "200px",
        marginLeft: "300px",
      }}
    >
      sdfdsf
      {result.map((contact, i) => {
        return (
          <div>
            <table
              style={{
                width: "600px",
                height: "500px",
                border: "1px solid black",
              }}
            >
              <tr>
                <td colSpan="2">수정</td>
                <td>삭제</td>
              </tr>
              <tr>
                <td>프로필 사진</td>
                <td>
                  <tr>
                    <td>닉네임 : {contact.nickname}</td>
                  </tr>
                  <tr>
                    <td>작성일 : {contact.created_at}</td>
                  </tr>
                </td>
                <td>
                  <tr>
                    <td>{i}번째 리뷰글</td>
                  </tr>
                  <tr>
                    <td>평점 {contact.rating}</td>
                  </tr>
                </td>
              </tr>
              <tr>
                <td colSpan="3">제목 : {contact.subject}</td>
              </tr>
              <tr>
                <td>
                  내용 :{" "}
                  <div
                    dangerouslySetInnerHTML={{ __html: contact.content }}
                  ></div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">공감버튼 : {contact.likes}</td>
              </tr>
            </table>
            <br />
          </div>
        );
      })}
      <div ref={setTarget} className="Loading">
        {isLoading && "Loading..."}
      </div>
    </div>
  );
};

export default Post;
