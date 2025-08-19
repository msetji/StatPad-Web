import { useEffect, useState } from 'react';

interface Stat {
  label: string;
  value: number;
}

const stats: Stat[] = [
  { label: 'Players on Waitlist', value: 5000 },
  { label: 'Games Recorded', value: 12000 },
  { label: 'Clips Shared', value: 8000 },
  { label: 'Badges Earned', value: 3200 },
];

export default function StatsStrip() {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((value, i) => {
          const diff = stats[i].value - value;
          if (diff <= 0) return stats[i].value;
          return Math.min(stats[i].value, value + Math.ceil(diff / 20));
        })
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-primary/5" id="stats">
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex flex-col items-center">
            <span className="text-4xl font-bold text-primary">
              {counts[i].toLocaleString()}
            </span>
            <span className="text-gray-700 mt-1 text-sm font-medium uppercase tracking-wide">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}