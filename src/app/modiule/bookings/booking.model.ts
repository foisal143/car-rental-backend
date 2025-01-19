import { model, Schema } from 'mongoose';
import { TBooking } from './bookings.interface';

const bookingSchema = new Schema<TBooking>(
  {
    car: {
      type: Object,
    },
    user: {
      type: Object,
    },
    date: { type: String, required: [true, 'Date is required'] },
    startTime: { type: String, required: [true, 'start time is required'] },
    endTime: { type: String, default: null },
    totalCost: { type: Number, default: 0 },
    status: { type: String, required: [true, 'status is required'] },
    payStatus: { type: String, required: [true, 'pay status is required'] },
    tranjactionId: { type: String },
  },
  { timestamps: true }
);

const Booking = model<TBooking>('Booking', bookingSchema);
export default Booking;
