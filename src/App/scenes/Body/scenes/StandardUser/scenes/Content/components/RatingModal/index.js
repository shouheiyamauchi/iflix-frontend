import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import StarRatings from 'react-star-ratings';
import styles from './styles.module.scss';

const RatingModal = props => {
  const {
    userRating,
    displayRatingModal,
    selectRating,
    postingRating,
    postRatingApiCall,
    closeRatingModal
  } = props;

  return (
    <Modal title="We hope you enjoyed the movie!"
      visible={displayRatingModal}
      okText={'Post Rating'}
      onOk={postRatingApiCall}
      confirmLoading={postingRating}
      onCancel={closeRatingModal}
    >
      <div className={styles.modalContents}>
        <h3>
          Please give the movie a rating out of 5 below:
        </h3>
        <StarRatings
          rating={userRating}
          starRatedColor="red"
          numberOfStars={5}
          starDimension="30"
          starSpacing="0"
          changeRating={selectRating}
        />
      </div>
    </Modal>
  )
}

RatingModal.propTypes = {
  userRating: PropTypes.number.isRequired,
  displayRatingModal: PropTypes.func.isRequired,
  displayRatingModal: PropTypes.bool.isRequired,
  selectRating: PropTypes.func.isRequired,
  postRatingApiCall: PropTypes.func.isRequired,
  closeRatingModal: PropTypes.func.isRequired
}

export default RatingModal;
