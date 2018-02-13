import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Info from './';

describe('<Info />', () => {
  describe('Rendering component - content loaded, loading rating', () => {
    it('renders a loading ratings message', () => {
      const loadingContent = false;
      const contentLoadingError = false;
      const contentData = {};
      const loadingRating = true;
      const ratingData = {};

      const renderedComponent = shallow(
        <Info
          loadingContent={loadingContent}
          contentLoadingError={contentLoadingError}
          contentData={contentData}
          loadingRating={loadingRating}
          ratingData={ratingData}
        />
      );

      expect(renderedComponent.contains(
        'Loading Ratings'
      )).to.equal(true);
    });
  });

  describe('Rendering component - error loading content', () => {
    it('renders a loading content error message', () => {
      const loadingContent = false;
      const contentLoadingError = true;
      const contentData = {};
      const loadingRating = false;
      const ratingData = {};

      const renderedComponent = shallow(
        <Info
          loadingContent={loadingContent}
          contentLoadingError={contentLoadingError}
          contentData={contentData}
          loadingRating={loadingRating}
          ratingData={ratingData}
        />
      );

      expect(renderedComponent.contains(
        'There was an error in loading your request'
      )).to.equal(true);
    });
  });

  describe('Rendering component - content loaded', () => {
    it('renders a not enough rating message when no average rating exists', () => {
      const loadingContent = false;
      const contentLoadingError = false;
      const contentData = {};
      const loadingRating = false;
      const ratingData = {};

      const renderedComponent = shallow(
        <Info
          loadingContent={loadingContent}
          contentLoadingError={contentLoadingError}
          contentData={contentData}
          loadingRating={loadingRating}
          ratingData={ratingData}
        />
      );

      expect(renderedComponent.contains(
        'Not Enough Ratings'
      )).to.equal(true);
    });

    it('renders a star rating when no average rating exists', () => {
      const loadingContent = false;
      const contentLoadingError = false;
      const contentData = {};
      const loadingRating = false;
      const ratingData = {
        average: 3
      };

      const renderedComponent = shallow(
        <Info
          loadingContent={loadingContent}
          contentLoadingError={contentLoadingError}
          contentData={contentData}
          loadingRating={loadingRating}
          ratingData={ratingData}
        />
      );

      expect(renderedComponent.find('.star-rating').length).to.equal(1);
    });
  });
});
