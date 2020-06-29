import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { MailOutlined } from "@ant-design/icons";

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
        style={{ width: 256 }}
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
          <Menu.Item key="1">FAQ</Menu.Item>
          <Menu.Item key="2">1:1문의</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default SlideMenu;
