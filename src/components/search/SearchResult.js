import React, { useState, useEffect } from "react";
import useIntersect from "./useIntersect";
import Axios from "util/axios";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { List, Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";

const fakeFetch = (delay = 1000) =>
  new Promise((res) => setTimeout(res, delay));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ListItem = ({ listData }) => {
  const [showBtn, setShowBtn] = useState(false);

  // useEffect(() => {
  //   if (listData.user_id === sessionStorage.getItem("userId")) {
  //     setShowBtn(true);
  //   }
  // }, []);

  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={listData}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
      ,
    </div>
  );
};

let row = 0;
let dataLength = 0;
let theposition;
let userPlaceId;
let likes = "";
const SearchResult = (props) => {
  const [state, setState] = useState({ itemCount: 5, isLoading: false });
  const [listData, setListData] = useState([]);
  const [theposition, setTheposition] = useState("");
  const [likes, setLikes] = useState(false);

  /* fake async fetch */
  const fetchItems = async () => {
    const url = `/post/search?user_id=${sessionStorage.getItem(
      "userId"
    )}&keyword=${props.keyword}&row=${row}`;
    Axios.get(url)
      .then((response) => {
        console.log(response.data);
        console.log(`row : ${row}`);
        console.log(response.data.length);
        dataLength = response.data.length;
        row = dataLength;

        listData.push({
          href: "https://ant.design",
          title: ``,
          avatar:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          description:
            "Ant Design, a design language for background applications, is refined by Ant UED Team.",
          content:
            "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
        });
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
    row += 5;
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
    console.log(row);
    row = dataLength;
    console.log(row);
    const url = `http://localhost:9000/mechelin/post/review?user_place_id=${props.userPlaceId}&row=${row}`;
    Axios.get(url)
      .then((response) => {
        //setResult(response.data);
        row += 5;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
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
        return <List likesChange={onClickLikes} listData={listData} />;
        <div ref={setRef} className="Loading">
          {isLoading && "Loading..."}
        </div>
      </div>
    </div>
  );
};
export default SearchResult;
