import API from 'config/api';
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
      password: '',
      validationMessages: {
        username: '',
        password: ''
      }
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
    if (this.formValidation()) {
      this.setState({ loggingIn: true });
      this.loginApiCall();
    };
  }

  formValidation = () => {
    const validationMessages = {
      username: '',
      password: ''
    };

    if (!this.state.username) validationMessages.username = 'Username cannot be blank';
    if (!this.state.password) validationMessages.password = 'Password cannot be blank';

    this.setState({ validationMessages });

    return !validationMessages.username && !validationMessages.password
  }

  loginApiCall = () => {
    const params = querystring.stringify({
      username: this.state.username,
      password: this.state.password
    });

    axios.post(API.endpoint + 'users/login?' + params)
      .then(response => {
        const userData = response.data.data;
        localStorage.setItem('iflixAuth', JSON.stringify(userData));

        this.props.updateLoggedInStatus();
        this.resetModal();
      })
      .catch(error => {
        if (error.response.status === 404) this.incorrectLoginDetails();
      });
  }

  incorrectLoginDetails = () => {
    const validationMessages = {
      username: 'The username and password did not match any records',
      password: 'The username and password did not match any records'
    };

    this.setState({
      loggingIn: false,
      validationMessages
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
      password,
      validationMessages
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
        <Form>
          <FormItem
            validateStatus={validationMessages.username && 'error'}
            help={validationMessages.username}
          >
            <Input
              prefix={<Icon type="user" style={formIconStyle} />}
              placeholder="Username"
              value={username}
              name="username"
              onChange={this.handleInput}
            />
          </FormItem>
          <FormItem
            validateStatus={validationMessages.password && 'error'}
            help={validationMessages.password}
          >
            <Input
              prefix={<Icon type="lock" style={formIconStyle} />}
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={this.handleInput}
              label="Fail"
            />
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

LoginModal.propTypes = {
  updateLoggedInStatus: PropTypes.func.isRequired
}

export default LoginModal;
