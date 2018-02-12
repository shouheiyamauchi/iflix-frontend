import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Body from './';

describe('<App />', () => {
  describe('Rendering component', () => {
    it('renders a Body container', () => {
      const mockOpenLoginModal = sinon.spy();

      const renderedComponent = shallow(
        <Body openLoginModal={mockOpenLoginModal} />
      );
    });
  });
});
