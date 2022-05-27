import { get } from "../services/Api";

import * as types from "./CommonTypes";

export const getCounts = () => {
  return async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: types.GETCOUNTS_REQUEST,
        payload: {},
      });
      const res: any = await get(`/common/count`);
      dispatch({
        type: types.GETCOUNTS_SUCCESS,
        payload: { countData: res },
      });
    } catch (error: any) {
      dispatch({
        type: types.GETCOUNTS_FAIL,
        error: error.response?.data,
      });
      alert({
        message: "Error fetching count data please contact admin...!",
      });
    }
  };
};
