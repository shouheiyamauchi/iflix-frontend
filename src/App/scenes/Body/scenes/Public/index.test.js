import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Public from './';

describe('<Public />', () => {
  describe('Rendering component', () => {
    it('renders a Public container div', () => {
      const renderedComponent = shallow(
        <Public />
      );

      expect(renderedComponent.find('div')).to.have.length(1);
    });

    it('renders a Public container with children', () => {
      const renderedComponent = shallow(
        <Public>
          <div>hello</div>
        </Public>
      );

      expect(renderedComponent.contains(
        <div>hello</div>
      )).to.equal(true);
    });
  });
});
