import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import moment from "moment";
import { getItem } from "../../redux/actions/itemsAction";
import { Items, Item } from "../../interface";
import "./index.css";

function Details() {
  const dispatch = useDispatch();
  const history = useHistory();

  const item: Item = useSelector((state: Items) => {
    return state.items.item;
  });

  const loading: boolean = useSelector((state: Items) => {
    return state.items.loading;
  });

  useEffect(() => {
    dispatch(getItem(history.location.pathname.split("/")[1]));
  }, [dispatch, history.location.pathname]);

  return (
    <>
      {!loading ? (
        <div className="container mx-auto">
          <div className="card">
            <div>
              <h1 className="my-0">{item.title}</h1>
              <div className="flex justify-content-between flex-row-reverse">
                <div>
                  {moment(item.created).format("MMMM Do YYYY, h:mm:ss a")}
                </div>
                {item.author && <div>Author: {item.author}</div>}
              </div>
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <ClipLoader color="ffffff" loading={loading} size={150} />
        </div>
      )}
    </>
  );
}

export default Details;
