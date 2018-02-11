import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Public from './';

describe('<Public />', () => {
  it('renders a public container div', () => {
    const renderedComponent = shallow(
      <Public></Public>
    );

    expect(renderedComponent.find('div')).to.have.length(1);
  });

  it('renders a public container with children', () => {
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
