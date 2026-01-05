import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username is required")
      .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and _ allowed"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    fullname: z
      .string()
      .min(1, "is required")
      .regex(/^[a-zA-Z\s]+$/, "Only letters and spaces allowed"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/[0-9]/, "Must contain a number"),

    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

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

