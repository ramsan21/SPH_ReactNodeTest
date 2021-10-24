import React from "react";
import { useHistory } from "react-router-dom";
import "./index.css";

interface Props {
  header: string;
}

function Navbar({ header }: Props) {
  const history = useHistory();

  const goHome = () => {
    history.push("/");
  };

  return (
    <nav className="app-header">
      <div className="layout-row align-items-center justify-content-center">
        {/* <div className="hydrated h8k-logo" onClick={goHome}>
          <img src="image/logo.png" alt="Logo" className="logo" />
        </div> */}
        <h4 className="app-title ml-16 my-0" onClick={goHome}>
          {header}
        </h4>
      </div>
    </nav>
  );
}

export default Navbar;
