import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const ProfileIcon = props => {
  const {
    userData
  } = props;

  return (
    <div>
      {userData ? (<Button icon="user" type="danger">{'Logged in as: ' + userData.username}</Button>) : (null)}
    </div>
  );
}

ProfileIcon.propTypes = {
  userData: PropTypes.object
}

export default ProfileIcon;
