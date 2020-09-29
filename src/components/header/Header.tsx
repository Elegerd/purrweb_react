import React, { MouseEvent } from "react";
import "./header.css";

type Props = {
  name: string;
  onClickLogout: () => void;
};

const Header: React.FunctionComponent<Props> = ({ name, onClickLogout }) => {
  const handleOnClickLogout = (e: MouseEvent) => {
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

export default Header;
