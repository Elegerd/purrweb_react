import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import "./header.css";

const Header = ({ onClickLogout }) => {
  const { name } = useSelector((state) => state.auth);
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
