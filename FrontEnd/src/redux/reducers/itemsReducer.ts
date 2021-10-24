import { GET_ITEMS, GET_ITEM, ITEM_LOADING } from "../actions/types";

const initialState = {
  loading: false,
  items: [],
  item: {},
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case GET_ITEM:
      return {
        ...state,
        item: action.payload,
        loading: false,
      };
    case ITEM_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
