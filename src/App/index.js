import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Layout } from 'antd';
import Nav from './scenes/Nav'
import Body from './scenes/Body'
import SignupModal from './components/SignupModal'
import LoginModal from './components/LoginModal'
import LogoutModal from './components/LogoutModal'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null
    };
  }

  openSignupModal = () => {
    this.refs.signupModal.openSignupModal();
  }

  openLoginModal = () => {
    this.refs.loginModal.openLoginModal();
  }

  openLogoutModal = () => {
    this.refs.logoutModal.openLogoutModal();
  }

  updateLoggedInStatus = () => {
    this.setState({ userData: JSON.parse(localStorage.getItem('iflixAuth')) });
  }

  render() {
    const {
      userData
    } = this.state;

    return (
      <Router>
        <Layout>
          <SignupModal ref='signupModal' updateLoggedInStatus={this.updateLoggedInStatus} />
          <LoginModal ref='loginModal' updateLoggedInStatus={this.updateLoggedInStatus} />
          <LogoutModal ref='logoutModal' updateLoggedInStatus={this.updateLoggedInStatus} />
          <Nav
            openSignupModal={this.openSignupModal}
            openLoginModal={this.openLoginModal}
            openLogoutModal={this.openLogoutModal}
            userData={userData}
          />
          <Body refs={this.refs} openLoginModal={this.openLoginModal} userData={userData} />
        </Layout>
      </Router>
    );
  }
}

export default App;
