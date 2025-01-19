import z from 'zod';
const createBookingValidation = z.object({
  body: z.object({
    car: z.object({}).optional(), // Adjust the schema for `car` based on its actual structure
    user: z.object({}).optional(), // Adjust the schema for `user` based on its actual structure
    date: z.string().nonempty('Date is required'),
    startTime: z.string().nonempty('Start time is required'),
    endTime: z.string().nullable().optional(),
    totalCost: z.number().nonnegative().optional(),
    status: z.string().nonempty('Status is required'),
    payStatus: z.string().nonempty('Pay status is required'),
    tranjactionId: z.string().optional(),
  }),
});

export const bookingValidations = { createBookingValidation };
