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
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
      />
      <header>
        <a href="/" className="logo">
          <img src="assets/images/LogoTypo.png" alt="Logo" />
        </a>
        <div
          className={`bx bx-menu ${isNavbarActive ? "bx-x" : ""}`}
          id="menu-icon"
          onClick={handleMenuClick}
        ></div>
        <ul className={`gap-4 navbar ${isNavbarActive ? "active" : ""}`}>
          <li>
            <a href="/carte" className=" text-justify">Clubs</a>
          </li>
          <li>
            <a href="/abonnement">Abonnements</a>
          </li>
          <li>
            <a href="#about">Suivi Sportif </a>
          </li>
          <li>
            <a href="#about">Pourquoi Summer Fit </a>
          </li>
          <li>
            {props.user ? (
              // Profile
              <a href="/api/auth/signout" className="!p-0">
                <Image
                  src={props.user.image ?? Logo}
                  alt="Profile"
                  width={40}
                  height={40}
                />
              </a>
            ) : (
              <a href="/api/auth/signin" className="sign-up .header-btn">
                Se Connecter
              </a>
            )}
          </li>
        </ul>
        {/* <div className="header-btn">
          {isNavbarActive ? (
          <div className="profil">
            {props.user ? (
              // Profile
              <a href="/api/auth/signout">
                <Image
                  src={props.user.image ?? Logo}
                  alt="Profile"
                  width={40}
                  height={40}
                />
              </a>
            ) : (
              <a href="/api/auth/signin" className="sign-up ">
                Se Connecter
              </a>
            )}
          </div>) : null}
        </div> */}
      </header>
    </>
  );
};

export default Header;
