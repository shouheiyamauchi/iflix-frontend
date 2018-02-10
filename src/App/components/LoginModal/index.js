import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import querystring from 'querystring';
import { Modal, Form, Icon, Input } from 'antd';

const FormItem = Form.Item;

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

  componentDidMount() {
    this.props.updateLoggedInStatus();
  }

  openLoginModal = () => {
    this.setState({ displayModal: true });
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLogin = () => {
    this.setState({ loggingIn: true });
    this.loginApiCall();
  }

  loginApiCall = () => {
    const params = querystring.stringify({
      username: this.state.username,
      password: this.state.password
    });

    axios.post('http://localhost:3001/api/v1/users/login?' + params)
      .then(response => {
        const userData = response.data.data;
        localStorage.setItem('iflixAuth', JSON.stringify(userData));

        this.props.updateLoggedInStatus();
        this.resetModal();
      })
      .catch(error => {
        console.log(error);
      });
  }

  resetModal = () => {
    this.setState({
      displayModal: false,
      loggingIn: false,
      username: '',
      password: ''
    });
  }

  render() {
    const {
      displayModal,
      loggingIn,
      username,
      password
    } = this.state;

    const formIconStyle = { color: 'rgba(0,0,0,.25)' }

    return (
      <Modal title="Login"
        visible={displayModal}
        okText={'Login'}
        onOk={this.handleLogin}
        confirmLoading={loggingIn}
        onCancel={this.resetModal}
      >
        <FormItem>
          <Input
            prefix={<Icon type="user" style={formIconStyle} />}
            placeholder="Username"
            value={username}
            name="username"
            onChange={this.handleInput}
          />
        </FormItem>
        <FormItem>
          <Input
            prefix={<Icon type="lock" style={formIconStyle} />}
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={this.handleInput}
          />
        </FormItem>
      </Modal>
    )
  }
}

LoginModal.propTypes = {
  updateLoggedInStatus: PropTypes.func.isRequired
}

export default LoginModal;
