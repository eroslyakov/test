import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';

console.log(`process.env.VERSION ${process.env.VERSION}`);
console.log(`process.env.PLATFORM ${process.env.PLATFORM}`);
console.log(`process.env.NODE_ENV ${process.env.NODE_ENV}`);

ReactDOM.render(<App />, document.getElementById('app'));
