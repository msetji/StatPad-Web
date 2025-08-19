'use server';

import { addWaitlistEntry } from '@/app/api/_utils/store';
import { sendWaitlistConfirmation } from '@/app/api/_utils/email';

export default async function submitWaitlist(formData: FormData) {
  const name = (formData.get('name') || '').toString();
  const email = (formData.get('email') || '').toString();
  await addWaitlistEntry({ name, email, source: 'web' });
  await sendWaitlistConfirmation(name, email);
}