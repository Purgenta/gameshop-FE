import { useEffect, useCallback } from "react";
import RangeSlider from "../Inputs/RangeSlider/RangeSlider";
import style from "./Filter.module.css";
import { FilterValues } from "./filterReducer";
import useFilterValues from "@/requests/game/hooks/useFilterValues";
import useFilterReducer from "./filterReducer";
import Dropdown from "../Dropdown/Dropdown";
import MultiSelect from "../Inputs/MultiSelect/MultiSelect";
type FilterProps = {
  onChange: (filterValues: FilterValues) => unknown;
};
export default function Filter({ onChange }: FilterProps) {
  const { data } = useFilterValues();
  const [state, dispatch] = useFilterReducer();
  const categoryLabels = data && data.categories.map((value) => value.name);
  const categoryValues = data && data.categories.map((value) => `${value.id}`);
  const yearChangeHandler = useCallback(
    (lower: number, upper: number) => {
      dispatch({
        type: "setYear",
        payload: { fromYear: lower, toYear: upper },
      });
    },
    [dispatch]
  );
  const priceChangeHandler = useCallback(
    (lower: number, upper: number) => {
      dispatch({
        type: "setPrice",
        payload: { fromPrice: lower, toPrice: upper },
      });
    },
    [dispatch]
  );
  const categoryChangeHandler = useCallback(
    (categoryValues: string[]) => {
      dispatch({
        payload: categoryValues,
        type: "setCategories",
      });
    },
    [dispatch]
  );
  useEffect(() => {
    onChange(state);
  }, [state, onChange]);
  return data ? (
    <div className={style["filter"]}>
      <ul className={`${style["filter-options"]}`}>
        <li>
          <Dropdown label="Price">
            <RangeSlider
              lower={data.filter.minPrice}
              upper={data.filter.maxPrice}
              onChange={priceChangeHandler}
            ></RangeSlider>
          </Dropdown>
        </li>
        <li>
          <Dropdown label="Release year">
            <RangeSlider
              lower={data.filter.minYear}
              upper={data.filter.maxYear}
              onChange={yearChangeHandler}
            ></RangeSlider>
          </Dropdown>
        </li>
        <li>
          <Dropdown label={"Categories"}>
            <MultiSelect
              options={categoryLabels as string[]}
              values={categoryValues}
              changeHandler={categoryChangeHandler}
            />
          </Dropdown>
        </li>
      </ul>
    </div>
  ) : (
    <></>
  );
}
