function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200/80 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
        <div>
          <span className="font-bold text-slate-800 tracking-tight">
            noice
          </span>
          <p className="text-xs text-slate-400 mt-1">© {new Date().getFullYear()} noice. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium">
          <span>React</span>
          <span className="text-slate-300">•</span>
          <span>Node.js</span>
          <span className="text-slate-300">•</span>
          <span>MongoDB</span>
          <span className="text-slate-300">•</span>
          <span>Gemini AI</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
