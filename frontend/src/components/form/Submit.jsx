import React from "react";

export default function Submit({ value }) {
  return (
    <input
      type="submit"
      className="w-full rounded dark:bg-white bg-secondary hover:bg-opacity-70 transition font-semibold dark:text-secondary text-white cursor-pointer p-1"
      value={value}
    ></input>
  );
}
