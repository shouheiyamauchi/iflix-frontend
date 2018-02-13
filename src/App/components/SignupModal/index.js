import API from 'config/api';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import querystring from 'querystring';
import { Modal, Form, Icon, Input } from 'antd';

const FormItem = Form.Item;

class SignupModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayModal: false,
      signingUp: false,
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

  openSignupModal = () => {
    this.setState({ displayModal: true });
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSignup = () => {
    if (this.formValidation()) {
      this.setState({ signingUp: true });
      this.signupApiCall();
    };
  }

  formValidation = () => {
    const validationMessages = {
      username: '',
      password: ''
    };

    Object.keys(validationMessages).map(fieldName => {
      if (!this.state[fieldName]) validationMessages[fieldName] = fieldName + ' cannot be blank';
    });

    this.setState({ validationMessages });

    return !validationMessages.username && !validationMessages.password
  }

  signupApiCall = () => {
    const params = querystring.stringify({
      username: this.state.username,
      password: this.state.password
    });

    axios.post(API.endpoint + 'users/signup?' + params)
      .then(response => {
        this.loginApiCall();
      })
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
  }

  resetModal = () => {
    this.setState({
      displayModal: false,
      signingUp: false,
      username: '',
      password: ''
    });
  }

  render() {
    const {
      displayModal,
      signingUp,
      username,
      password,
      validationMessages
    } = this.state;

    const formIconStyle = { color: 'rgba(0,0,0,.25)' }

    return (
      <Modal title="Signup"
        visible={displayModal}
        okText={'Signup'}
        onOk={this.handleSignup}
        confirmLoading={signingUp}
        onCancel={this.resetModal}
      >
        <Form>
          <FormItem
            validateStatus={validationMessages.username && 'error'}
            help={validationMessages.username}
          >
            <Input
              prefix={<Icon type="user" style={formIconStyle} />}
              placeholder="Choose a username"
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
              placeholder="Choose a password"
              value={password}
              name="password"
              onChange={this.handleInput}
            />
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

SignupModal.propTypes = {
  updateLoggedInStatus: PropTypes.func.isRequired
}

export default SignupModal;
