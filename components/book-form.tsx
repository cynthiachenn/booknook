'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

interface Book {
  title: string;
  author: string;
  publication_year: number;
  user_id: string;
}

interface BookFormProps {
  onBookAdded: () => void;
}

export default function BookForm({ onBookAdded }: BookFormProps) {
  const [book, setBook] = useState<Book>({
    title: '',
    author: '',
    publication_year: new Date().getFullYear(),
    user_id: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setBook(prev => ({ ...prev, user_id: user.id }));
      }
    };
    getUser();
  }, [supabase.auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('You must be logged in to add a book');
      }

      const { error } = await supabase
        .from('books')
        .insert([{ ...book, user_id: user.id }]);

      if (error) {
        throw error;
      }

      // Reset form
      setBook({
        title: '',
        author: '',
        publication_year: new Date().getFullYear(),
        user_id: user.id,
      });
      
      setSuccess('Book added successfully!');
      onBookAdded(); // Call the refresh callback
    } catch (err: any) {
      console.error('Error adding book:', err);
      setError(err.message || 'Failed to add book. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-foreground">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
          className="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-foreground">
          Author
        </label>
        <input
          type="text"
          id="author"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
          className="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="year" className="block text-sm font-medium text-foreground">
          Publication Year
        </label>
        <input
          type="number"
          id="year"
          value={book.publication_year}
          onChange={(e) => setBook({ ...book, publication_year: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm"
          min="1000"
          max={new Date().getFullYear()}
          required
          disabled={isSubmitting}
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      {success && (
        <div className="text-green-500 text-sm">{success}</div>
      )}

      <button
        type="submit"
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting || !book.user_id}
      >
        {isSubmitting ? 'Adding...' : 'Add Book'}
      </button>
    </form>
  );
} 