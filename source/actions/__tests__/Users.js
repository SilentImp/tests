import users from 'users';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../Users';
import * as types from '../../types/Users';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Users', () => {
  it('request action ', () => {
    const initialState = {};
    const store = mockStore(initialState);
    store.dispatch(actions.Request());
    const actionsList = store.getActions();
    expect(actionsList).toContainEqual({
      type: types.GET_LIST_REQUEST,
    });
  });

  it('request fail action ', () => {
    const initialState = {};
    const store = mockStore(initialState);
    store.dispatch(actions.Fail());
    const actionsList = store.getActions();
    expect(actionsList).toContainEqual({
      type: types.GET_LIST_FAIL,
    });
  });

  it('request success action ', () => {
    const initialState = {};
    const store = mockStore(initialState);
    store.dispatch(actions.Success(users));
    const actionsList = store.getActions();
    expect(actionsList).toContainEqual({
      type: types.GET_LIST_SUCCESS,
      payload: users,
    });
  });

  it('request users list success', async () => {
    const initialState = {
      Users: {
        loading: false,
        currentPage: 0,
        pageCount: Infinity,
        totalCount: Infinity,
        perPage: 5,
        data: [],
      },
    };
    const store = mockStore(initialState);

    nock(/[.]+/)
        .get('/api/users?page=1&per_page=5')
        .reply(200, users, {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        });

    const action = await actions.Fetch();
    await store.dispatch(action);

    const actionsList = store.getActions();

    expect(actionsList).toContainEqual({
      type: types.GET_LIST_REQUEST,
    });

    expect(actionsList).toContainEqual({
      type: types.GET_LIST_SUCCESS,
      payload: users,
    });
  });

  it('request users list fails when page number is larger then total pages count', async () => {
    const initialState = {
      Users: {
        loading: false,
        currentPage: 1,
        pageCount: 1,
        totalCount: 3,
        perPage: 5,
        data: [],
      },
    };
    const store = mockStore(initialState);

    nock(/[.]+/)
        .get('/api/users?page=2&per_page=5')
        .reply(200, users, {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        });

    const action = await actions.Fetch();
    await store.dispatch(action);

    const actionsList = store.getActions();

    expect(actionsList).toContainEqual({
      type: types.GET_LIST_REQUEST,
    });

    expect(actionsList).toContainEqual({
      type: types.GET_LIST_FAIL,
    });
  });


  it('request users list fails when server fails', async () => {
    const initialState = {
      Users: {
        loading: false,
        currentPage: 0,
        pageCount: Infinity,
        totalCount: Infinity,
        perPage: 5,
        data: [],
      },
    };
    const store = mockStore(initialState);

    nock(/[.]+/)
          .get('/api/users?page=1&per_page=5')
          .reply(500, null, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          });

    const action = await actions.Fetch();
    await store.dispatch(action);

    const actionsList = store.getActions();

    expect(actionsList).toContainEqual({
      type: types.GET_LIST_REQUEST,
    });

    expect(actionsList).toContainEqual({
      type: types.GET_LIST_FAIL,
    });
  });
});
