const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 animate-fade-in">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-2 border-white/5" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-brand-500" />
      </div>
      <span className="text-sm text-slate-400">Loading...</span>
    </div>
  );
};

export default Loader;
