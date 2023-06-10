import React from "react";
import headerLogo from "../images/logo.svg";

function Header({userEmail}) {
  return (

    <header className="header">
      <img className="header__logo" alt="Логотип" src={headerLogo} />
      <span className="header__user-email">{userEmail}</span>
      <button class="header__button-exit">Выйти</button>
    </header>

  );
}
export default Header;
