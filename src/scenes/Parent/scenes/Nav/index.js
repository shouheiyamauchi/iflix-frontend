import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import logo from './images/logo.png';

const { Header } = Layout, { Item } = Menu;

class Nav extends Component {
  constructor(props) {
    super(props);

    // state to capture current page
    this.state = {
    };
  }

  render() {
    return (
      <Header>
        {/* create CSS class */}
        <div style={{
          float: 'left'
        }}>
          <img alt="iflix logo" src={logo} style={{height: '30px', marginRight: '10px'}} />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Item key="1">Movies</Item>
          <Item key="2">Login</Item>
        </Menu>
      </Header>
    );
  }
}

export default Nav;
