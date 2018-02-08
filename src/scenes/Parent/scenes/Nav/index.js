import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  handleMenuClick = menuItemProps => {
    const menuItemKey = menuItemProps.key;

    switch(menuItemKey) {
      case 'movies':
        break;
      case 'logout':
        break;
      case 'login':
        this.props.openLoginModal();
        break;
      default:
    }
  }

  render() {
    const {
      loggedIn
    } = this.props;

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
          onClick={itemProps => {this.handleMenuClick(itemProps)}}
        >
          <Item key="movies">Movies</Item>
          {loggedIn ? (
            <Item key="logout">Logout</Item>
          ) : (
            <Item key="login"><span>Login</span></Item>
          )}
        </Menu>
      </Header>
    );
  }
}

Nav.propTypes = {
  openLoginModal: PropTypes.func.isRequired
}

export default Nav;
