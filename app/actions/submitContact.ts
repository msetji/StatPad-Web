'use server';

import { addContactMessage } from '@/app/api/_utils/store';
import { sendContactNotification } from '@/app/api/_utils/email';

export default async function submitContact(formData: FormData) {
  const name = (formData.get('name') || '').toString();
  const email = (formData.get('email') || '').toString();
  const message = (formData.get('message') || '').toString();
  await addContactMessage({ name, email, message });
  await sendContactNotification(name, email, message);
}