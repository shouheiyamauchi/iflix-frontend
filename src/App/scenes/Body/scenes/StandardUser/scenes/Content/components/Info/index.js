import React, { Component } from 'react';
import moment from 'moment';
import { Card, Tooltip } from 'antd';
import StarRatings from 'react-star-ratings';

const Info = props => {
  const {
    loadingContent,
    contentData
  } = props

  const cardStyle = {
    width: '100%',
    borderRadius: '5px'
  }

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
}

export default Info;
