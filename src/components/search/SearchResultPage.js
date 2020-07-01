import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { List, Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import Axios from "util/axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";

// const listData = [];
const SearchResultPage = (props) => {
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const reivewPageMove = () => {
    props.reivewPageMove();
  };

  const onClickTitle = (e) => {
    const userPlaceId = e.target.getAttribute("userPlaceId");
    props.reivewPageMove(userPlaceId);
    props.history.push(`/mechelin/review/${userPlaceId}`);
  };

  return (
    <div
      style={{
        height: "auto",
        marginLeft: "25vw",
        marginTop: "2vw",
        marginBottom: "2vw",
      }}
    >
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
            extra={
              <img
                style={{ width: "10vw", height: "10vw" }}
                alt="logo"
                src={item.frontImage}
              />
            }
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={item.avatar}
                  style={{ width: "32px", height: "32px" }}
                />
              }
              title={
                <div
                  onClick={onClickTitle}
                  userPlaceId={item.userPlaceId}
                  style={{ cursor: "pointer" }}
                >
                  {item.title}
                </div>
              }
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
        style={{
          width: "50vw",
          height: "auto",
        }}
      />
      ,
    </div>
  );
};

export default SearchResultPage;
