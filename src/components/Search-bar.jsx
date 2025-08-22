import React from 'react';

const SearchBar = () => {
  return (
    <div className="flex flex-row items-center justify-evenly w-fit border-b border-solid p-2">
      <input
        type="search"
        placeholder="Search..."
        className="py-2 px-4 w-2/3 border rounded"
      />
      <button className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
