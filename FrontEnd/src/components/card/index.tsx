import React from "react";
import { useHistory } from "react-router-dom";
import "./index.css";

interface Props {
  key: number;
  title: string;
  author: string;
}

function Card({ key, title, author }: Props) {
  const history = useHistory();

  const goDetails = () => {
    history.push(title.toLowerCase().split(" ").join("-"));
  };

  return (
    <li className="col" key={key}>
      <div className="card" onClick={goDetails}>
        <h2 className="my-0 text-xl">{title}</h2>
        <div>{author}</div>
      </div>
    </li>
  );
}

export default Card;
