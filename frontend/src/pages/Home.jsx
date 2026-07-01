import { useEffect, useState, useRef } from "react";
import SearchBar from "../components/SearchBar";
import NoticeCard from "../components/NoticeCard";
import StatsSection from "../components/StatsSection";
import Pagination from "../components/Pagination";
import { getNotices } from "../services/noticeApi";

function Home() {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");

  const noticesRef = useRef(null);

  const categories = [
    "All",
    "Academic",
    "Exam",
    "Placement",
    "Hostel",
    "Scholarship",
    "Administrative",
    "Research",
    "Event",
    "General"
  ];

  useEffect(() => {
    loadNotices();
  }, [selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, priorityFilter]);

  async function loadNotices() {
    try {
      setLoading(true);
      const categoryParam = selectedCategory === "All" ? "" : selectedCategory;
      const data = await getNotices(categoryParam);
      
      setNotices(
        data.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filtered = notices.filter((notice) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      notice.title?.toLowerCase().includes(searchLower) ||
      notice.summary?.toLowerCase().includes(searchLower) ||
      notice.category?.toLowerCase().includes(searchLower) ||
      notice.publishedBy?.toLowerCase().includes(searchLower);

    const matchesPriority = priorityFilter === "High" ? notice.priority === "High" : true;

    return matchesSearch && matchesPriority;
  });

  const parseNoticeDate = (dStr) => {
    if (!dStr) return new Date(0);
    const parts = dStr.split("-");
    if (parts.length === 3) {
      return new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
    }
    return new Date(dStr);
  };

  const sortedNotices = [...filtered].sort((a, b) => {
    if (sortBy === "priority") {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      const weightA = priorityOrder[a.priority] || 0;
      const weightB = priorityOrder[b.priority] || 0;
      if (weightB !== weightA) {
        return weightB - weightA;
      }
    }
    const dateA = parseNoticeDate(a.date || a.createdAt);
    const dateB = parseNoticeDate(b.date || b.createdAt);
    return dateB - dateA;
  });

  const filteredNotices = sortedNotices;
  const noticesPerPage = 9;

  const indexOfLastNotice =
    currentPage * noticesPerPage;

  const indexOfFirstNotice =
    indexOfLastNotice - noticesPerPage;

  const currentNotices =
    filteredNotices.slice(
      indexOfFirstNotice,
      indexOfLastNotice
    );

  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);
  const startRange = filteredNotices.length === 0 ? 0 : indexOfFirstNotice + 1;
  const endRange = Math.min(indexOfLastNotice, filteredNotices.length);

  const scrollToNotices = () => {
    noticesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHighPriorityClick = () => {
    setPriorityFilter("High");
    scrollToNotices();
  };

  const handleAllNoticesClick = () => {
    setPriorityFilter("All");
    scrollToNotices();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="text-center py-12 sm:py-16 max-w-4xl mx-auto flex flex-col items-center animate-fade-in">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-slate-950 tracking-tight leading-tight">
          AI-Powered <span className="font-sans font-extrabold bg-gradient-to-r from-indigo-600 to-indigo-850 bg-clip-text text-transparent">noice</span> Assistant
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-2xl leading-relaxed">
          Stay updated with university notices, deadlines, action items and AI-generated summaries instantly.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleAllNoticesClick}
            className="px-6 py-3 rounded-xl font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition duration-150 text-sm"
          >
            View Notices
          </button>
          <button
            onClick={handleHighPriorityClick}
            className="px-6 py-3 rounded-xl font-bold bg-white text-slate-700 border border-slate-205 hover:bg-slate-50 shadow-sm transition duration-150 text-sm"
          >
            High Priority Notices
          </button>
        </div>
      </section>

      {/* Trust Indicator Banner */}
      <div className="bg-indigo-50/30 border border-indigo-100/60 rounded-2xl py-3 px-4 mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-xs text-indigo-700 font-semibold text-center">
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          ✓ AI Summarized
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-200 hidden md:inline"></span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Last Updated: Realtime
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-200 hidden md:inline"></span>
        <span>
          {notices.length} Notices Analyzed
        </span>
      </div>

      {/* Stats/KPI section */}
      <StatsSection notices={notices} />

      {/* Filter and Search Section */}
      <div ref={noticesRef} className="scroll-mt-20 border-t border-slate-100 pt-10">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-8">
          <div className="w-full md:w-96">
            <SearchBar search={search} setSearch={setSearch} />
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            {priorityFilter !== "All" && (
              <button
                onClick={() => setPriorityFilter("All")}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200 flex items-center gap-1 hover:bg-red-105 transition-colors cursor-pointer"
              >
                Clear Priority Filter (High)
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-205 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer shadow-sm"
              >
                <option value="date">Date of Notice</option>
                <option value="priority">Priority (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories pills filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-150 ${
                selectedCategory === category
                  ? "bg-indigo-600 text-white border-indigo-650 shadow-md shadow-indigo-100 transform scale-105"
                  : "bg-white text-slate-600 hover:bg-slate-50 border-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Notices dashboard cards list */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white border border-slate-100 rounded-2xl shadow-sm max-w-md mx-auto my-8">
            <span className="text-5xl block mb-4" role="img" aria-label="Inbox Empty">📭</span>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No notices found</h3>
            <p className="text-slate-500 text-sm">
              Try changing your filters or searching with other keywords.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentNotices.map((notice) => (
                <NoticeCard key={notice._id} notice={notice} />
              ))}
            </div>
            {filteredNotices.length > 0 && (
              <div className="flex flex-col items-center mt-10 gap-3">
                <p className="text-sm text-slate-500 font-medium">
                  Showing {startRange}–{endRange} of {filteredNotices.length} notices
                </p>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between h-64 animate-pulse">
      <div>
        <div className="flex gap-2 mb-4">
          <div className="h-5 w-16 bg-slate-200 rounded-full"></div>
          <div className="h-5 w-12 bg-slate-200 rounded-full"></div>
        </div>
        <div className="h-5 w-3/4 bg-slate-200 rounded mb-2"></div>
        <div className="h-5 w-1/2 bg-slate-200 rounded mb-4"></div>
        <div className="h-3 w-full bg-slate-150 rounded mb-2"></div>
        <div className="h-3 w-full bg-slate-150 rounded mb-2"></div>
        <div className="h-3 w-2/3 bg-slate-150 rounded"></div>
      </div>
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="h-4 w-20 bg-slate-200 rounded"></div>
        <div className="h-4 w-16 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
}

export default Home;