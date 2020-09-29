import React from "react";
import PropTypes from "prop-types";
import "./header.css";

const Header = ({ name, onClickLogout }) => {
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
  name: PropTypes.string,
  onClickLogout: PropTypes.func,
};

export default Header;
