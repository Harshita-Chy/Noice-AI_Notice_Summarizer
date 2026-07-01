function SearchBar({ search, setSearch }) {
  return (
    <div className="relative w-full shadow-sm rounded-xl">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search notices, deadlines, faculty updates..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-205 rounded-xl text-slate-805 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-150 text-sm"
      />
    </div>
  );
}

export default SearchBar;