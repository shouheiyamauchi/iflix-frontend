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
      refs,
      userData,
      openLoginModal
    } = this.props;

    const containerStyle = {
      padding: '30px 30px',
      minHeight: 'calc(100vh - 64px)'
    }

    const standardUserProps = {
      refs,
      userData,
      openLoginModal
    }

    return (
      <Layout.Content style={containerStyle}>
        <Route exact path="/contents" component={ContentsList}/>
        <Route path="/contents/:id" render={(urlParams) => <StandardUser {...standardUserProps}><Content {...urlParams} /></StandardUser>} />
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
