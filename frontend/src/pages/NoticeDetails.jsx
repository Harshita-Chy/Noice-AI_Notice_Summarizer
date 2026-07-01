import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getNoticeById } from "../services/noticeApi";

function NoticeDetails() {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotice();
  }, [id]);

  async function loadNotice() {
    try {
      setLoading(true);
      const data = await getNoticeById(id);
      setNotice(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex flex-col justify-center items-center h-96">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-3"></div>
        <p className="text-slate-500 font-semibold">Loading details...</p>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center bg-white border border-slate-150 rounded-2xl shadow-md my-16">
        <span className="text-5xl block mb-4" role="img" aria-label="Not Found">⚠️</span>
        <h1 className="text-2xl font-bold text-slate-805 mb-2">Notice Not Found</h1>
        <p className="text-slate-505 text-sm mb-6">The notice could not be retrieved from the database.</p>
        <Link to="/" className="inline-flex items-center px-4 py-2 text-sm font-bold text-white bg-indigo-650 hover:bg-indigo-700 rounded-xl transition duration-150">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const getPriorityStyles = (p) => {
    switch (p) {
      case "High":
        return "bg-red-50 text-red-700 border border-red-200";
      case "Medium":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "Low":
      default:
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 animate-fade-in">
      {/* Back button */}
      <Link to="/" className="text-indigo-600 hover:text-indigo-805 mb-8 inline-flex items-center gap-1.5 text-sm font-bold transition duration-150">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to notices
      </Link>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-10 flex flex-col gap-6 sm:gap-8">
        
        {/* Badges and Publication Info */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex flex-wrap gap-2">
            {notice.category && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                {notice.category}
              </span>
            )}
            {notice.priority && (
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getPriorityStyles(notice.priority)}`}>
                {notice.priority}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <svg className="w-4 h-4 text-slate-350" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {notice.date}
          </div>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-slate-950 leading-tight">
            {notice.title}
          </h1>
          {notice.publishedBy && (
            <p className="text-slate-400 text-xs sm:text-sm font-semibold mt-3 flex items-center gap-1.5">
              <span className="font-bold text-slate-500">Published By:</span>
              {notice.publishedBy}
            </p>
          )}
        </div>

        {/* AI Summary Banner */}
        {notice.summary && (
          <div className="bg-indigo-50/30 border border-indigo-100/60 p-6 rounded-2xl">
            <div className="flex items-center gap-2 text-indigo-750 font-bold text-sm mb-3">
              <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI-Generated Summary
            </div>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {notice.summary}
            </p>
          </div>
        )}

        {/* Two column checklist layout for Important Dates & Action items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-8">
          
          {/* Timeline/List for Important Dates */}
          <div>
            <h2 className="text-lg font-serif font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Important Dates
            </h2>
            {notice.importantDates && notice.importantDates.length > 0 ? (
              <div className="relative border-l border-slate-100 pl-4 ml-2 space-y-6">
                {notice.importantDates.map((item, idx) => (
                  <div key={item._id || idx} className="relative">
                    <div className="absolute -left-[21px] mt-1.5 w-3.5 h-3.5 rounded-full border-2 border-indigo-600 bg-white"></div>
                    <span className="text-xs font-bold text-indigo-600">{item.date}</span>
                    <p className="text-slate-700 text-sm font-semibold mt-0.5">{item.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm italic">No specific deadlines mentioned in this notice.</p>
            )}
          </div>

          {/* Action Required Checklist */}
          <div>
            <h2 className="text-lg font-serif font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Action Required
            </h2>
            {notice.actionItems && notice.actionItems.length > 0 ? (
              <ul className="space-y-3">
                {notice.actionItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center flex-shrink-0 mt-0.5 text-indigo-600">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 text-sm italic">No action items detected.</p>
            )}
          </div>
        </div>

        {/* Footer original link */}
        <div className="border-t border-slate-100 pt-6 mt-2 flex justify-between items-center">
          <a
            href={notice.link}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition duration-150 text-sm shadow-sm"
          >
            Open Original Notice Document
            <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default NoticeDetails;