import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import App from './';

describe('<App />', () => {
  describe('Rendering component', () => {
    it('renders an App container', () => {
      const renderedComponent = shallow(
        <App />
      );
    });
  });

  describe('Component functions', () => {
    let renderedComponent;

    beforeEach(() => {
      renderedComponent = shallow(
        <App />
      );
    });

    it('updates userData state correctly', () => {
      const sampleAuthObject = {
        "userId": "5a783e2cfb485729ea739142",
        "username": "shouhei",
        "userRole": "user",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNzgzZTJjZmI0ODU3MjllYTczOTE0MiIsImlhdCI6MTUxODM5NTA3OX0.VY0cHT2Wfb2vpMI1uVGf3xBW6GBIBjOflyUOoLiSmw1"
      };
      localStorage.setItem('iflixAuth', JSON.stringify(sampleAuthObject));
      renderedComponent.instance().updateLoggedInStatus();

      expect(renderedComponent.state('userData')).to.deep.equal(sampleAuthObject);
    });
  });
});
