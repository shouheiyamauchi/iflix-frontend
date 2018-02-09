import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'querystring';
import Info from './components/Info';
import { Card } from 'antd';

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingContent: true,
      contentData: {}
    }
  }

  componentDidMount() {
    this.getContentApiCall();
  }

  getContentApiCall = () => {
    const params = querystring.stringify({
      username: this.state.username,
      password: this.state.password
    });

    axios.get('http://localhost:3001/api/v1/contents/' + this.props.match.params.id)
      .then(response => {
        const contentData = response.data.data;

        console.log(contentData)

        this.setState({
          loadingContent: false,
          contentData
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const {
      loadingContent,
      contentData
    } = this.state;

    return (
      <Info {...this.state} />
    );
  }
}

export default Content;
