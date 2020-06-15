import React, { useContext } from "react";
import { NameContext } from "../App";
import "./header.css";

const Header = () => {
  const name = useContext(NameContext);

  return (
    <header>
      {name && <div className={"header__name"}>Здравствуйте, {name}</div>}
    </header>
  );
};

export default Header;
