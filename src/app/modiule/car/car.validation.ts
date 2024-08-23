import z from 'zod';
const createCarValidation = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  color: z.string().min(1, 'Color is required'),
  isElectric: z.boolean(),
  status: z.enum(['available', 'unavailable']).optional().default('available'),
  features: z
    .array(z.string())
    .nonempty('Features must have at least one item'),
  pricePerHour: z.number().positive('Price per hour must be a positive number'),
  isDeleted: z.boolean().default(false),
});

export const carValidations = { createCarValidation };
