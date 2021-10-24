import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { isEmpty } from "lodash";
import Card from "../card";
import { getItems } from "../../redux/actions/itemsAction";
import { Items, Item } from "../../interface";
import "./index.css";

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { items } = useSelector((state: Items) => {
    return state.items;
  });

  const loading: boolean = useSelector((state: Items) => {
    return state.items.loading;
  });

  const query = new URLSearchParams(useLocation().search);

  const [search, setSearch] = useState<string | null>(query.get("q"));

  const onSearchItems = () => {
    dispatch(getItems(search, history));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event?.target.value);
  };

  useEffect(() => {
    dispatch(getItems(search, history));

    window.onpopstate = () => {
      dispatch(getItems(search, history));
    };
  }, [dispatch, history]);

  return (
    <div className="layout-column align-items-center mt-50 ">
      <section className="layout-row align-items-center justify-content-center">
        <input
          type="text"
          className="large"
          id="app-input"
          data-testid="app-input"
          onChange={handleChange}
        />
        <button
          id="submit-button"
          data-testid="submit-button"
          onClick={onSearchItems}
        >
          Search
        </button>
      </section>
      {!loading ? (
        <>
          {!isEmpty(items) ? (
            <ul
              className="mt-50 slide-up-fade-in styled py-10 row pl-0"
              id="stockData"
              data-testid="stock-data"
            >
              {items.map((item: Item, index: number) => (
                <Card key={index} title={item.title} author={item.author} />
              ))}
            </ul>
          ) : (
            <div
              className="mt-50 slide-up-fade-in"
              id="no-result"
              data-testid="no-result"
            >
              Data not found
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <ClipLoader color="ffffff" loading={loading} size={150} />
        </div>
      )}
    </div>
  );
}
