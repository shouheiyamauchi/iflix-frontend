import API from 'config/api';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import LoginModal from './';

describe('<LoginModal />', () => {
  describe('Component functions', () => {
    let mockUpdateLoggedInStatus;
    let renderedComponent;

    beforeEach(() => {
      mockUpdateLoggedInStatus = sinon.spy();
      renderedComponent = shallow(
        <LoginModal updateLoggedInStatus={mockUpdateLoggedInStatus} />
      );
    });

    it('fires updateLoggedInStatus when username and password are entered', () => {
      const loginData = {
        username: 'test',
        password: 'password'
      };
      renderedComponent.setState({...loginData});

      const mock = new MockAdapter(axios);
      const dummyResponse = {response: 'dummy response'};
      mock.onPost(API.endpoint + 'users/login?username=' + loginData.username + '&password=' + loginData.password).reply(200, dummyResponse);

      renderedComponent.instance().loginApiCall();

      expect(mockUpdateLoggedInStatus).to.have.property('callCount', 1);
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
