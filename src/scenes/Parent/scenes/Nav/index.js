import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import logo from './images/logo.png';
import styles from './styles.module.scss';

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
        <div className={styles.logoContainer}>
          <img alt="iflix logo" src={logo} />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Item key="1">Movies</Item>
          <Item key="2">Signup</Item>
        </Menu>
      </Header>
    );
  }
}

export default Nav;
