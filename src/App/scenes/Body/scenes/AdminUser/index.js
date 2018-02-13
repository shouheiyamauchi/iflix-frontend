import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

const AdminUser = props => {
  const {
    children,
    userData
  } = props;

  const cardStyle = {
    width: '100%'
  };

  if (userData && userData.userRole === 'admin') {
    return (
      <div>
        {children}
      </div>
    );
  } else {
    return (
      <Card title="Login Required" bordered={false} style={cardStyle}>
        You must be an administrator to access this page
      </Card>
    );
  };
}

AdminUser.propTypes = {
  userData: PropTypes.object
}

export default AdminUser;
