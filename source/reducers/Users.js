import * as types from '../types/Users';

const defaultState = {
  loading: false,
  currentPage: 0,
  pageCount: Infinity,
  totalCount: Infinity,
  perPage: 5,
  data: [],
};

export default function Users(previousState = defaultState, action) {
  if (action === undefined) return previousState;
  switch (action.type) {
    case types.GET_LIST_REQUEST:
      return {
        ...previousState,
        loading: true,
      };
    case types.GET_LIST_SUCCESS:
      return {
        ...previousState,
        loading: false,
        data: previousState.data.concat(action.payload.data),
        currentPage: action.payload.page,
        pageCount: action.payload.total_pages,
        totalCount: action.payload.total,
      };
    case types.GET_LIST_FAIL:
      return {
        ...previousState,
        loading: false,
        data: [],
      };
    default:
      return previousState;
  }
}
