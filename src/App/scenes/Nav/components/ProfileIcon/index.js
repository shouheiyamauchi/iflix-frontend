import React from 'react';
import PropTypes from 'prop-types';

const ProfileIcon = props => {
  const {
    userData
  } = props;

  return (
    <div>
      {userData ? ('Logged in as: ' + userData.username) : (null)}
    </div>
  );
}

ProfileIcon.propTypes = {
  userData: PropTypes.object
}

export default ProfileIcon;
