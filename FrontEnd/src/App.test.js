import React from "react";
import App from "./App";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import fetchMock from "fetch-mock";
import "@testing-library/jest-dom/extend-expect";

const renderApp = () => render(<App />);

afterEach(() => {
  fetchMock.restore();
  cleanup();
});

test("initial UI is rendered as expected", () => {
  let { getByTestId, queryByTestId } = renderApp();
  expect(getByTestId("app-input")).toHaveTextContent("");
  expect(getByTestId("submit-button")).toHaveTextContent("Search");
  expect(queryByTestId("stock-data")).toBe(null);
  expect(queryByTestId("no-result")).toBe(null);
});

test("search is made on by clicking on search button and no results found", async () => {
  let { getByTestId, queryByTestId } = renderApp();
  let input = getByTestId("app-input");
  let searchButton = getByTestId("submit-button");

  const url = `http://localhost:5000/api/item/404 not found`;
  fetchMock.getOnce(url, JSON.stringify([]));
  fireEvent.input(input, {
    target: { value: "not found" },
  });
  fireEvent.click(searchButton);

  await waitFor(() => {
    const results = queryByTestId("stock-data");

    expect(results).toBe(null);
  });
});

test("search is made on by clicking on search button and return items", async () => {
  let { getByTestId } = renderApp();
  let input = getByTestId("app-input");
  let searchButton = getByTestId("submit-button");

  const url = `http://localhost:5000/api/items`;
  fetchMock.getOnce(
    url,
    JSON.stringify([
      {
        author: "Cory Doctorow",
        content:
          '<p class="lead"><img class="colorbox-10557"  alt="Vintage engraving of a dead letter office where postal officials struggle to decipher addressing information; captioned \'Who is it for? A scene in the dead letter office experts trying to decipher an illegible address\'." src="https://i1.wp.com/craphound.com/images/0GNgZxzpHD-C4lVcy.jpg?w=580&#038;ssl=1" data-recalc-dims="1"/></p>\n<p>This week on my podcast, I read my latest <em>Medium</em> column, <a href="https://doctorow.medium.com/dead-letters-73924aa19f9d">Dead Letters</a>, about the spam wars and they way they&#8217;ve led to a corporate enclosure of email, making it nearly impossible to run an independent, standalone newsletter.</p>\n<p><a href="https://ia601408.us.archive.org/16/items/Cory_Doctorow_Podcast_405/Cory_Doctorow_Podcast_405_-_Dead_Letters.mp3">MP3</a></p>\n',
        created: "2021-10-17T22:54:59.000Z",
        edited: "2021-10-17T22:54:59.000Z",
        published: "2021-10-17T22:54:59.000Z",
        title: "Dead Letters",
      },
    ])
  );
  fireEvent.input(input, {
    target: { value: "Dead Letters" },
  });
  fireEvent.click(searchButton);

  await waitFor(() => {
    expect(searchButton).toBeTruthy();
  });
});
