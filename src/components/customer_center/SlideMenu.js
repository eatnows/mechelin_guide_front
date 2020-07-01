import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { MailOutlined } from "@ant-design/icons";
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
              <MailOutlined />
              <span>고객센터</span>
            </span>
          }
        >
          <Menu.Item key="1">
            <NavLink to={"/mechelin/faq/" + sessionStorage.getItem("userId")}>
              FAQ
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to={"/mechelin/qna/" + sessionStorage.getItem("userId")}>
              1:1문의
            </NavLink>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default SlideMenu;
