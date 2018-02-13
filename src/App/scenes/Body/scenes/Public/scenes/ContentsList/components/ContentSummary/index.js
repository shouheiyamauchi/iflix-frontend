import API from 'config/api';
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { List, Popover, Icon, Button, Tooltip, Modal } from 'antd';
import StarRatings from 'react-star-ratings';
import RatingDisplay from 'App/components/RatingDisplay';

const { Item } = List;

class ContentSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ratingVisible: false,
      loadingRating: true,
      ratingData: {},
      displayDeleteModal: false,
      deletingContent: false
    };
  }

  toggleRatingDisplay = () => {
    if (this.state.loadingRating) this.getRatingsApiCall();
    this.setState({ ratingVisible: !this.state.ratingVisible });
  }

  getRatingsApiCall = () => {
    axios.get(API.endpoint + 'ratings/' + this.props.content._id)
      .then(response => {
        const ratingData = response.data.data;

        this.setState({
          loadingRating: false,
          ratingData
        });
      })
      .catch(error => {
        this.setState({
          loadingRating: false
        });
      });
  }

  openDeleteModal = e => {
    e.preventDefault();

    this.setState({ displayDeleteModal: true });
  }

  deleteContent = () => {
    this.setState({ deletingContent: true });

    const authHeaders = { headers: { 'Authorization': 'JWT ' + this.props.userData.token } }

    axios.delete(API.endpoint + 'contents/' + this.props.content._id, authHeaders)
      .then(response => {
        this.resetModal();
        this.props.openPage();
      })
      .catch(error => {
        console.log(error);
      });
  }

  resetModal = () => {
    this.setState({
      displayDeleteModal: false,
      deletingContent: false
    });
  }

  render() {
    const {
      ratingVisible,
      loadingRating,
      ratingData,
      displayDeleteModal,
      deletingContent
    } = this.state;

    const {
      content,
      userData
    } = this.props;

    const thumbnailStyle = {
      width: 150,
      marginBottom: 10,
      borderRadius: 5,
      filter: 'drop-shadow(5px 5px 6px #acacac)'
    };

    return (
      <div>
        <Modal title="Are you sure to delete this movie?"
          visible={displayDeleteModal}
          okText={'Delete'}
          onOk={this.deleteContent}
          confirmLoading={deletingContent}
          onCancel={this.resetModal}
        >
          Clicking delete will remove this content permanently.
        </Modal>
        <Item
          key={content.title}
          extra={<img style={thumbnailStyle} alt="logo" src={content.thumbnail} />}
        >
          <h1>{content.title}</h1>
          {userData && userData.userRole === 'admin' && (
            <div >
              <Tooltip title="Edit Content">
                <Link to={'/admin/contents/' + content._id}>
                  <Icon type="edit" />
                </Link>
              </Tooltip>
              &nbsp;|&nbsp;
              <Tooltip title="Delete Content">
                <a onClick={e => this.openDeleteModal(e)} href="#">
                  <Icon type="delete" />
                </a>
              </Tooltip>
              <br /><br />
            </div>
          )}
          {content.averageRating ? (
            <div>
              <StarRatings
                rating={content.averageRating}
                starRatedColor="red"
                numberOfStars={5}
                starDimension="20"
                starSpacing="0"
              />
              &nbsp;
              <Popover
                visible={ratingVisible}
                placement="bottom"
                content={<RatingDisplay {...ratingData} loadingRating={loadingRating} />} title="Ratings">
                <Icon onClick={this.toggleRatingDisplay} type="down-circle" style={{ cursor: 'pointer' }} />
              </Popover>
            </div>
          ) : (
            <div>
              <strong>Not Enough Ratings</strong>
            </div>
          )}
          {content.genre}
          <br />
          {moment(content.releaseDate).format('LL')}
          <br />
          <br />
          {content.description}
          <br />
          <br />
          <Link to={'/contents/' + content._id}>
            <Button type="danger">Watch Movie</Button>
          </Link>
        </Item>
      </div>
    );
  }
}

ContentSummary.propTypes = {
  content: PropTypes.object.isRequired,
  userData: PropTypes.object,
  openPage: PropTypes.func.isRequired
}

export default ContentSummary;
