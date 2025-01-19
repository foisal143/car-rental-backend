import z from 'zod';
const createCarValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    image: z.string().min(1, 'image is required'),
    description: z.string().min(1, 'Description is required'),
    color: z.string().min(1, 'Color is required'),
    isElectric: z.boolean(),
    status: z
      .enum(['available', 'unavailable'])
      .optional()
      .default('available'),
    features: z
      .array(z.string())
      .nonempty('Features must have at least one item'),
    pricePerHour: z
      .number()
      .positive('Price per hour must be a positive number'),
    isDeleted: z.boolean().default(false),
  }),
});

const updateCarValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    color: z.string().min(1, 'Color is required').optional(),
    isElectric: z.boolean().optional(),
    status: z.enum(['available', 'unavailable']).optional(),
    features: z
      .array(z.string())
      .nonempty('Features must have at least one item')
      .optional(),
    pricePerHour: z
      .number()
      .positive('Price per hour must be a positive number')
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});
export const carValidations = { createCarValidation, updateCarValidation };
