import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'querystring';
import { Card } from 'antd';
import Video from './components/Video';
import Info from './components/Info';

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingContent: true,
      contentData: {},
      playPercent: 0
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

        this.setState({
          loadingContent: false,
          contentData
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  playVideo = () => {
    const loopId = setInterval(() => {
      if (this.state.playPercent !== 100) {
        this.setState({ playPercent: this.state.playPercent + 1 });
      } else {
        clearInterval(loopId);
      };
    }, 25);
  }

  render() {
    const {
      loadingContent,
      contentData,
      playPercent
    } = this.state;

    const videoProps = { playPercent, playVideo: this.playVideo };
    const infoProps = { loadingContent, contentData };

    return (
      <div>
        <Video {...videoProps} />
        <Info {...infoProps} />
      </div>
    );
  }
}

export default Content;
