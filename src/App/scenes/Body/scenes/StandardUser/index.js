import React from 'react';
import PropTypes from 'prop-types';

const StandardUser = props => {
  if (props.userData) {
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
  userData: PropTypes.object
}

export default StandardUser;
