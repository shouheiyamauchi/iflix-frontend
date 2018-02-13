import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';

import Public from './scenes/Public';
import ContentsList from './scenes/Public//scenes/ContentsList';

import StandardUser from './scenes/StandardUser';
import Content from './scenes/StandardUser/scenes/Content';

import AdminUser from './scenes/AdminUser';
import EditContent from './scenes/AdminUser/scenes/EditContent';

class Body extends Component {
  render() {
    const {
      refs,
      userData,
      openLoginModal
    } = this.props;

    const containerStyle = {
      padding: '30px 30px',
      minHeight: 'calc(100vh - 64px)'
    }

    const publicProps = {
      userData
    }

    const standardUserProps = {
      refs,
      userData,
      openLoginModal
    }

    const adminUserProps = {
      userData
    }

    return (
      <Layout.Content style={containerStyle}>
        <Switch>
          <Route exact path="/" render={(urlParams) => <Public {...publicProps}><ContentsList {...urlParams} userData={userData} /></Public>} />
          <Route path="/contents/:id" render={(urlParams) => <StandardUser {...standardUserProps}><Content {...urlParams} /></StandardUser>} />
          <Route path="/admin/contents/:id" render={(urlParams) => <AdminUser {...adminUserProps}><EditContent {...urlParams} userData={userData} /></AdminUser>} />
        </Switch>
      </Layout.Content>
    );
  }
}

Body.propTypes = {
  refs: PropTypes.object,
  userData: PropTypes.object,
  openLoginModal: PropTypes.func.isRequired
}

export default Body;
