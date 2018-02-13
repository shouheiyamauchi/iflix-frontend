import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Progress, Spin } from 'antd';
import styles from './styles.module.scss';

class RatingDisplay extends Component {
  getRatingPercentage = starCount => {
    return Math.round(starCount / this.props.totalStarsCount * 100);
  }

  render() {
    const {
      oneStarCount,
      twoStarsCount,
      threeStarsCount,
      fourStarsCount,
      fiveStarsCount,
      totalStarsCount,
      loadingRating
    } = this.props;

    const progressBarProps = {
      size: 'small',
      status: 'exception',
      showInfo: false
    };

    const starCounts = [oneStarCount, twoStarsCount, threeStarsCount, fourStarsCount, fiveStarsCount];

    if (totalStarsCount) {
      return (
        <div className={styles.ratingDisplayContainer}>
          <div className={styles.leftContainer}>
            <small>1 star</small><br />
            <small>2 star</small><br />
            <small>3 star</small><br />
            <small>4 star</small><br />
            <small>5 star</small>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.percentageDisplayContainer}>
              <div className={styles.percentageBars}>
                {starCounts.map(starCount => <Progress percent={this.getRatingPercentage(starCount)} {...progressBarProps} />)}
              </div>
              <div className={styles.percentageText}>
                {starCounts.map(starCount => <div><small>{this.getRatingPercentage(starCount)}%</small><br /></div>)}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <strong>
          {loadingRating ? <div style={{ textAlign: 'center' }}><Spin /></div> : 'Not Enough Ratings'}
        </strong>
      );
    };
  }
}

RatingDisplay.propTypes = {
  loadingRating: PropTypes.bool.isRequired,
  oneStarCount: PropTypes.number,
  twoStarsCount: PropTypes.number,
  threeStarsCount: PropTypes.number,
  fourStarsCount: PropTypes.number,
  fiveStarsCount: PropTypes.number,
  totalStarsCount: PropTypes.number
}

export default RatingDisplay;
