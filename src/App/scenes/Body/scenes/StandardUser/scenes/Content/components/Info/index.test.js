import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Info from './';

describe('<Info />', () => {
  describe('Rendering component - error loading content', () => {
    it('renders an error message', () => {
      const loadingContent = false;
      const contentLoadingError = true;
      const contentData = {};

      const renderedComponent = shallow(
        <Info
          loadingContent={loadingContent}
          contentLoadingError={contentLoadingError}
          contentData={contentData}
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

      const renderedComponent = shallow(
        <Info
          loadingContent={loadingContent}
          contentLoadingError={contentLoadingError}
          contentData={contentData}
        />
      );

      expect(renderedComponent.contains(
        'Not Enough Ratings'
      )).to.equal(true);
    });

    it('renders a star rating when no average rating exists', () => {
      const loadingContent = false;
      const contentLoadingError = false;
      const contentData = {
        averageRating: 1
      };

      const renderedComponent = shallow(
        <Info
          loadingContent={loadingContent}
          contentLoadingError={contentLoadingError}
          contentData={contentData}
        />
      );

      expect(renderedComponent.find('.star-rating').length).to.equal(1);
    });
  });
});
