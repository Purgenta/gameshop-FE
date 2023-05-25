"use client";
import React, { useEffect } from "react";
import style from "./Nav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import logo from "./g2a.svg";
import SearchBar from "./SearchBar/SearchBar";
import UserActions from "./UserActions/UserActions";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { cartSelector } from "@/redux/cartSlice/cartSlice";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCount } from "@/redux/cartSlice/cartSlice";
import useCartItemCount from "@/requests/cart/hooks/useCartItemCount";
import { useSession } from "next-auth/react";
const Nav = () => {
  const dispatch = useDispatch();
  const { itemCount } = useSelector(cartSelector);
  const { data } = useSession();
  console.log(useSession());
  const isAuth = data?.user.role ? true : false;
  const getCount = useCartItemCount();
  useEffect(() => {
    if (!isAuth) {
      dispatch(setCount(0));
      return;
    }
    const fetchCount = async () => {
      try {
        const response = await getCount();
        dispatch(setCount(response.count));
      } catch (error: any) {}
    };
    fetchCount();
  }, [isAuth]);
  return (
    <motion.nav className={style["main-nav"]}>
      <div className={style["logo"]}>
        <Image alt="website-logo" src={logo} />
      </div>
      <SearchBar></SearchBar>
      <div className={style["user-interactions"]}>
        <UserActions></UserActions>
        <Link href={"/cart"} className={style["cart"]}>
          <FontAwesomeIcon
            className={style["cart-badge"]}
            size="lg"
            icon={faCartShopping}
          ></FontAwesomeIcon>
          <span className={style["cart-count"]}>{itemCount}</span>
        </Link>
      </div>
    </motion.nav>
  );
};

export default Nav;
