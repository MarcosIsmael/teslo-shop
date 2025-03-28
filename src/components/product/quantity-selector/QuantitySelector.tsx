"use client";

import React, { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface QuantitySelectorProps {
  quantity: number;
}

export const QuantitySelector = ({ quantity }: QuantitySelectorProps) => {
  const [count, setcount] = useState(quantity);

  const onQuantityChanged = (value: number, operation: "add" | "remove") => {
    if (operation === "remove") {
      if (count === 0) return;
      setcount(count - value);
      return;
    }
    setcount(count + value);
  };
  return (
    <div className="flex">
      <button
        onClick={() => onQuantityChanged(1, "remove")}
        disabled={count === 0}
      >
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className=" w-20 mx-3 px-5 bg-gray-100 text-center rounded">
        {count}
      </span>
      <button onClick={() => onQuantityChanged(1, "add")}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
