import {
  GET_ASSETS,
  GET_ASSET,
} from "../constants/assetConstants";

const initialState = {
  assets: [],
  asset: null,
};

export const assetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ASSETS:
      return {
        ...state,
        assets: action.payload,
      };

    case GET_ASSET:
      return {
        ...state,
        asset: action.payload,
      };

    default:
      return state;
  }
};