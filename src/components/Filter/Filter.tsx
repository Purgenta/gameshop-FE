import { useEffect, useCallback, useState } from "react";
import RangeSlider from "../Inputs/RangeSlider/RangeSlider";
import style from "./Filter.module.css";
import { FilterValues } from "./filterReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalContent,
  Heading,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import useFilterValues from "@/requests/game/hooks/useFilterValues";
import useFilterReducer from "./filterReducer";
import Dropdown from "../Dropdown/Dropdown";
import MultiSelect from "../Inputs/MultiSelect/MultiSelect";
import { faSliders, faX } from "@fortawesome/free-solid-svg-icons";
type FilterProps = {
  onChange: (filterValues: FilterValues) => unknown;
};
export default function Filter({ onChange }: FilterProps) {
  const { data } = useFilterValues();
  const [isOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useFilterReducer();
  const yearChangeHandler = useCallback((lower: number, upper: number) => {
    dispatch({
      type: "setYear",
      payload: { fromYear: lower, toYear: upper },
    });
  }, []);
  const priceChangeHandler = useCallback((lower: number, upper: number) => {
    dispatch({
      type: "setPrice",
      payload: { fromPrice: lower, toPrice: upper },
    });
  }, []);
  const categoryChangeHandler = useCallback((categories: string[]) => {
    dispatch({
      payload: categories.map((category) => +category),
      type: "setCategories",
    });
  }, []);
  const publisherChangeHandler = useCallback((publishers: string[]) => {
    dispatch({
      payload: publishers.map((publisher) => +publisher),
      type: "setPublishers",
    });
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => onChange(state), 750);
    return () => clearTimeout(timeout);
  }, [state]);
  return data ? (
    <>
      <FontAwesomeIcon
        size="2xl"
        onClick={() => setIsOpen(true)}
        icon={faSliders}
      ></FontAwesomeIcon>
      <div
        className={`${style["filter"]} ${isOpen ? style["active-filter"] : ""}`}
      >
        <Heading marginBottom={"5"} size="md">
          Filter games
        </Heading>
        <ul className={`${style["filter-options"]}`}>
          <li>
            <Heading size={"sm"} margin={"1.5"}>
              Search by title
            </Heading>
            <input
              className={style["search-name"]}
              placeholder="Enter game title"
              type="text"
              onChange={(e) =>
                dispatch({ payload: e.target.value, type: "setSearch" })
              }
            ></input>
          </li>
          <li>
            <Heading size={"sm"} margin={"1.5"}>
              Price range
            </Heading>
            <RangeSlider
              min={data.filter.minPrice}
              max={data.filter.maxPrice}
              onChange={priceChangeHandler}
            ></RangeSlider>
          </li>
          <li>
            <Heading size={"sm"} margin={"1.5"}>
              Year range
            </Heading>
            <RangeSlider
              min={data.filter.minYear}
              max={data.filter.maxYear}
              onChange={yearChangeHandler}
            ></RangeSlider>
          </li>
          <li>
            <Heading size={"sm"} margin={"1.5"}>
              Order by
            </Heading>
            <select
              onChange={(e) =>
                dispatch({ type: "setOrderBy", payload: e.target.value })
              }
              className={style["select-option"]}
              defaultValue="price"
            >
              <option value="price">Price</option>
              <option value="releaseYear">Release year</option>
            </select>
          </li>
          <li>
            <Heading size={"sm"} margin={"1.5"}>
              Sort direction
            </Heading>
            <select
              className={style["select-option"]}
              defaultValue="desc"
              onChange={(e) =>
                dispatch({ type: "setSort", payload: e.target.value })
              }
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </li>
          <li>
            <Dropdown label="Categories">
              <MultiSelect
                options={data.categories.map((category) => {
                  return {
                    isChecked: true,
                    label: category.name,
                    value: category.id,
                  };
                })}
                changeHandler={categoryChangeHandler}
              />
            </Dropdown>
          </li>
          <li>
            <Dropdown label={"Publishers"}>
              <MultiSelect
                options={data.publishers.map((publisher) => {
                  return {
                    isChecked: true,
                    label: publisher.name,
                    value: publisher.publisher_id,
                  };
                })}
                changeHandler={publisherChangeHandler}
              />
            </Dropdown>
          </li>
        </ul>
        <FontAwesomeIcon
          className={style["filter-close__btn"]}
          size="xl"
          icon={faX}
          onClick={() => setIsOpen(false)}
        ></FontAwesomeIcon>
      </div>
    </>
  ) : (
    <></>
  );
}
