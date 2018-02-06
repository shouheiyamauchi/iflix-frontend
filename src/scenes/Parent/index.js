import React, { Component } from 'react';
import { Layout } from 'antd';
import Nav from './scenes/Nav'
import Body from './scenes/Body'

class Parent extends Component {
  render() {
    return (
      <Layout>
        <Nav />
        <Body />
      </Layout>
    );
  }
}

export default Parent;
