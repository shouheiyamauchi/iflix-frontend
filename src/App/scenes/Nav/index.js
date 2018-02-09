import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
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
      redirectPage: ''
    };
  }

  handleMenuClick = menuItemProps => {
    const menuItemKey = menuItemProps.key;

    switch(menuItemKey) {
      case 'movies':
        this.goToPage('/contents');
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

  goToPage = redirectPage => {
    this.setState({ redirectPage }, () => {
      this.setState({ redirectPage: '' });
    });
  }

  render() {
    const {
      redirectPage
    } = this.state;

    const {
      userData
    } = this.props;

    return (
      <div>
        {redirectPage ? (<Redirect push to={redirectPage} />) : (null)}
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
              {userData ? (
                <Item key="logout">Logout</Item>
              ) : (
                <Item key="login"><span>Login</span></Item>
              )}
            </Menu>
          </div>
          <div style={{float: 'right'}}>
            <ProfileIcon userData={userData} />
          </div>
        </Header>
      </div>
    );
  }
}

Nav.propTypes = {
  userData: PropTypes.object,
  openLoginModal: PropTypes.func.isRequired,
  openLogoutModal: PropTypes.func.isRequired
}

export default Nav;
