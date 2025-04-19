import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

export default function BookingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  // This will store booking data
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Assuming the API will handle creating the booking
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // handle successful booking
        alert('Booking successful');
      } else {
        // handle failure (e.g., slot already booked)
        alert('Error: Unable to process booking');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Bookings</h1>

        {/* Booking Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              {...register('name', { required: 'Name is required' })}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="John Doe"
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Invalid email address' },
              })}
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Select Date
            </label>
            <input
              {...register('date', { required: 'Date is required' })}
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.date && <p className="text-sm text-red-600">{errors.date.message}</p>}
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Select Time Slot
            </label>
            <select
              {...register('time', { required: 'Time slot is required' })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Time</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              {/* Add more time slots */}
            </select>
            {errors.time && <p className="text-sm text-red-600">{errors.time.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-400"
            >
              {isLoading ? 'Booking...' : 'Book Now'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
