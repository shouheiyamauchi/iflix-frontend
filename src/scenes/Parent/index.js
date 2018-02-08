import React, { Component } from 'react';
import { Layout } from 'antd';
import Nav from './scenes/Nav'
import Body from './scenes/Body'
import LoginModal from '../../components/LoginModal'

class Parent extends Component {
  openLoginModal = () => {
    this.loginModal.openLoginModal();
  }

  render() {
    return (
      <Layout>
        <LoginModal ref={loginModal => this.loginModal = loginModal} />
        <Nav openLoginModal={this.openLoginModal} />
        <Body />
      </Layout>
    );
  }
}

export default Parent;
