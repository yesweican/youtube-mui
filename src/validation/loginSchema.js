import { z } from 'zod';

const usernameRegex = /^[a-zA-Z0-9.@_-]+$/;

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(3, 'Username or email is required')
    .max(100, 'Input is too long')
    .refine(
      (value) =>
        z.string().email().safeParse(value).success ||
        usernameRegex.test(value),
      {
        message: 'Must be a valid email or username',
      }
    ),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password is too long'),
});
