import React, { useEffect } from "react";

import "antd/dist/antd.css";

import { List, Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import Axios from "util/axios";
import { useState } from "react";

const SearchResultPage = (props) => {
  const [listData, setListData] = useState([
    { title: "", avatar: "", description: "", content: "", frontImage: "" },
  ]);
  const [keyword, setKeyword] = useState(props.keyword);

  useEffect(() => {
    console.log(props.keyword);
    const url = `/post/search?user_id=${sessionStorage.getItem(
      "userId"
    )}&keyword=${keyword}`;
    Axios.get(url)
      .then((res) => {
        console.log(res.data);

        for (let i = 0; i < res.data.length; i++) {
          const text = res.data[i].content.replace(/(<([^>]+)>)/gi, "");
          listData.push({
            // href: "https://ant.design",
            title: res.data[i].name,
            avatar: res.data[i].profile_url,
            description: res.data[i].subject,
            content: text,
            frontImage: res.data[i].front_image,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <div
      style={{
        overflow: "auto",
        width: "100%",
        height: "100%",
      }}
    >
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
        // footer={
        //   <div>
        //     <b>ant design</b> footer part
        //   </div>
        // }
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
            extra={<img width={100} alt="logo" src={item.frontImage} />}
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

export default SearchResultPage;
