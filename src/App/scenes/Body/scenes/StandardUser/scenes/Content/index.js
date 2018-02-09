import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'querystring';
import { Card } from 'antd';
import RatingModal from './components/RatingModal';
import Video from './components/Video';
import Info from './components/Info';

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingContent: true,
      contentData: {},
      playPercent: 0,
      displayRatingModal: false,
      postingRating: false,
      userRating: 0
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
        this.openRatingModal();
      };
    }, 25);
  }

  openRatingModal = () => {
    this.setState({ displayRatingModal: true });
  }

  postRatingApiCall = () => {
    this.setState({ postingRating: true });

    const userData = JSON.parse(localStorage.getItem('iflixAuth'));
    const params = querystring.stringify({
      contentId: this.props.match.params.id,
      userId: userData.userId,
      stars: this.state.userRating
    });
    const authHeaders = { headers: { 'Authorization': 'JWT ' + userData.token } }

    axios.post('http://localhost:3001/api/v1/ratings?' + params, {}, authHeaders)
      .then(response => {
        const ratingData = response.data.data;
        console.log(ratingData)
        // update rating here
        this.closeRatingModal();
      })
      .catch(error => {
        console.log(error);
      });
  }

  closeRatingModal = () => {
    this.setState({
      displayRatingModal: false,
      postingRating: false
    });
  }

  render() {
    const {
      loadingContent,
      contentData,
      playPercent,
      displayRatingModal,
      postingRating,
      userRating
    } = this.state;

    const ratingModalProps = { displayRatingModal, postingRating, postRatingApiCall: this.postRatingApiCall, closeRatingModal: this.closeRatingModal }
    const videoProps = { playPercent, playVideo: this.playVideo };
    const infoProps = { loadingContent, contentData };

    return (
      <div>
        <RatingModal {...ratingModalProps} />
        <Video {...videoProps} />
        <Info {...infoProps} />
      </div>
    );
  }
}

export default Content;
