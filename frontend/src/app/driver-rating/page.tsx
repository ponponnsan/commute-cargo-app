"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Send, Star } from 'lucide-react';
import { useState } from 'react';

const CommuteCargaDriverRating = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    console.log('Rating:', rating, 'Feedback:', feedback);
    // Here you would typically send this data to your backend
  };

  return (
    <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
      <CardHeader className="bg-red-500 text-white flex items-center p-4">
        <h2 className="text-xl font-bold flex-grow">Rate Your Driver</h2>
        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
          <img src="/api/placeholder/40/40" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="flex items-center justify-center my-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
            <img src="/api/placeholder/96/96" alt="Driver" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold">Tanaka Yuki</h3>
          <p className="text-gray-600">Commute Cargo Driver</p>
        </div>

        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-10 w-10 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              onClick={() => handleRatingChange(star)}
            />
          ))}
        </div>

        <Textarea
          placeholder="Share your experience with this driver..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="mb-6"
          rows={4}
        />

        <Button
          onClick={handleSubmit}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg flex items-center justify-center"
        >
          <Send className="h-5 w-5 mr-2" />
          Submit Feedback
        </Button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Your feedback helps us improve the Commute Cargo experience for everyone.
        </p>
      </CardContent>
    </Card>
  );
};

export default CommuteCargaDriverRating;
