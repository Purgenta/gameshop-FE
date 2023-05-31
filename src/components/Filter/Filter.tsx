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
  initialState?: FilterValues;
};
export default function Filter({ onChange, initialState }: FilterProps) {
  console.log(initialState);
  const { data } = useFilterValues();
  const [state, dispatch] = useFilterReducer(initialState);
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
  const sortChangeHandler = useCallback(() => {}, []);
  const orderChangeHandler = useCallback(() => {}, []);
  useEffect(() => {
    onChange(state);
  }, [state, onChange]);
  return data ? (
    <div className={style["filter"]}>
      <ul className={`${style["filter-options"]}`}>
        <li>
          <Dropdown label="Price">
            <RangeSlider
              minLower={data.filter.minPrice}
              maxUpper={data.filter.maxPrice}
              lower={initialState?.fromPrice || data.filter.minPrice}
              upper={initialState?.toPrice || data.filter.maxPrice}
              onChange={priceChangeHandler}
            ></RangeSlider>
          </Dropdown>
        </li>
        <li>
          <Dropdown label="Release year">
            <RangeSlider
              minLower={data.filter.minYear}
              maxUpper={data.filter.maxYear}
              lower={initialState?.fromYear || data.filter.minYear}
              upper={initialState?.toYear || data.filter.maxYear}
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
        <li>
          <Dropdown label={"Categories"}>
            <select></select>
          </Dropdown>
        </li>
      </ul>
    </div>
  ) : (
    <></>
  );
}
