import { Size } from "@/interfaces";
import clsx from "clsx";
import React from "react";

interface SizeSelectorProps {
  selectedSize: Size;
  avaibleSizes: Size[];
}

export const SizeSelector = ({
  avaibleSizes,
  selectedSize,
}: SizeSelectorProps) => {
  console.log({ avaibleSizes, selectedSize });
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4"> Tallas disponibles</h3>

      <div className="flex">
        {avaibleSizes.map((size) => (
          <button
            key={size}
            className={clsx("mx-2 hover:underline text-lg", {
              underline: size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
