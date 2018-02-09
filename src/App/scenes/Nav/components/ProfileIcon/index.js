import React from 'react';
import PropTypes from 'prop-types';

const ProfileIcon = props => {
  const {
    authToken
  } = props;

  return (
    <div>
      {authToken ? ('Logged in as: ' + authToken.username) : (null)}
    </div>
  );
}

ProfileIcon.propTypes = {
  authToken: PropTypes.object
}

export default ProfileIcon;
