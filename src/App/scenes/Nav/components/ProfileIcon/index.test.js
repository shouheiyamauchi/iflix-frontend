import React from 'react';
import ReactDOM from 'react-dom';
import ProfileIcon from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProfileIcon />, div);
  ReactDOM.unmountComponentAtNode(div);
});
