"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
 import { Calendar} from '@/components/ui/calendar';
  
const DatePicking = () => {
    const [date, setDate] = useState<Date | undefined>();
 return (
   <>
    <Dialog>
    <DialogTrigger>Date</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className='text-yellow-500 text-center'>Pick a date for your booking</DialogTitle>
        <DialogDescription >
            <Calendar 
            mode="single"
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            />
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
   </>
  
  )
}

export default DatePicking