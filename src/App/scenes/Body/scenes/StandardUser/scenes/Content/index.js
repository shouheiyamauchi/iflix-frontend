import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'querystring';
import RatingModal from './components/RatingModal';
import Video from './components/Video';
import Info from './components/Info';

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingContent: true,
      contentData: {},
      contentLoadingError: false,
      playPercent: 0,
      loadingIndividualRating: true,
      alreadyRated: false,
      displayRatingModal: false,
      postingRating: false,
      userRating: 0,
      ratingLoadingError: false
    };
  }

  componentDidMount() {
    this.getContentApiCall();
  }

  getContentApiCall = () => {
    axios.get('http://localhost:3001/api/v1/contents/' + this.props.match.params.id)
      .then(response => {
        const contentData = response.data.data;

        this.setState({
          loadingContent: false,
          contentData
        });
      })
      .catch(error => {
        this.setState({
          loadingContent: false,
          contentLoadingError: true
        });
      });
  }

  playVideo = () => {
    const loopId = setInterval(() => {
      if (this.state.playPercent !== 100) {
        this.setState({ playPercent: this.state.playPercent + 1 });
      } else {
        clearInterval(loopId);
        this.setState({ playPercent: 0 });
        this.openRatingModal();
      };
    }, 25);
  }

  openRatingModal = () => {
    // only perform API call if data not loaded
    if (this.state.userRating === 0) this.getIndividualRatingApiCall();
    this.setState({ displayRatingModal: true });
  }

  getIndividualRatingApiCall = () => {
    const userData = JSON.parse(localStorage.getItem('iflixAuth'));
    const params = querystring.stringify({
      contentId: this.props.match.params.id,
      userId: userData.userId
    });
    const authHeaders = { headers: { 'Authorization': 'JWT ' + userData.token } }

    axios.get('http://localhost:3001/api/v1/ratings?' + params, {}, authHeaders)
      .then(response => {
        const ratingData = response.data.data;

        if (ratingData) {
          // if result found, user has already made a rating
          this.setState({
            ratingLoadingError: false,
            loadingIndividualRating: false,
            alreadyRated: true,
            userRating: ratingData.stars
          });
        } else {
          // user hasn't rated if no results found
          this.setState({
            ratingLoadingError: false,
            loadingIndividualRating: false,
            alreadyRated: false
          });
        }
      })
      .catch(error => {
        this.setState({
          ratingLoadingError: true,
          loadingIndividualRating: false
        });
      });
  }

  selectRating = rating => {
    this.setState({ userRating: rating });
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
        // update rating here
        this.closeRatingModal();
      })
      .catch(error => {
        this.setState({ ratingLoadingError: true, postingRating: false });
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
      contentLoadingError,
      playPercent,
      loadingIndividualRating,
      alreadyRated,
      displayRatingModal,
      postingRating,
      userRating,
      ratingLoadingError
    } = this.state;

    const ratingModalProps = {
      loadingIndividualRating,
      alreadyRated,
      userRating,
      displayRatingModal,
      selectRating :this.selectRating,
      postingRating,
      postRatingApiCall: this.postRatingApiCall,
      closeRatingModal: this.closeRatingModal,
      ratingLoadingError
    };

    const videoProps = {
      loadingContent,
      playPercent,
      playVideo: this.playVideo,
      contentLoadingError
    };

    const infoProps = {
      loadingContent,
      contentData,
      contentLoadingError
    };

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
