'use client';

import { useEffect, useState } from 'react';

interface Stat {
  label: string;
  value: number;
}

interface StatsData {
  waitlistCount: number;
  betaUsersCount: number;
  clipsCount: number;
}

export default function StatsStrip() {
  const [realStats, setRealStats] = useState<StatsData>({
    waitlistCount: 0,
    betaUsersCount: 0,
    clipsCount: 0,
  });
  const [counts, setCounts] = useState([0, 0, 0]);

  // Fetch real stats from API
  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then((data: StatsData) => {
        setRealStats(data);
      })
      .catch(console.error);
  }, []);

  const stats: Stat[] = [
    { label: 'App Downloads', value: realStats.waitlistCount },
    { label: 'Active Users', value: realStats.betaUsersCount },
    { label: 'Clips Shared', value: realStats.clipsCount },
  ];

  // Animate counters
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
  }, [realStats]);

  return (
    <section className="py-12 bg-primary/5" id="stats">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
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