import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import ProfileIcon from './components/ProfileIcon';
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
        this.props.openLogoutModal();
        break;
      case 'login':
        this.props.openLoginModal();
        break;
      default:
    }
  }

  render() {
    const {
      authToken
    } = this.props;

    return (
      <Header>
        <div className={styles.logoContainer}>
          <img alt="iflix logo" src={logo} />
        </div>
        <div style={{float: 'left'}}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['movies']}
            style={{ lineHeight: '64px' }}
            onClick={itemProps => {this.handleMenuClick(itemProps)}}
          >
            <Item key="movies">Movies</Item>
            {authToken ? (
              <Item key="logout">Logout</Item>
            ) : (
              <Item key="login"><span>Login</span></Item>
            )}
          </Menu>
        </div>
        <div style={{float: 'right'}}>
          <ProfileIcon authToken={authToken} />
        </div>
      </Header>
    );
  }
}

Nav.propTypes = {
  authToken: PropTypes.object,
  openLoginModal: PropTypes.func.isRequired,
  openLogoutModal: PropTypes.func.isRequired
}

export default Nav;
