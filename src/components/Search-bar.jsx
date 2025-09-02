import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex flex-row items-center justify-evenly w-fit border-b border-solid p-2">
      <input
        type="search"
        placeholder="Search..."
        className="py-2 px-4 w-2/3 border rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;