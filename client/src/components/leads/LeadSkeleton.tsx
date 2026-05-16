const LeadSkeleton = () => {
  return (
    <div className="space-y-3 rounded-2xl border border-white/5 bg-ink-800/70 p-6">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className="h-4 w-full animate-pulse rounded bg-ink-700" />
      ))}
    </div>
  );
};

export default LeadSkeleton;
