/* eslint-disable react/display-name */
import { useState, useRef, useEffect } from "react";
import { memo } from "react";
import style from "./RangeSlider.module.css";
type RangeSliderProps = {
  lower: number;
  labelUpper?: string;
  labelLower?: string;
  upper: number;
  minLower: number;
  maxUpper: number;
  symbol?: JSX.Element;
  onChange: (lower: number, upper: number) => unknown;
};
const RangeSlider = memo(
  ({
    lower,
    upper,
    labelLower,
    labelUpper,
    minLower,
    maxUpper,
    onChange,
  }: RangeSliderProps) => {
    const [range, setRange] = useState({
      lower,
      upper,
    });
    const lowerRef = useRef<HTMLInputElement>(null!);
    const upperRef = useRef<HTMLInputElement>(null!);
    useEffect(() => {
      onChange(range.lower, range.upper);
    }, [range, onChange]);
    const onChangeLower = () => {
      const value = lowerRef.current.value;
      setRange((prev) => {
        return {
          ...prev,
          lower: +value,
        };
      });
    };
    const onChangeUpper = () => {
      const value = upperRef.current.value;
      setRange((prev) => {
        return {
          ...prev,
          upper: +value,
        };
      });
    };
    const rangeWidth = (range.upper - range.lower) / (maxUpper - minLower);
    console.log(rangeWidth);
    const leftOffSet =
      100 - ((maxUpper - range.lower) / (maxUpper - minLower)) * 100;
    return (
      <div className={style["range-wrapper"]}>
        <div className={style["ranges"]}>
          <input
            min={minLower}
            max={range.upper}
            ref={lowerRef}
            value={range.lower}
            onChange={onChangeLower}
            className={`${style["range"]} ${style["left"]}`}
            type={"range"}
          />
          <input
            max={maxUpper}
            min={range.lower}
            value={range.upper}
            ref={upperRef}
            onChange={onChangeUpper}
            className={`${style["range"]} ${style["right"]}`}
            type={"range"}
          ></input>
          <div
            className={style["full-range"]}
            style={{
              width: `${rangeWidth * lowerRef.current?.offsetWidth}px`,
              left: `${leftOffSet}%`,
            }}
          />
          <div className={style["out-range"]} />
        </div>
        <div className={style["price"]}>
          <h3 className={style["price-lower"]}>{`${minLower} ${
            labelLower ? labelLower : ""
          }`}</h3>
          <h3 className={style["price-higher"]}>{`${maxUpper} ${
            labelUpper ? labelUpper : ""
          }`}</h3>
        </div>
      </div>
    );
  }
);
export default RangeSlider;
