import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Nav from './';

describe('<Nav />', () => {
  describe('Login/Logout - no user data props', () => {
    let renderedComponent;
    let mockOpenSignupModal;
    let mockOpenLoginModal;
    let mockOpenLogoutModal;

    beforeEach(() => {
      mockOpenSignupModal = sinon.spy();
      mockOpenLoginModal = sinon.spy();
      mockOpenLogoutModal = sinon.spy();

      renderedComponent = mount(
        <Nav
          openSignupModal={mockOpenSignupModal}
          openLoginModal={mockOpenLoginModal}
          openLogoutModal={mockOpenLogoutModal}
        />
      );
    });

    it('has Login button when no userData prop exists', () => {
      expect(renderedComponent.find('[name="Login"]').length).to.equal(1);
    });

    it('has no Logout button when no userData prop exists', () => {
      expect(renderedComponent.find('[name="Logout"]').length).to.equal(0);
    });

    it('fires openLoginModal() on click', () => {
      (renderedComponent.find('[name="Login"]')).simulate('click');

      expect(mockOpenLoginModal).to.have.property('callCount', 1);
    });
  });

  describe('Login/Logout - with user data props', () => {
    let renderedComponent;
    let mockOpenSignupModal;
    let mockOpenLoginModal;
    let mockOpenLogoutModal;

    beforeEach(() => {
      mockOpenSignupModal = sinon.spy();
      mockOpenLoginModal = sinon.spy();
      mockOpenLogoutModal = sinon.spy();

      const sampleAuthObject = {
        "userId": "5a783e2cfb485729ea739142",
        "username": "shouhei",
        "userRole": "user",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNzgzZTJjZmI0ODU3MjllYTczOTE0MiIsImlhdCI6MTUxODM5NTA3OX0.VY0cHT2Wfb2vpMI1uVGf3xBW6GBIBjOflyUOoLiSmw1"
      }

      renderedComponent = mount(
        <Nav
          userData={sampleAuthObject}
          openSignupModal={mockOpenSignupModal}
          openLoginModal={mockOpenLoginModal}
          openLogoutModal={mockOpenLogoutModal}
        />
      );
    });

    it('has no Login button when userData prop exists', () => {
      expect(renderedComponent.find('[name="Login"]').length).to.equal(0);
    });

    it('has Logout button when userData prop exists', () => {
      expect(renderedComponent.find('[name="Logout"]').length).to.equal(1);
    });

    it('fires openLogoutModal() on click', () => {
      (renderedComponent.find('[name="Logout"]')).simulate('click');

      expect(mockOpenLogoutModal).to.have.property('callCount', 1);
    });
  });
});
