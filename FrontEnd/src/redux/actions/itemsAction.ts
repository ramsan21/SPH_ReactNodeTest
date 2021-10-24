import axios from "axios";
import { GET_ITEMS, GET_ITEM, ITEM_LOADING } from "./types";
import { Dispatch } from "redux";
import { baseUrl } from "../../config";

// Get items
export const getItems =
  (q: string | null, history: any) => (dispatch: Dispatch) => {
    const query = q ? `?q=${q}` : "";
    history.push(query);
    dispatch({ type: ITEM_LOADING });
    axios
      .get(`${baseUrl}/api/items${query}`)
      .then((res) => {
        dispatch({ type: GET_ITEMS, payload: res.data });
      })
      .catch((err) => console.log(err.response.data));
  };

// Get item
export const getItem = (title: string) => (dispatch: Dispatch) => {
  dispatch({ type: ITEM_LOADING });
  axios
    .get(`${baseUrl}/api/item/${title.split("-").join(" ")}`)
    .then((res) => {
      dispatch({ type: GET_ITEM, payload: res.data });
    })
    .catch((err) => console.log(err.response.data));
};
