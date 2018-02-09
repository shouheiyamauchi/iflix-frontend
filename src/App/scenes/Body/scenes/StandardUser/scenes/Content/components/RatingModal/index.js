import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

const RatingModal = props => {
  const {
    displayRatingModal,
    postingRating,
    postRatingApiCall,
    closeRatingModal
  } = props;

  return (
    <Modal title="Rate this movie"
      visible={displayRatingModal}
      okText={'Post Rating'}
      onOk={postRatingApiCall}
      confirmLoading={postingRating}
      onCancel={closeRatingModal}
    >

    </Modal>
  )
}

RatingModal.propTypes = {
  displayRatingModal: PropTypes.func.isRequired,
  displayRatingModal: PropTypes.bool.isRequired,
  postRatingApiCall: PropTypes.func.isRequired,
  closeRatingModal: PropTypes.func.isRequired
}

export default RatingModal;
