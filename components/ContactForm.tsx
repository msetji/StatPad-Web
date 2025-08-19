"use client";
import { useState, useTransition } from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import submitContact from '@/app/actions/submitContact';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    startTransition(() => {
      submitContact(formData).then(() => {
        setSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
      });
    });
  };

  return (
    <div id="contact" className="max-w-md mx-auto mt-16 mb-16">
      <h3 className="text-2xl font-bold mb-4 text-center">Contact Us</h3>
      {submitted ? (
        <p className="text-green-600 text-center">Thanks for reaching out! We'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            name="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Textarea
            name="message"
            placeholder="Your message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      )}
    </div>
  );
}