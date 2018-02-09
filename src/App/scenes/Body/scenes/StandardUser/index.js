import React from 'react';
import PropTypes from 'prop-types';

const StandardUser = props => {
  if (props.authToken) {
    return (
      <div>
        {props.children}
      </div>
    )
  } else {
    return (
      <div>
        You must be logged in
      </div>
    )
  };
}

StandardUser.propTypes = {
  authToken: PropTypes.object
}

export default StandardUser;
