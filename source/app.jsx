import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Users from './components/Users';
import store from './store';


const root = document.getElementById('page');
if (root !== null) {
  render(<Provider store={store}><Users /></Provider>, root);
}
