'use client';

import BookForm from '@/components/book-form';
import BookList from '@/components/book-list';
import { useState } from 'react';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleBookAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to BookNook</h1>
        <p className="text-xl text-muted-foreground">
          Track and manage your reading journey
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Add a New Book</h2>
          <BookForm onBookAdded={handleBookAdded} />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Books</h2>
          <BookList key={refreshKey} />
        </div>
      </div>
    </div>
  );
}
