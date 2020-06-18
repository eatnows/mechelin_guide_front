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
  const [preItems, setPreItems] = useState(0);
  const [items, setItems] = useState(5);
  const targetRef = useRef(null);
  const rootRef = useRef(null);
  useEffect(() => {
    dataPull();
    window.addEventListener("scroll", infiniteScroll, true);
  }, []);

  const dataPull = () => {
    const url = `http://localhost:9000/mechelin/post/review?user_place_id=${props.userPlaceId}`;
    Axios.get(url)
      .then((response) => {
        //const data = response.data;
        //setData(response.data);
        console.log(response.data);
        let result = response.data.slice(preItems, items);
        console.log(result);
        setData(result);
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
  };

  const infiniteScroll = () => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight === scrollHeight) {
      setPreItems(items);
      setItems(items + 20);
    }
  };
  //
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
      {data.map((contact, i) => {
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
      <div ref={targetRef} />
    </div>
  );
};

export default Post;
