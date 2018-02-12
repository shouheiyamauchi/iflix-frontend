import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import LogoutModal from './';

describe('<LogoutModal />', () => {
  describe('Component functions', () => {
    let renderedComponent;
    let mockUpdateLoggedInStatus;

    beforeEach(() => {
      mockUpdateLoggedInStatus = sinon.spy();

      renderedComponent = shallow(
        <LogoutModal updateLoggedInStatus={mockUpdateLoggedInStatus} />
      );
    });

    it('logs out/removes user auth object correctly on logoutUserUpdateStatus()', () => {
      const sampleAuthObject = {
        "userId": "5a783e2cfb485729ea739142",
        "username": "shouhei",
        "userRole": "user",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNzgzZTJjZmI0ODU3MjllYTczOTE0MiIsImlhdCI6MTUxODM5NTA3OX0.VY0cHT2Wfb2vpMI1uVGf3xBW6GBIBjOflyUOoLiSmw1"
      }
      localStorage.setItem('iflixAuth', JSON.stringify(sampleAuthObject))
      renderedComponent.instance().logoutUserUpdateStatus();

      expect(localStorage.getItem('iflixAuth')).to.equal(null);
    });

    it('fires parent updateLoggedInStatus function on logoutUserUpdateStatus()', () => {
      renderedComponent.instance().logoutUserUpdateStatus();

      expect(mockUpdateLoggedInStatus).to.have.property('callCount', 1);
    });
  });
});
