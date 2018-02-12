import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

const confirm = Modal.confirm;

class LogoutModal extends Component {
  openLogoutModal = () => {
    confirm({
      title: 'Are you sure to logout?',
      onOk: () => {
        this.logoutUserUpdateStatus();
      },
      onCancel: () => {},
    });
  }

  logoutUserUpdateStatus = () => {
    localStorage.removeItem('iflixAuth');
    this.props.updateLoggedInStatus();
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
