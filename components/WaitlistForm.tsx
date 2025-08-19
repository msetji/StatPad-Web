"use client";
import { useState, useTransition } from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import submitWaitlist from '@/app/actions/submitWaitlist';

export default function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    startTransition(() => {
      submitWaitlist(formData).then(() => {
        setSubmitted(true);
        setName('');
        setEmail('');
      });
    });
  };

  return (
    <div id="waitlist" className="max-w-md mx-auto mt-16">
      <h3 className="text-2xl font-bold mb-4 text-center">Join the Waitlist</h3>
      {submitted ? (
        <p className="text-green-600 text-center">Thanks for joining the waitlist! We'll be in touch.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? 'Submitting...' : 'Join Waitlist'}
          </Button>
        </form>
      )}
    </div>
  );
}