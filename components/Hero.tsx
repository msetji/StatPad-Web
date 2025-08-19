import Button from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="w-full py-24 md:py-32 bg-white text-center flex flex-col items-center px-6">
      {/* Temp logo */}
      <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-primary text-white text-4xl font-bold">
        SP
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 max-w-3xl">
        Track your game with <span className="text-primary">StatPad</span>
      </h1>
      <p className="text-gray-600 max-w-2xl mb-8 text-lg">
        StatPad makes it easy to capture your sports highlights, follow teammates and climb the leaderboards. Join our waitlist to get early access or reach out to learn more.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#waitlist" className="no-underline">
          <Button variant="default">Join Waitlist</Button>
        </a>
        <a href="#contact" className="no-underline">
          <Button variant="outline">Contact Us</Button>
        </a>
      </div>
    </section>
  );
}