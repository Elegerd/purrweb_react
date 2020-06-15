import React, { useContext } from "react";
import { NameContext } from "../App";
import PropTypes from "prop-types";
import "./header.css";

const Header = ({ onClickLogout }) => {
  const name = useContext(NameContext);
  const handleOnClickLogout = (e) => {
    e.preventDefault();
    onClickLogout();
  };

  return (
    <header>
      {name && (
        <>
          <a
            className={"header__logout"}
            onClick={handleOnClickLogout}
            href={"#"}
          >
            Выйти из аккаунта
          </a>
          <h2 className={"header__name"}>Здравствуйте, {name}</h2>
        </>
      )}
    </header>
  );
};

Header.propTypes = {
  onClickLogout: PropTypes.func,
};

export default Header;
