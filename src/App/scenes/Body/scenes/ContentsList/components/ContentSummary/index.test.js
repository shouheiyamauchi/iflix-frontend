import React from 'react';
import ReactDOM from 'react-dom';
import ContentSummary from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ContentSummary />, div);
  ReactDOM.unmountComponentAtNode(div);
});
