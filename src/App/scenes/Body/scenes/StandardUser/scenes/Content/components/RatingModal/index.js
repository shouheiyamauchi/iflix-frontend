import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Spin, Button } from 'antd';
import StarRatings from 'react-star-ratings';
import styles from './styles.module.scss';

const RatingModal = props => {
  const {
    loadingIndividualRating,
    alreadyRated,
    userRating,
    displayRatingModal,
    selectRating,
    postingRating,
    postRatingApiCall,
    closeRatingModal,
    ratingLoadingError
  } = props;

  const promptRatingProps = {
    alreadyRated,
    userRating,
    selectRating
  };

  if (ratingLoadingError) {
    return (
      <Modal title="Error"
        visible={displayRatingModal}
        onOk={closeRatingModal}
        onCancel={closeRatingModal}
      >
        There was an error in loading your request
      </Modal>
    );
  } else {
    return (
      <Modal title="We hope you enjoyed the movie!"
        visible={displayRatingModal}
        okText={'Post Rating'}
        onOk={postRatingApiCall}
        confirmLoading={postingRating}
        onCancel={closeRatingModal}

      >
        <div className={styles.modalContents}>
          {loadingIndividualRating ? (
            <Spin />
          ) : (
            <PromptRating {...promptRatingProps} />
          )}
        </div>
      </Modal>
    );
  }
}

const PromptRating = props => {
  const {
    alreadyRated,
    userRating,
    selectRating
  } = props;

  if (alreadyRated) {
    return (
      <div>
        <h3>
          You have already rated this movie:
        </h3>
        <StarRatings
          rating={userRating}
          starRatedColor="red"
          numberOfStars={5}
          starDimension="30"
          starSpacing="0"
        />
      </div>
    );
  } else {
    return (
      <div>
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
    );
  };
}

RatingModal.propTypes = {
  loadingIndividualRating: PropTypes.bool.isRequired,
  alreadyRated: PropTypes.bool.isRequired,
  userRating: PropTypes.number.isRequired,
  displayRatingModal: PropTypes.bool.isRequired,
  selectRating: PropTypes.func.isRequired,
  postRatingApiCall: PropTypes.func.isRequired,
  postingRating: PropTypes.bool.isRequired,
  closeRatingModal: PropTypes.func.isRequired,
  ratingLoadingError: PropTypes.bool.isRequired
}

PromptRating.propTypes = {
  alreadyRated: PropTypes.bool.isRequired,
  userRating: PropTypes.number.isRequired,
  selectRating: PropTypes.func.isRequired
}

export default RatingModal;
