"use client";
import React from "react";
import style from "./Nav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import logo from "./g2a.svg";
import SearchBar from "./SearchBar/SearchBar";
import UserActions from "./UserActions/UserActions";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
const Nav = () => {
  return (
    <nav className={style["main-nav"]}>
      <div className={style["logo"]}>
        <Image alt="website-logo" src={logo} />
      </div>
      <div className={style["navigation"]}>
        <SearchBar></SearchBar>
        <div className={style["user-interactions"]}>
          <UserActions></UserActions>
          <Link href={"/cart"} className={style["cart"]}>
            <FontAwesomeIcon
              className={style["cart-badge"]}
              size="lg"
              icon={faCartShopping}
            ></FontAwesomeIcon>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
