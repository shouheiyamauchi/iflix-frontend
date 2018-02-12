import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Video from './';

describe('<Video />', () => {
  describe('Rendering component - during loading content', () => {
    it('renders a screen containing an spinner', () => {
      const loadingContent = true;
      const playPercent = 0;
      const playVideo = sinon.spy();
      const contentLoadingError = false;

      const renderedComponent = mount(
        <Video
          loadingContent={loadingContent}
          playPercent={playPercent}
          playVideo={playVideo}
          contentLoadingError={contentLoadingError}
        />
      );

      expect(renderedComponent.find('.ant-spin-dot').length).to.equal(1);
    });
  });

  describe('Rendering component - error loading content', () => {
    it('renders a screen containing an exclamation mark icon', () => {
      const loadingContent = false;
      const playPercent = 0;
      const playVideo = sinon.spy();
      const contentLoadingError = true;

      const renderedComponent = mount(
        <Video
          loadingContent={loadingContent}
          playPercent={playPercent}
          playVideo={playVideo}
          contentLoadingError={contentLoadingError}
        />
      );

      expect(renderedComponent.find('.anticon-exclamation-circle-o').length).to.equal(1);
    });
  });

  describe('Rendering component - loaded content', () => {
    it('renders a screen containing an play mark icon', () => {
      const loadingContent = false;
      const playPercent = 0;
      const playVideo = sinon.spy();
      const contentLoadingError = false;

      const renderedComponent = mount(
        <Video
          loadingContent={loadingContent}
          playPercent={playPercent}
          playVideo={playVideo}
          contentLoadingError={contentLoadingError}
        />
      );

      expect(renderedComponent.find('.anticon-play-circle-o').length).to.equal(1);
    });
  });
});
