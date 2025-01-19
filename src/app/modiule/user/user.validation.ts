import z from 'zod';

const createUserValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'name is required'),
    image: z.string().min(1, 'image is required'),
    email: z.string().min(1, 'email is required'),
    password: z.string().min(1, 'password is required'),
    phone: z.string().min(1, 'phone number is required'),
    role: z.string().min(1, 'role is required'),
    address: z.string().min(1, 'address is required'),
  }),
});

const updateUserValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'name is required').optional(),
    email: z.string().min(1, 'email is required').optional(),
    password: z.string().min(1, 'password is required').optional(),
    phone: z.string().min(1, 'phone number is required').optional(),
    role: z.string().min(1, 'role is required').optional(),
    address: z.string().min(1, 'address is required').optional(),
  }),
});

export const userValidation = { createUserValidation, updateUserValidation };
