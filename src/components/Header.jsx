import React from "react";
import { Link } from "react-router-dom";

import logo from "../images/logo.svg";

export default function Header({ text, email, link, onLogOut }) {
  return (
    <header className="header">
      <a href="#" className="header__logo-link">
        <img src={logo} alt="Логотип сайта" className="header__logo" />
      </a>
      <div className="header__kontainer">
        <span className="header__post">{email}</span>
        {onLogOut ? (
          <Link to={link} className="header__enter" onClick={onLogOut}>
            {text}
          </Link>
        ) : (
          <Link to={link} className="header__enter">
            {text}
          </Link>
        )}
      </div>
    </header>
  );
}
