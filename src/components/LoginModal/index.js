import React, { Component } from 'react';
import axios from 'axios';
import { Modal } from 'antd';

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayModal: false,
      loggingIn: false,
      username: '',
      password: ''
    };
  }

  openLoginModal = () => {
    this.setState({ displayModal: true });
  }

  handleLogin = () => {
    this.loginApiCall();
  }

  loginApiCall = () => {
    this.setState({ loggingIn: true });

    axios.post('http://localhost:3001/api/v1/users/login', {
        params: {
          username: this.state.username,
          password: this.state.password
        }
      })
      .then(response => {
        const userData = response.data.data;

        localStorage.setItem('iflixAuth', JSON.stringify(userData));
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleCancel = () => {
    this.setState({
      displayModal: false,
      username: '',
      password: ''
    });
  }

  render() {
    const {
      displayModal,
      loggingIn
    } = this.state;

    return (
      <Modal title="Title"
        visible={displayModal}
        okText={'Login'}
        onOk={this.handleLogin}
        confirmLoading={loggingIn}
        onCancel={this.handleCancel}
      >
        <p>Login</p>
      </Modal>
    )
  }
}

export default LoginModal;
