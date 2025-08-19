import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Video, Users, Medal } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const features: Feature[] = [
  {
    title: 'Track Everything',
    description: 'Record your points, rebounds, assists and more with a tap.',
    icon: LineChart,
  },
  {
    title: 'Share Highlights',
    description: 'Upload highlight videos straight from your phone and showcase your moves.',
    icon: Video,
  },
  {
    title: 'Build Your Squad',
    description: 'Follow friends, teammates and pros to see how you stack up.',
    icon: Users,
  },
  {
    title: 'Earn Badges',
    description: 'Climb the leaderboards and collect badges as you improve.',
    icon: Medal,
  },
];

export default function FeatureCards() {
  return (
    <section className="py-16 bg-gray-50" id="features">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Why StatPad?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ title, description, icon: Icon }) => (
            <Card key={title} className="text-center flex flex-col items-center">
              <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="w-6 h-6" />
              </div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}