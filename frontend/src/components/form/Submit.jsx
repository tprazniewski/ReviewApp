import React from "react";

export default function Submit({ value }) {
  return (
    <input
      type="submit"
      className="w-full rounded bg-white hover:bg-opacity-70 transition font-semibold text-secondary cursor-pointer p-1"
      value={value}
    ></input>
  );
}
