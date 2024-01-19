"use client";

import { $Enums, User } from "@prisma/client";
import React, { useState } from "react";
import "~/styles/header.css";
import Image from "next/image";
import Logo from "public/assets/images/Logo.png";

type sessionUser =
  | ({
      id: string;
      role: $Enums.Role | null;
      abonnement: $Enums.Abonnement | null;
    } & {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    })
  | undefined;


  const Header = (props: { user: sessionUser }) => {
    const [isNavbarActive, setNavbarActive] = useState(false);
  
    const handleMenuClick = () => {
      setNavbarActive(!isNavbarActive);
    };
  
    return (
      <header className="mr-9">
        <a href="/" className="logo ">
          <img src='assets/images/LogoTypo.png' alt="Logo" />
        </a>
        <div
          className={`bx bx-menu ${isNavbarActive ? "bx-x" : ""}`}
          id="menu-icon"
          onClick={handleMenuClick}
        ></div>
        <ul className={`gap-4 mr-8 navbar ${isNavbarActive ? "active" : ""}`}>
          <li>
            <a href="/carte" className="text-justify">Clubs</a>
          </li>
          <li>
            <a href="/abonnement">Abonnements</a>
          </li>
          <li>
            <a href="/virtualCoach">Suivi Sportif </a>
          </li>
          <li>
            <a href="/reservation">Mes réservations </a>
          </li>
        </ul> 
        <div className="header-btn">
            {props.user ? (
              // Profile
              <a href="/client" className="">
                Mon compte
              </a>
            ) : (
              <a href="/api/auth/signin" className="sign-up .header-btn">
                Se Connecter
              </a>
            )}
        </div>
      </header>
    );
  };
  
  export default Header;