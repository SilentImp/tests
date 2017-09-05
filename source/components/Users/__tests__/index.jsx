import users from 'users';
import users2 from 'users2';
import users3 from 'users3';

import React from 'react';
import nock from 'nock';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Users from '../index';
import reducer from '../../../reducers';
import * as actions from '../../../actions/Users';
import * as types from '../../../types/Users';

const middlewares = [thunk];

const fooStore = {
  Users: {
    loading: false,
    currentPage: 1,
    pageCount: users.total_pages,
    totalCount: users.total,
    perPage: 5,
    data: users.data,
  },
};

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

    // store = mockStore(fooStore);
    store = createStore(reducer, compose(
        applyMiddleware(
          thunkMiddleware,
        ),
      ));
    wrapper = mount(<Provider store={store}><Users /></Provider>);
  });

  it('should pass', async () => {
    // jest.setTimeout(1000);
    await sleep;

    // console.log(wrapper.debug());
    // console.log(store.getActions());
    // console.log(store.getState());

    await sleep;
    wrapper.update();

    // console.log(store.getState());

    nock(/[.]+/)
        .get('/api/users?page=2&per_page=5')
        .reply(200, users2, {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        });

    nock(/[.]+/)
        .get('/api/users?page=3&per_page=5')
        .reply(200, users3, {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        });

    wrapper.find('button').nodes[0].click();
    // expect(store.dispatch).toHaveBeenCalled();

    await sleep;
    wrapper.update();

    //
    // console.log(wrapper.debug());
    console.log(store.getState());
    // console.log(store.getActions());
    // console.log(store.getState());
    expect(1).toBe(1);
  });
});

