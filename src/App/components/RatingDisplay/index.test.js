import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import RatingDisplay from './';

describe('<RatingDisplay />', () => {
  describe('Rendering component - during loading rating', () => {
    it('renders a loading text', () => {
      const renderedComponent = mount(
        <RatingDisplay
          loadingRating={true}
        />
      );

      expect(renderedComponent.find('.ant-spin-dot').length).to.equal(1);
    });
  });

  describe('Rendering component - rating loaded', () => {
    it('renders a not enough ratings text when no / too little ratings exist', () => {
      const renderedComponent = shallow(
        <RatingDisplay
          loadingRating={false}
          totalStarsCount={null}
        />
      );

      expect(renderedComponent.contains('Not Enough Ratings')).to.equal(true);
    });
  });

  describe('Component functions', () => {
    it('calculates the percentage correctly', () => {
      const oneStarCount = 1;
      const totalStarsCount = 10;

      const renderedComponent = shallow(
        <RatingDisplay
          loadingRating={false}
          oneStarCount={oneStarCount}
          totalStarsCount={totalStarsCount}
        />
      );

      expect(renderedComponent.instance().getRatingPercentage(oneStarCount)).to.equal(10);
    });
  });
});
