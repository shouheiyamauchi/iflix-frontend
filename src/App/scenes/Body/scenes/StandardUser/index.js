import React from 'react';
import PropTypes from 'prop-types';

const StandardUser = props => {
  if (props.authToken) {
    console.log(props.authToken)
    return (
      <div>
        {props.children}
      </div>
    )
  } else {
    console.log(props.authToken)
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
