import * as types from "../actions/CommonTypes";

export interface CommonIF {
  loader: boolean;
  error: string | null;
  success: string | boolean | null;
  countData: any | null;
}

const initialState: CommonIF = {
  loader: false,
  error: null,
  success: null,
  countData: null,
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case types.GETCOUNTS_REQUEST:
      return { ...state, loader: true, sucess: null, error: null };
    case types.GETCOUNTS_SUCCESS:
      return {
        ...state,
        loader: false,
        success: true,
        countData: action.payload.countData,
      };
    case types.GETCOUNTS_FAIL:
      return { ...state, loader: false, error: action.error };
    default:
      return state;
  }
}
