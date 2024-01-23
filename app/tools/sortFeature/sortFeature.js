// SortingDropdown.js
import Arrow from "@/assets/svg/arrow";
import React from "react";

const SortingDropdown = ({ onSortChange, defaultSort, sortOptions, title }) => {
  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    onSortChange(selectedSort);
  };

  return (
    <section className="relative">
      <p className="text-sm mb-1 text-gray-400">{title}</p>
      <select
        onChange={handleSortChange}
        value={defaultSort}
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <article className="pointer-events-none absolute inset-y-0 top-6 right-0 flex items-center px-2 text-gray-700">
        <Arrow style={`fill-current h-4 w-4"`} />
      </article>
    </section>
  );
};

export default SortingDropdown;
