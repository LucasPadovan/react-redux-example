import React from 'react';
import {render} from 'react-dom';
import isEmpty from 'lodash/isEmpty';

import App from './App';
import fakeContext from './__fixtures__/fakeContext.json';

// Get the data from the backend if existent
let props = window.__SERVER_DATA__ || {};

// While on dev, lets use some mock data
if (process.env.NODE_ENV === 'development' && isEmpty(props)) {
    props = fakeContext;
}

// Render the app in our root element
render(<App {...props} />, document.getElementById('root'));
