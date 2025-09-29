import Accordion, { AccordionItem } from '@/components/ui/accordion';

const items: AccordionItem[] = [
  {
    id: '1',
    title: 'What is StatPad?',
    content: (
      <p>
        StatPad is a sports‑social platform that lets you track your stats, share highlights, connect with other players and climb the leaderboards.
      </p>
    ),
  },
  {
    id: '2',
    title: 'How do I download StatPad?',
    content: (
      <p>
        StatPad is available now on the App Store! Click the download button above or visit the App Store to get started.
      </p>
    ),
  },
  {
    id: '3',
    title: 'Is StatPad available on other platforms?',
    content: (
      <p>
        Currently, StatPad is available on iOS via the App Store. We're working on expanding to other platforms in the future.
      </p>
    ),
  },
  {
    id: '4',
    title: 'Will StatPad be free?',
    content: (
      <p>
        Our core features will be free. We may offer premium tiers in the future for advanced analytics and perks.
      </p>
    ),
  },
];

export default function FAQ() {
  return (
    <section className="py-16 bg-gray-50" id="faq">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto">
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}