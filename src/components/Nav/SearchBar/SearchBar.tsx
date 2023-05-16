import React from "react";
import style from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const SearchBar = () => {
  return (
    <form className={style["search-bar"]}>
      <input
        type={"text"}
        name="search-products"
        className={style["search-input"]}
        id="search-products"
        placeholder="Search for..."
      ></input>
      <button
        aria-label="submit-search"
        className={style["search-submit"]}
        type="submit"
      >
        <FontAwesomeIcon size={"xl"} icon={faMagnifyingGlass}></FontAwesomeIcon>
      </button>
    </form>
  );
};

export default SearchBar;
