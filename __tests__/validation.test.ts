import { waitlistSchema, contactSchema } from '../lib/validation';

describe('Validation schemas', () => {
  it('validates waitlist input', () => {
    expect(() =>
      waitlistSchema.parse({ name: 'Jane Doe', email: 'jane@example.com' })
    ).not.toThrow();
  });

  it('throws on invalid waitlist email', () => {
    expect(() =>
      waitlistSchema.parse({ name: 'Jane', email: 'not-an-email' })
    ).toThrow();
  });

  it('validates contact input', () => {
    expect(() =>
      contactSchema.parse({ name: 'John Doe', email: 'john@example.com', message: 'Hi there' })
    ).not.toThrow();
  });

  it('throws on missing contact message', () => {
    expect(() =>
      contactSchema.parse({ name: 'John', email: 'john@example.com' })
    ).toThrow();
  });
});