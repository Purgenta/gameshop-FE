"use client";
import React, { useCallback, useEffect, useState } from "react";
import style from "./page.module.css";
import Filter from "@/components/Filter/Filter";
import GamesList from "@/components/GameList/GameList";
import { FilterValues } from "@/components/Filter/filterReducer";
import useFilteredGames from "@/requests/game/hooks/useFilteredGames";
import Pagination from "@/components/Pagination/Pagination";
import { Heading } from "@chakra-ui/react";

const Search = () => {
  const [filter, setFilter] = useState<{
    filter: FilterValues | undefined;
    page: number;
  }>({
    page: 1,
    filter: undefined,
  });
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setFilter({ ...filter });
    }, 750);
    return () => clearTimeout(timeOut);
  }, [filter]);
  const { data } = useFilteredGames(
    filter.filter
      ? {
          ...filter.filter,
          sort: [filter.filter.sort.orderBy, filter.filter.sort.sortDir],
          page: filter.page,
        }
      : { page: 1 }
  );
  return (
    <main className={style["game-search"]}>
      <div className={style["toggle-filter__wrapper"]}>
        <Filter
          onChange={(filter) => setFilter((prev) => ({ page: 1, filter }))}
        ></Filter>
      </div>
      <section className={style["search-results"]}>
        <Heading size={"md"}>Search games</Heading>
        {!data ? (
          <></>
        ) : (
          <>
            <GamesList games={data.games} />
            <Pagination
              onChange={(newPage) =>
                setFilter((prev) => ({ ...prev, page: newPage }))
              }
              currentPage={filter.page}
              pageCount={data.pagination.totalPages}
            ></Pagination>
          </>
        )}
      </section>
    </main>
  );
};

export default Search;
