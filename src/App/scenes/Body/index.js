import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { Layout } from 'antd';
import ContentsList from './scenes/ContentsList';
const { Content } = Layout;

class Body extends Component {
  render() {
    return (
      // create CSS class
      <Content style={{ padding: '30px 30px' }}>
        <Route exact path="/" component={ContentsList}/>
        <Route path="/about" render={() => {
          console.log('blahblah')
          console.log('hah')
          return <ContentsList />
        }} />
      </Content>
    );
  }
}

export default Body;
