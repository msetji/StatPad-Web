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
    title: 'How do I join the waitlist?',
    content: (
      <p>
        Simply fill out the waitlist form above with your name and email. We’ll notify you when the web app is ready!
      </p>
    ),
  },
  {
    id: '3',
    title: 'When will StatPad launch?',
    content: (
      <p>
        We’re working hard to launch the web version soon. Join the waitlist to be the first to know about our release timeline.
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