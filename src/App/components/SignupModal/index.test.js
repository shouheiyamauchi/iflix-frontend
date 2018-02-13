import API from 'config/api';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import SignupModal from './';

describe('<SignupModal />', () => {
  describe('Component functions', () => {
    let mockUpdateLoggedInStatus;
    let renderedComponent;

    beforeEach(() => {
      mockUpdateLoggedInStatus = sinon.spy();
      renderedComponent = shallow(
        <SignupModal updateLoggedInStatus={mockUpdateLoggedInStatus} />
      );
    });

    it('won\'t fire signupApiCall() when username and password aren\'t entered', () => {
      const signupApiCall = sinon.spy(renderedComponent.instance(), 'signupApiCall');
      const loginData = {
        username: '',
        password: ''
      };
      renderedComponent.setState({...loginData});

      renderedComponent.instance().handleSignup();

      expect(signupApiCall).to.have.property('callCount', 0);
    });

    it('sets validation messages when username/password are blank', () => {
      const loginData = {
        username: '',
        password: ''
      };
      renderedComponent.setState({...loginData});

      renderedComponent.instance().formValidation();

      expect(renderedComponent.state('validationMessages').username).to.equal('username cannot be blank');
      expect(renderedComponent.state('validationMessages').password).to.equal('password cannot be blank');
    });
  });
});
