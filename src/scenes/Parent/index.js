import React, { Component } from 'react';
import { Layout } from 'antd';
import Nav from './scenes/Nav'
import Body from './scenes/Body'
import LoginModal from '../../components/LoginModal'

class Parent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };
  }

  openLoginModal = () => {
    this.loginModal.openLoginModal();
  }

  updateLoggedInStatus = () => {
    this.setState({ loggedIn: localStorage.getItem('iflixAuth') });
  }

  render() {
    const {
      loggedIn
    } = this.state;

    return (
      <Layout>
        <LoginModal ref={loginModal => this.loginModal = loginModal} updateLoggedInStatus={this.updateLoggedInStatus} />
        <Nav openLoginModal={this.openLoginModal} loggedIn={loggedIn} />
        <Body />
      </Layout>
    );
  }
}

export default Parent;
