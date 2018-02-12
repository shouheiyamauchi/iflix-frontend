import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const ProfileIcon = props => {
  const {
    userData,
    openSignupModal
  } = props;

  return (
    <div>
      {userData ? (
        <Button icon="user" type="danger">{'Logged in as: ' + userData.username}</Button>
      ) : (
        <Button icon="user" type="danger" onClick={openSignupModal} >Signup</Button>
      )}
    </div>
  );
}

ProfileIcon.propTypes = {
  userData: PropTypes.object,
  openSignupModal: PropTypes.func.isRequired
}

export default ProfileIcon;
