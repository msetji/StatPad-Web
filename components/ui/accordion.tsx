import { useState } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="divide-y divide-gray-200">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id} className="py-4">
            <button
              type="button"
              className="w-full flex justify-between items-center text-left"
              onClick={() => setOpen(isOpen ? null : item.id)}
            >
              <span className="font-medium text-lg">{item.title}</span>
              <span className="text-primary text-2xl">{isOpen ? '-' : '+'}</span>
            </button>
            {isOpen && (
              <div className="mt-2 text-gray-600">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}