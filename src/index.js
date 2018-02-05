import React from 'react';
import ReactDOM from 'react-dom';
import Parent from './scenes/Parent';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Parent />, document.getElementById('root'));
registerServiceWorker();
