import React from 'react';
import nock from 'nock';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];

import users from 'users';
import Users from '../index';
import reducer from '../../../reducers';
import * as actions from '../../../actions/Users';
import * as types from '../../../types/Users';

const sleep = new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});

describe('mount component', () => {
  const mockStore = configureStore(middlewares);
  let store,
    wrapper;

  beforeEach(() => {
    nock(/[.]+/)
        .get('/api/users?page=1&per_page=5')
        .reply(200, users, {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        });

    store = mockStore(reducer());
    wrapper = mount(<Provider store={store}><Users /></Provider>);
  });

  it('should pass', async () => {
    // jest.setTimeout(1000);
    await sleep;

    console.log(wrapper.debug());
    console.log(store.getActions());
    console.log(store.getState());

    wrapper.update();
    await sleep;

    console.log(wrapper.debug());
    console.log(store.getActions());
    console.log(store.getState());
    expect(1).toBe(1);
  });
});

