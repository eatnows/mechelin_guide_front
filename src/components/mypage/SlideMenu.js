import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { ContainerOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const { SubMenu } = Menu;

class SlideMenu extends React.Component {
  // submenu keys of first level
  rootSubmenuKeys = ["sub1", "sub2", "sub4"];

  state = {
    openKeys: ["sub1"],
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(
      (key) => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        style={{ width: 256, borderRight: "none" }}
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <ContainerOutlined />
              <span>마이 페이지</span>
            </span>
          }
        >
          <Menu.Item key="1">
            <NavLink
              to={"/mechelin/wishlist/" + sessionStorage.getItem("userId")}
            >
              위시 리스트
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink
              to={"/mechelin/mypage/" + sessionStorage.getItem("userId")}
            >
              회원 정보 수정{" "}
            </NavLink>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default SlideMenu;
