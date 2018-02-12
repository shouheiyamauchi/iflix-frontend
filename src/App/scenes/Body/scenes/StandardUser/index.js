import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

const StandardUser = props => {
  const {
    children,
    refs,
    userData,
    openLoginModal
  } = props;

  const cardStyle = {
    width: '100%'
  };

  if (userData) {
    return (
      <div>
        {children}
      </div>
    );
  } else {
    // prevent function from firing on null refs
    if (refs.loginModal) openLoginModal();

    return (
      <Card title="Login Required" bordered={false} style={cardStyle}>
        Please login to access this page
      </Card>
    );
  };
}

StandardUser.propTypes = {
  refs: PropTypes.object.isRequired,
  userData: PropTypes.object,
  openLoginModal: PropTypes.func.isRequired
}

export default StandardUser;
