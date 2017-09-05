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
    await sleep;

    console.log(wrapper.debug());
    
    /*
    <Provider store={{...}}>
        <Connect(Users)>
          <Users users={{...}} actions={{...}}>
            <article className="Users">
              <button disabled={false} onClick={[Function]} type="button" className="Users__more">
                more
              </button>
            </article>
          </Users>
        </Connect(Users)>
      </Provider>
    */
    
    console.log(store.getActions());
    
    /*
    [ { type: 'GET_LIST_REQUEST' },
        { type: 'GET_LIST_SUCCESS',
          payload: { page: 1, per_page: 5, total: 12, total_pages: 3, data: [Array] } } ]
    */
    
    console.log(store.getState());
    
    /*
    { Users: 
         { loading: false,
           currentPage: 0,
           pageCount: Infinity,
           totalCount: Infinity,
           perPage: 5,
           data: [] } }
    */

    wrapper.update();
    await sleep;

    console.log(wrapper.debug());
    
    /*
    <Provider store={{...}}>
        <Connect(Users)>
          <Users users={{...}} actions={{...}}>
            <article className="Users">
              <button disabled={false} onClick={[Function]} type="button" className="Users__more">
                more
              </button>
            </article>
          </Users>
        </Connect(Users)>
      </Provider>
    */
    
    console.log(store.getActions());
    
    /*
    [ { type: 'GET_LIST_REQUEST' },
        { type: 'GET_LIST_SUCCESS',
          payload: { page: 1, per_page: 5, total: 12, total_pages: 3, data: [Array] } } ]
    */
    
    console.log(store.getState());
    
    /*
    { Users: 
         { loading: false,
           currentPage: 0,
           pageCount: Infinity,
           totalCount: Infinity,
           perPage: 5,
           data: [] } }
    */
    
    expect(1).toBe(1);
  });
});

