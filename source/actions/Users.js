import fetch from 'isomorphic-fetch';
import * as types from '../types/Users';

export function Request() {
  return {
    type: types.GET_LIST_REQUEST,
  };
}

export function Success(data) {
  return {
    type: types.GET_LIST_SUCCESS,
    payload: data,
  };
}

export function Fail() {
  return {
    type: types.GET_LIST_FAIL,
  };
}


async function Fetching(dispatch, getState) {
  dispatch(Request());

  // console.log('requested');

  const previousState = getState().Users;
  const {
    pageCount,
    perPage,
    currentPage,
  } = previousState;
  const nextPage = currentPage + 1;

  if (nextPage > pageCount) {
    dispatch(Fail());
    return;
  }

  // console.log('to fetch');

  try {
    const response = await fetch(`https://reqres.in/api/users?page=${nextPage}&per_page=${perPage}`);
    // console.log('fetched: ', `https://reqres.in/api/users?page=${nextPage}&per_page=${perPage}`);
    const json = await response.json();
    dispatch(Success(json));
  } catch (error) {
    dispatch(Fail());
  }
}

export function Fetch() {
  return Fetching;
}
