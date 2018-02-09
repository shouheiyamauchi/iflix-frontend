import React from 'react';
import ReactDOM from 'react-dom';
import LogoutModal from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LogoutModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
