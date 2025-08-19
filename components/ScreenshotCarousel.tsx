import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = ['screen1.png', 'screen2.png', 'screen3.png'];

export default function ScreenshotCarousel() {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((index - 1 + images.length) % images.length);
  const next = () => setIndex((index + 1) % images.length);

  return (
    <section className="py-16" id="screenshots">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Peek the app</h2>
        <div className="relative max-w-sm mx-auto">
          <img
            src={`/screenshots/${images[index]}`}
            alt={`StatPad screenshot ${index + 1}`}
            className="w-full rounded-2xl shadow-card"
          />
          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full border shadow"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full border shadow"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full ${i === index ? 'bg-primary' : 'bg-gray-300'}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}