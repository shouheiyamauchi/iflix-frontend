import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

const confirm = Modal.confirm;

class LogoutModal extends Component {
  openLogoutModal = () => {
    confirm({
      title: 'Are you sure to logout?',
    onOk: () => {
      localStorage.removeItem('iflixAuth');
      this.props.updateLoggedInStatus();
    },
    onCancel: () => {},
  });
  }

  render() {
    return (
      <div></div>
    )
  }
}

LogoutModal.propTypes = {
  updateLoggedInStatus: PropTypes.func.isRequired
}

export default LogoutModal;
