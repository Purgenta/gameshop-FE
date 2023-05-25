import React, { useEffect } from "react";
import style from "./MultiSelect.module.css";
import { useState } from "react";
interface MultiSelectProps {
  options: string[];
  values?: string[];
  changeHandler: (selectedOptions: string[]) => unknown;
}
function MultiSelect({ options, changeHandler, values }: MultiSelectProps) {
  const [selected, setSelected] = useState(new Set<string>());
  useEffect(() => {
    changeHandler([...selected]);
  }, [selected, changeHandler]);
  return (
    <>
      {options.map((option, index) => (
        <div key={index} className={style["input-group"]}>
          <input
            onChange={(event) => {
              const value = event.target.value;
              setSelected((prev) => {
                if (prev.has(value)) {
                  prev.delete(value);
                } else prev.add(value);
                return new Set<string>([...prev]);
              });
            }}
            type="checkbox"
            value={values ? values[index] : index}
          />
          <label>{option}</label>
        </div>
      ))}
    </>
  );
}

export default MultiSelect;
