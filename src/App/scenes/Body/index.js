import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom'
import { Layout } from 'antd';
import ContentsList from './scenes/ContentsList';
import StandardUser from './scenes/StandardUser';
import Content from './scenes/StandardUser/scenes/Content';

class Body extends Component {
  render() {
    const {
      userData
    } = this.props;

    const containerStyle = {
      padding: '30px 30px',
      minHeight: 'calc(100vh - 64px)'
    }

    return (
      <Layout.Content style={containerStyle}>
        <Route exact path="/contents" component={ContentsList}/>
        <StandardUser userData={userData}>
          <Route path="/contents/:id" component={Content} />
        </StandardUser>
      </Layout.Content>
    );
  }
}

Body.propTypes = {
  userData: PropTypes.object
}

export default Body;
