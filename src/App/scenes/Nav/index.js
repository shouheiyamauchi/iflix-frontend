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
      case 'Movies':
        this.goToPage('/');
        break;
      case 'Logout':
        this.props.openLogoutModal();
        break;
      case 'Login':
        this.props.openLoginModal();
        break;
      default:
    }
  }

  generateMenuItem = itemText => {
    // add name attribute for easier testing
    return (
      <Item key={itemText}>
        <span name={itemText}>{itemText}</span>
    </Item>
    )
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
      userData,
      openSignupModal
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
              defaultSelectedKeys={['Movies']}
              style={{ lineHeight: '64px' }}
              onClick={itemProps => {this.handleMenuClick(itemProps)}}
            >
              {this.generateMenuItem('Movies')}
              {userData ? (
                this.generateMenuItem('Logout')
              ) : (
                this.generateMenuItem('Login')
              )}
            </Menu>
          </div>
          <div style={{float: 'right'}}>
            <ProfileIcon userData={userData} openSignupModal={openSignupModal} />
          </div>
        </Header>
      </div>
    );
  }
}

Nav.propTypes = {
  userData: PropTypes.object,
  openSignupModal: PropTypes.func.isRequired,
  openLoginModal: PropTypes.func.isRequired,
  openLogoutModal: PropTypes.func.isRequired
}

export default Nav;
