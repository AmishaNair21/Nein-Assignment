import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters']
  },
  contact: {
    type: String,
    required: [true, 'Contact is required'],
    minlength: [10, 'Contact must be at least 10 characters']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  time: {
    type: String,
    required: [true, 'Time is required']
  },
  guests: {
    type: Number,
    required: [true, 'Number of guests is required'],
    min: [1, 'Minimum 1 guest required'],
    max: [10, 'Maximum 10 guests allowed']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;