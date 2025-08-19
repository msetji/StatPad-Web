import { z } from 'zod';

export const waitlistSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
});

export const contactSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: 'Valid email is required' }),
  message: z.string().min(1, { message: 'Message is required' }),
});