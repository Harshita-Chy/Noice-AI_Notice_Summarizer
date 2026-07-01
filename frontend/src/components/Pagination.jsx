import React from "react";

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition duration-200 border ${
          currentPage === 1
            ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed"
            : "bg-white text-slate-700 border-slate-200 hover:bg-indigo-50"
        }`}
      >
        &lt; Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium shadow-sm transition duration-200 border ${
            currentPage === page
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-slate-700 border-slate-200 hover:bg-indigo-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition duration-200 border ${
          currentPage === totalPages
            ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed"
            : "bg-white text-slate-700 border-slate-200 hover:bg-indigo-50"
        }`}
      >
        Next &gt;
      </button>
    </nav>
  );
}

export default Pagination;
