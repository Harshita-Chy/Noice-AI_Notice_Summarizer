import { Link } from "react-router-dom";

function NoticeCard({ notice }) {
  const getPriorityStyles = (p) => {
    switch (p) {
      case "High":
        return "bg-red-50 text-red-705 border-red-200";
      case "Medium":
        return "bg-amber-50 text-amber-705 border-amber-200";
      case "Low":
      default:
        return "bg-emerald-50 text-emerald-705 border-emerald-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between h-full group">
      <div>
        {/* Top row badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {notice.category && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-150">
              {notice.category}
            </span>
          )}
          {notice.priority && (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getPriorityStyles(notice.priority)}`}>
              {notice.priority}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-serif font-semibold text-slate-900 line-clamp-2 group-hover:text-indigo-650 transition-colors duration-200 leading-snug">
          {notice.title}
        </h3>

        {/* Summary */}
        {notice.summary ? (
          <p className="text-slate-500 text-xs sm:text-sm mt-2.5 line-clamp-3 leading-relaxed">
            {notice.summary}
          </p>
        ) : (
          <p className="text-slate-400 text-xs sm:text-sm italic mt-2.5">
            No summary available. Notice link contains the document details.
          </p>
        )}
      </div>

      {/* Bottom metadata */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
        {notice.publishedBy && (
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
            <span className="font-semibold text-slate-500 truncate">By: {notice.publishedBy}</span>
          </div>
        )}
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-slate-350" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {notice.date}
          </span>
          <Link
            to={`/notice/${notice._id}`}
            className="text-xs font-bold text-indigo-600 group-hover:text-indigo-850 inline-flex items-center gap-1.5 transition-colors duration-200"
          >
            View Details
            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NoticeCard;