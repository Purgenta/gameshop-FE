import { useEffect, useState, useReducer } from "react";
import RangeSlider from "../Inputs/RangeSlider/RangeSlider";
import style from "./Filter.module.css";
import { FilterValues } from "./filterReducer";
import useFilterValues from "@/requests/game/hooks/useFilterValues";
import useFilterReducer from "./filterReducer";
import Dropdown from "../Dropdown/Dropdown";
import MultiSelect from "../Inputs/MultiSelect/MultiSelect";
type FilterProps = {
  className: string;
  onChange: (filterValues: FilterValues) => unknown;
};
export default function Filter({ className, onChange }: FilterProps) {
  const { data, error, isLoading } = useFilterValues();
  const [state, dispatch] = useFilterReducer();
  const categoryLabels = data && data.categories.map((value) => value.name);
  const categoryValues = data && data.categories.map((value) => `${value.id}`);
  useEffect(() => {
    if (!state) return;
    const timeout = setTimeout(() => {
      onChange(state);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [state, onChange]);
  return (
    data && (
      <aside className={`${className}}`}>
        <ul className={`${style["filter-list"]}`}>
          {data && (
            <>
              <li>
                <Dropdown label={"Release year"}>
                  <RangeSlider
                    onChange={(lower, upper) => {
                      dispatch({
                        payload: { minYear: lower, maxYear: upper },
                        type: "setYear",
                      });
                    }}
                    lower={data.filter.minPrice}
                    upper={data.filter.maxPrice}
                  />
                </Dropdown>
              </li>
              <li>
                <Dropdown label={"Price"}>
                  <RangeSlider
                    onChange={(lower, upper) => {
                      dispatch({
                        payload: { maxPrice: upper, minPrice: lower },
                        type: "setPrice",
                      });
                    }}
                    lower={data["filter"]["minPrice"]}
                    upper={data["filter"]["maxPrice"]}
                  ></RangeSlider>
                </Dropdown>
              </li>
              <li>
                <Dropdown label={"Categories"}>
                  <MultiSelect
                    options={categoryLabels as string[]}
                    values={categoryValues}
                    changeHandler={(checkedValues) => {
                      dispatch({
                        payload: checkedValues,
                        type: "setCategories",
                      });
                    }}
                  />
                </Dropdown>
              </li>
            </>
          )}
        </ul>
      </aside>
    )
  );
}
