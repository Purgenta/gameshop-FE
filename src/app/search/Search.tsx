import React, { useEffect, useState } from "react";
import style from "./SearchGames.module.css";
import Filter from "./filter/Filter";
import GamesList from "../../components/games/GamesList";
import axiosRequest from "../../requests/axiosRequest";
import { createPortal } from "react-dom";
const baseUrl = `games/getGames`;
const GameSearch = () => {
  const [url, setUrl] = useState(baseUrl);
  const [data, setData] = useState(null);
  console.log(data);
  const [filterActive, setFilterActive] = useState(false);
  const [error, setError] = useState(null);
  const onFilterChange = (url) => {
    setUrl(url);
  };
  useEffect(() => {
    const getGamesData = async () => {
      try {
        const response = await axiosRequest.get(url);
        setData(response.data);
      } catch (error) {
        setError(`Error processing your request`);
      }
    };
    getGamesData();
  }, [url]);
  return (
    <section className={style["game-search"]}>
      <h2 className={style["section-title"]}>Search games</h2>
      <div className={style["toggle-filter__wrapper"]}>
        <button
          onClick={() => setFilterActive(true)}
          className={style["toggle-filter"]}
        >
          Filters
        </button>
      </div>
      <div className={style["list-filter__wrapper"]}>
        {filterActive ? (
          createPortal(
            <div className="modal">
              <div
                className={`${style["filter-wrapper"]} ${style["active-filter"]}`}
              >
                <Filter
                  onChange={onFilterChange}
                  className={style["filter"]}
                ></Filter>
              </div>
            </div>,
            document.querySelector("#modal-overlay")
          )
        ) : (
          <div className={`${style["filter-wrapper"]}`}>
            <Filter
              onChange={onFilterChange}
              className={style["filter"]}
            ></Filter>
          </div>
        )}
        <div className={style["list-wrapper"]}>
          {data && (
            <GamesList
              games={data.games}
              pagination={data.pagination}
            ></GamesList>
          )}
        </div>
      </div>
    </section>
  );
};

export default GameSearch;
