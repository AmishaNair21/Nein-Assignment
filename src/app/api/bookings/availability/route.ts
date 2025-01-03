// app/api/bookings/availability/route.ts
import { NextResponse } from 'next/server';
import {connectDB} from '@/lib/db';
import Booking from '@/models/Bookings';

export async function GET(request: Request) {
  try {
    await connectDB();
    
   
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    
    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

   
    const allTimeSlots = [
      "12:00", "13:00", "14:00", "17:00", "18:00", "19:00", "20:00", "21:00"
    ];

  
    const existingBookings = await Booking.find({
      date: {
        $gte: new Date(date + 'T00:00:00.000Z'),
        $lt: new Date(date + 'T23:59:59.999Z')
      }
    }).select('time');

   
    const bookedSlots = existingBookings.map(booking => booking.time);


    const availableSlots = allTimeSlots.filter(slot => !bookedSlots.includes(slot));

    return NextResponse.json({ availableSlots });
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}