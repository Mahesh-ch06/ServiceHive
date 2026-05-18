const LeadSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-ink-800/50 animate-fade-in">
      {/* Header */}
      <div className="flex gap-4 bg-ink-700/40 px-4 py-3">
        {[80, 60, 60, 70, 50].map((w, i) => (
          <div key={i} className="h-3 rounded bg-white/5 animate-shimmer" style={{ width: `${w}px` }} />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className="flex items-center gap-4 border-t border-white/[0.03] px-4 py-4">
          {/* Avatar */}
          <div className="h-9 w-9 shrink-0 rounded-full bg-white/5 animate-shimmer" />
          {/* Name + email */}
          <div className="flex flex-1 flex-col gap-1.5">
            <div className="h-3 w-28 rounded bg-white/5 animate-shimmer" />
            <div className="h-2.5 w-40 rounded bg-white/[0.03] animate-shimmer" />
          </div>
          {/* Status */}
          <div className="h-6 w-16 rounded-full bg-white/5 animate-shimmer" />
          {/* Source */}
          <div className="h-3 w-16 rounded bg-white/5 animate-shimmer" />
          {/* Date */}
          <div className="h-3 w-20 rounded bg-white/5 animate-shimmer" />
          {/* Actions */}
          <div className="flex gap-2">
            <div className="h-7 w-7 rounded-lg bg-white/5 animate-shimmer" />
            <div className="h-7 w-7 rounded-lg bg-white/5 animate-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeadSkeleton;
