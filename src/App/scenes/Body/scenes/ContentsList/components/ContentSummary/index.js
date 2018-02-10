import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { List, Tooltip, Button } from 'antd';
import StarRatings from 'react-star-ratings';

const { Item } = List;

const ContentSummary = props => {
  const {
    content
  } = props;

  const thumbnailStyle = {
    width: 150,
    marginBottom: 10,
    borderRadius: 5,
    filter: 'drop-shadow(5px 5px 6px #acacac)'
  };

  return (
    <Item
      key={content.title}
      extra={<img style={thumbnailStyle} alt="logo" src={content.thumbnail} />}
    >
      <h1>{content.title}</h1>
      {content.averageRating ? (
        <Tooltip placement="topLeft" title="Watch movie to rate content">
          <div>
            <StarRatings
              rating={content.averageRating}
              starRatedColor="red"
              numberOfStars={5}
              starDimension="20"
              starSpacing="0"
            />
          </div>
        </Tooltip>
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
  );
}

ContentSummary.propTypes = {
  content: PropTypes.object.isRequired
}

export default ContentSummary;
