'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

interface Book {
  id: string;
  title: string;
  author: string;
  publication_year: number;
  created_at: string;
  user_id: string;
}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('You must be logged in to view books');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBooks(data || []);
    } catch (err: any) {
      console.error('Error fetching books:', err);
      setError(err.message || 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading books...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (books.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No books logged yet. Add your first book!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="p-4 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
        >
          <h3 className="font-semibold text-lg">{book.title}</h3>
          <p className="text-muted-foreground">by {book.author}</p>
          <p className="text-sm text-muted-foreground">
            Published in {book.publication_year}
          </p>
        </div>
      ))}
    </div>
  );
} 