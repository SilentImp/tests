import users from 'users';
import reducer from '../Users';
import * as types from '../../types/Users';

const defaultState = {
  loading: false,
  currentPage: 0,
  pageCount: Infinity,
  totalCount: Infinity,
  perPage: 5,
  data: [],
};

describe('Users reducer', () => {
  it('should return the default state on unknown action', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it('should turn loading state on request', () => {
    const action = {
      type: types.GET_LIST_REQUEST,
    };
    const newState = reducer(defaultState, action);
    expect(newState.loading).toEqual(true);
  });

  it('should turn off loading state on fail', () => {
    const actionRequest = {
      type: types.GET_LIST_REQUEST,
    };
    const midState = reducer(defaultState, actionRequest);

    const actionFail = {
      type: types.GET_LIST_FAIL,
    };
    const endState = reducer(midState, actionFail);
    expect(endState).toEqual(defaultState);
  });

  it('should add information on success', () => {
    const action = {
      type: types.GET_LIST_SUCCESS,
      payload: users,
    };
    const expectedState = {
      loading: false,
      currentPage: 1,
      pageCount: 3,
      totalCount: 12,
      perPage: 5,
      data: users.data,
    };

    const newState = reducer(defaultState, action);
    expect(newState).toEqual(expectedState);
  });
});
