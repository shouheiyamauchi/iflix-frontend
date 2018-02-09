import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, Tooltip } from 'antd';
import StarRatings from 'react-star-ratings';

const Info = props => {
  const {
    loadingContent,
    contentData,
    contentLoadingError
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
        {contentData.averageRating ? (
          <Tooltip placement="topLeft" title="Watch movie to rate content">
            <div>
              <StarRatings
                rating={contentData.averageRating}
                starRatedColor="red"
                numberOfStars={5}
                starDimension="20"
                starSpacing="0"
              />
            </div>
          </Tooltip>
        ) : (
          <div>
            Not Enough Ratings
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
  contentLoadingError: PropTypes.bool.isRequired
}

export default Info;
