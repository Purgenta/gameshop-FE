"use client";
import React, { useCallback, useEffect, useState } from "react";
import style from "./page.module.css";
import Filter from "@/components/Filter/Filter";
import GamesList from "@/components/GameList/GameList";
import { FilterValues } from "@/components/Filter/filterReducer";
import useFilteredGames from "@/requests/game/hooks/useFilteredGames";
import Pagination from "@/components/Pagination/Pagination";
import { useRouter } from "next/navigation";

type SearchProps = {
  searchParams: {
    toPrice: number;
    fromPrice: number;
    toYear: number;
    fromYear: number;
    currentPage: number;
  };
};
const Search = ({
  searchParams: { fromPrice, toPrice, fromYear, toYear, currentPage },
}: SearchProps) => {
  const router = useRouter();
  const [filter, setFilter] = useState<{
    filter: FilterValues;
    currentPage: number;
  }>({
    currentPage: currentPage | 1,
    filter: {
      categories: [],
      fromPrice: fromPrice || 0,
      toPrice: toPrice || 1000000,
      fromYear: fromYear || 1950,
      toYear: toYear || new Date().getFullYear(),
    },
  });
  useEffect(() => {
    const timeOut = setTimeout(() => {
      const queryParams = {
        ...filter.filter,
        toPrice: `${filter.filter.toPrice}`,
        fromPrice: `${filter.filter.fromPrice}`,
        fromYear: `${filter.filter.fromYear}`,
        toYear: `${filter.filter.toYear}`,
      };
      const searchParams = new URLSearchParams({});
      router.push(`/search?${searchParams}`);
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [filter]);
  const { data } = useFilteredGames({
    fromPrice,
    toPrice,
    fromYear,
    toYear,
    page: currentPage,
  });
  const onFilterChange = useCallback((filterValues: FilterValues) => {
    setFilter((prev) => ({ ...prev, filter: filterValues }));
  }, []);
  return (
    <main className={style["game-search"]}>
      <div className={style["toggle-filter__wrapper"]}>
        <Filter onChange={onFilterChange}></Filter>
      </div>
      <section className={style["search-results"]}>
        <h2 className={style["section-title"]}>Search games</h2>
        {!data ? (
          <></>
        ) : (
          <>
            <GamesList games={data.games} />
            <Pagination
              onChange={(newPage) =>
                setFilter((prev) => ({ ...prev, currentPage: newPage }))
              }
              currentPage={filter.currentPage}
              pageCount={data.pagination.totalPages}
            ></Pagination>
          </>
        )}
      </section>
    </main>
  );
};

export default Search;
