import React from "react";
import "h8k-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Details from "./components/details";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route
          path="/"
          render={() => {
            return <Navbar header="Singapore Press Holdings Limited (SPH)" />;
          }}
        />
        <Route path="/" component={Home} exact />
        <Route path="/:title" component={Details} exact />
      </Router>
    </Provider>
  );
}

export default App;
