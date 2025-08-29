import { z } from 'zod';

export const CustomerSchema = z
  .object({
    name: z.string().trim().min(1, 'Please enter your name.'),
    email: z
      .string()
      .trim()
      .optional()
      .transform((v) => (v === '' ? undefined : v))
      .refine((v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), {
        message: 'Please enter a valid email.',
      }),
    phone: z
      .string()
      .trim()
      .optional()
      .transform((v) => (v === '' ? undefined : v))
      .refine((v) => !v || /^[0-9+()\-.\s]{7,}$/.test(v), {
        message: 'Please enter a valid phone number.',
      }),
  })
  .refine((data) => !!data.email || !!data.phone, {
    message: 'Provide at least one contact method: email or phone.',
    path: ['_contact'], // synthetic path for form-level error
  });

export type CustomerForm = z.infer<typeof CustomerSchema>;
