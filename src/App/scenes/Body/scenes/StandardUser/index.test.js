import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import StandardUser from './';

describe('<StandardUser />', () => {
  describe('Rendering component - not logged in', () => {
    it('renders a StandardUser container without children when userData prop exists', () => {
      const mockOpenLoginModal = sinon.spy();

      const renderedComponent = shallow(
        <StandardUser refs={{}} openLoginModal={mockOpenLoginModal}>
          <div>hello</div>
        </StandardUser>
      );

      expect(renderedComponent.contains(
        <div>hello</div>
      )).to.equal(false);
    });
  });

  describe('Rendering component - logged in', () => {
    it('renders a StandardUser container with children when userData prop exists', () => {
      const mockOpenLoginModal = sinon.spy();
      const sampleAuthObject = {
        "userId": "5a783e2cfb485729ea739142",
        "username": "shouhei",
        "userRole": "user",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNzgzZTJjZmI0ODU3MjllYTczOTE0MiIsImlhdCI6MTUxODM5NTA3OX0.VY0cHT2Wfb2vpMI1uVGf3xBW6GBIBjOflyUOoLiSmw1"
      }
      const refs = {};

      const renderedComponent = shallow(
        <StandardUser refs={refs} openLoginModal={mockOpenLoginModal} userData={sampleAuthObject}>
          <div>hello</div>
        </StandardUser>
      );

      expect(renderedComponent.contains(
        <div>hello</div>
      )).to.equal(true);
    });
  });

  describe('Component functions - not logged in', () => {
    let renderedComponent;
    let mockOpenLoginModal;
    let refs;

    beforeEach(() => {
      mockOpenLoginModal = sinon.spy();
      refs = {
        loginModal: 'dummy login modal'
      };

      renderedComponent = shallow(
        <StandardUser refs={refs} openLoginModal={mockOpenLoginModal} />
      );
    });

    it('fires openLoginModal() when accessing StandardUser page without userData prop', () => {
      expect(mockOpenLoginModal).to.have.property('callCount', 1);
    });
  });

  describe('Component functions - logged in', () => {
    let renderedComponent;
    let mockOpenLoginModal;
    let refs;
    let sampleAuthObject;

    beforeEach(() => {
      mockOpenLoginModal = sinon.spy();
      sampleAuthObject = {
        "userId": "5a783e2cfb485729ea739142",
        "username": "shouhei",
        "userRole": "user",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNzgzZTJjZmI0ODU3MjllYTczOTE0MiIsImlhdCI6MTUxODM5NTA3OX0.VY0cHT2Wfb2vpMI1uVGf3xBW6GBIBjOflyUOoLiSmw1"
      }
      refs = {
        loginModal: 'dummy login modal'
      };

      renderedComponent = shallow(
        <StandardUser refs={refs} openLoginModal={mockOpenLoginModal} userData={sampleAuthObject} />
      );
    });

    it('doesn\'t fire openLoginModal() when accessing StandardUser page with userData prop', () => {
      expect(mockOpenLoginModal).to.have.property('callCount', 0);
    });
  });
});
