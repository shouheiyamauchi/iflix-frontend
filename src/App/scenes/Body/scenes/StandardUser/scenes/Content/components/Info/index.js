import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, Popover, Icon } from 'antd';
import StarRatings from 'react-star-ratings';
import RatingDisplay from 'App/components/RatingDisplay';

const Info = props => {
  const {
    loadingContent,
    contentData,
    contentLoadingError,
    loadingRating,
    ratingData
  } = props;

  const cardStyle = {
    width: '100%',
    borderRadius: '5px'
  };

  if (contentLoadingError) {
    return (
      <Card title="Error" bordered={false} style={cardStyle}>
        There was an error in loading your request
      </Card>
    );
  } else {
    return (
      <Card title={contentData.title} loading={loadingContent} bordered={false} style={cardStyle}>
        {ratingData.average ? (
            <div className='star-rating'>
              <StarRatings
                rating={ratingData.average}
                starRatedColor="red"
                numberOfStars={5}
                starDimension="20"
                starSpacing="0"
              />
              &nbsp;
              <Popover placement="bottom" content={<RatingDisplay {...ratingData} loadingRating={loadingRating} />} title="Ratings">
                <Icon type="down-circle" style={{ cursor: 'pointer' }} />
              </Popover>
            </div>
        ) : (
          <div>
            <strong>
              {loadingRating ? 'Loading Ratings' : 'Not Enough Ratings'}
            </strong>
          </div>
        )}
        {contentData.genre}
        <br />
        {moment(contentData.releaseDate).format('LL')}
        <br />
        <br />
        {contentData.description}
      </Card>
    );
  };
}

Info.propTypes = {
  loadingContent: PropTypes.bool.isRequired,
  contentData: PropTypes.object.isRequired,
  contentLoadingError: PropTypes.bool.isRequired,
  loadingRating: PropTypes.bool.isRequired,
  ratingData: PropTypes.object.isRequired
}

export default Info;
