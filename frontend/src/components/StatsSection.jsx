function StatsSection({ notices }) {
  const totalNotices = notices.length;
  const highPriority = notices.filter(n => n.priority === 'High').length;
  const examNotices = notices.filter(n => n.category === 'Exam').length;

  // Format today's date to match NSUT format "DD-MM-YYYY"
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const todayStr = `${dd}-${mm}-${yyyy}`;
  const todayNotices = notices.filter(n => n.date === todayStr).length;

  const stats = [
    {
      label: "Total Notices",
      value: totalNotices,
      icon: (
        <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      bg: "bg-indigo-50/50 border border-indigo-100",
    },
    {
      label: "High Priority",
      value: highPriority,
      icon: (
        <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      bg: "bg-red-50/50 border border-red-100",
    },
    {
      label: "Exam Notices",
      value: examNotices,
      icon: (
        <svg className="w-5 h-5 text-amber-605" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      bg: "bg-amber-50/50 border border-amber-100",
    },
    {
      label: "Today's Notices",
      value: todayNotices,
      icon: (
        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      bg: "bg-emerald-50/50 border border-emerald-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`${stat.bg} p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-between`}
        >
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{stat.value}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm flex-shrink-0">
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsSection;
