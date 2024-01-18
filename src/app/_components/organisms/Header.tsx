'use client'

import React, { useState } from 'react';
import "~/styles/header.css";
const Header = () => {
  const [isNavbarActive, setNavbarActive] = useState(false);

  const handleMenuClick = () => {
    setNavbarActive(!isNavbarActive);
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css" />
      <header>
        <a href="#" className="logo">
          <img src="assets/images/LogoTypo.png" alt="Logo" />
        </a>
        <div className={`bx bx-menu ${isNavbarActive ? 'bx-x' : ''}`} id="menu-icon" onClick={handleMenuClick}></div>
        <ul className={`navbar ${isNavbarActive ? 'active' : ''}`}>
          <li><a href="#home">Clubs</a></li>
          <li><a href="#advantage">Abonnements</a></li>
          <li><a href="#about">Suivi Sportif </a></li>
          <li><a href="#about">Pourquoi Summer Fit </a></li>
        </ul>
        <div className="header-btn">
          <a href="#" className="sign-up ">Se Connecter</a>
          <a href="#" className="sign-in ">S'inscrire</a>
        </div>
      </header>
    </>
  );
};

export default Header;