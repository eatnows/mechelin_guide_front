import React, { useEffect } from "react";

import "antd/dist/antd.css";

import { List, Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import Axios from "util/axios";
import { useState } from "react";

// const listData = [];
const SearchResultPage = (props) => {
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <div>
      <List
        itemLayout="vertical"
        size="small"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={props.listData2}
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
                text={item.wishCount}
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text={item.likes}
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text={item.commentCount === null ? 0 : item.commentCount}
                key="list-vertical-message"
              />,
            ]}
            extra={<img width={100} alt="logo" src={item.frontImage} />}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={item.avatar}
                  style={{ width: "32px", height: "32px" }}
                />
              }
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
        style={{
          width: "800px",
          height: "1000px",
          position: "absolute",
          marginTop: "200px",
          marginLeft: "500px",
        }}
      />
      ,
    </div>
  );
};

export default SearchResultPage;
