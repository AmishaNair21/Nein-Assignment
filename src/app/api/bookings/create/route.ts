import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Booking from '@/models/Bookings';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Check for existing booking
    const existingBooking = await Booking.findOne({
      date: new Date(body.date),
      time: body.time
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: "This time slot is already booked" },
        { status: 409 }
      );
    }

    // Create booking
    const booking = await Booking.create({
      name: body.name,
      contact: body.contact,
      date: new Date(body.date),
      time: body.time,
      guests: body.guests
    });

    return NextResponse.json(booking);
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
