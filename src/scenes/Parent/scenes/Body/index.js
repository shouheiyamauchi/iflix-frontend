import React, { Component } from 'react';
import { Layout } from 'antd';
import ContentsList from './scenes/ContentsList';

const { Content } = Layout;

class Body extends Component {
  render() {
    return (
      // create CSS class
      <Content style={{ padding: '30px 30px' }}>
        <ContentsList />
      </Content>
    );
  }
}

export default Body;
