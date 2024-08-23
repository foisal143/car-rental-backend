import z from 'zod';

const signInValidatiaon = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

export const authValidation = { signInValidatiaon };
