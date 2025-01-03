/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().min(3, "Name must be more than 3 characters"),
  contact: z.string().min(10,"contact must be 10 characters").max(10, "Contact must be at least 10 characters"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  guests: z.number().min(1, "Must have at least 1 guest").max(10, "Maximum 10 guests allowed"),
});

const Bookings = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    date: "",
    time: "",
    guests: 1,
  });
  const [loading, setLoading] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([
    "12:00", "13:00", "14:00", "17:00", "18:00", "19:00", "20:00", "21:00"
  ]);
  const [showSummary, setShowSummary] = useState(false);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = bookingSchema.safeParse(formData);
    if (!result.success) {
      toast.error(result.error.errors[0]?.message || "Invalid input");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create booking');
      }
      
      setShowSummary(true);
      toast.success("Booking confirmed!");
    } catch (error) {
      toast.error("Something went wrong, please try again!");
    } finally {
      setLoading(false);
    }
  };

  if (showSummary) {
    return (
      <div className="flex min-h-screen bg-customGreen">
        <div className="m-auto w-full max-w-lg p-8 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-yellow-600 mb-6 text-center">Booking Confirmation</h2>
          <div className="space-y-4 text-yellow-700">
            <p><span className="font-semibold">Name:</span> {formData.name}</p>
            <p><span className="font-semibold">Contact:</span> {formData.contact}</p>
            <p><span className="font-semibold">Date:</span> {formData.date}</p>
            <p><span className="font-semibold">Time:</span> {formData.time}</p>
            <p><span className="font-semibold">Number of Guests:</span> {formData.guests}</p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="mt-6 w-full p-2 bg-[url('/gold.jpeg')] bg-cover bg-center text-[#001C17] font-semibold border-black border-2 rounded"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end">
      <div className="bg-customGreen w-[50%] h-screen overflow-hidden relative">
        <Image
          src="/loginPicture.jpeg"
          layout="fill"
          objectFit="cover"
          alt="dining room"
        />
      </div>

      <div className="bg-customGreen w-1/2 h-screen flex flex-col relative overflow-hidden">
        <div className="bg-[url('/gold.jpeg')] bg-cover bg-center w-1/2 h-5"></div>
        <h1 className="mt-4 text-center text-3xl text-yellow-600">
          Reserve your Table
        </h1>
        <p className="text-center text-yellow-700">
          Enter your details and confirm your booking
        </p>
        <div className="w-[60%] border-b mx-auto mt-3 border-yellow-500"></div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-6">
          <div>
            <label className="block text-sm text-yellow-500 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border border-yellow-700 bg-customGreen rounded-md focus:bg-customGreen focus:text-yellow-500 focus:border-gray-500 focus:outline-none"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-yellow-500 font-medium mb-2">
              Contact
            </label>
            <input
              type="tel"
              name="contact"
              className="w-full p-2 border border-yellow-700 bg-customGreen rounded-md focus:bg-customGreen focus:text-yellow-500 focus:border-gray-500 focus:outline-none"
              value={formData.contact}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-yellow-500 font-medium mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-2 border border-yellow-700 bg-customGreen rounded-md focus:bg-customGreen focus:text-yellow-500 focus:border-gray-500 focus:outline-none"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-yellow-500 font-medium mb-2">
              Time
            </label>
            <select
              name="time"
              className="w-full p-2 border border-yellow-700 bg-customGreen rounded-md focus:bg-customGreen focus:text-yellow-500 focus:border-gray-500 focus:outline-none"
              value={formData.time}
              onChange={handleInputChange}
              required
            >
              <option value="">Select time</option>
              {availableTimeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-yellow-500 font-medium mb-2">
              Number of Guests
            </label>
            <input
              type="number"
              name="guests"
              min="1"
              max="10"
              className="w-full p-2 border border-yellow-700 bg-customGreen rounded-md focus:bg-customGreen focus:text-yellow-500 focus:border-gray-500 focus:outline-none"
              value={formData.guests}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="mt-6 w-[40%] p-2 bg-[url('/gold.jpeg')] bg-cover bg-center text-[#001C17] font-semibold border-black border-2 rounded"
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </div>
        </form>

        <div className="absolute bottom-0 right-0 bg-[url('/gold.jpeg')] bg-cover bg-center w-1/2 h-5"></div>
      </div>
    </div>
  );
};

export default Bookings;