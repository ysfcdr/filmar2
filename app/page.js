'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch('/api/scrape');
        const data = await res.json();
        if (data.success) {
          setMovies(data.movies);
        }
      } catch (err) {
        console.error("Veri çekilemedi:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <main className="min-h-screen bg-neutral-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-red-600 text-center">Film Sitem</h1>

      {loading ? (
        <p className="text-center text-gray-400">Filmler yükleniyor, bekle knk...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {movies.map((movie, index) => (
            <div key={index} className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition duration-300">
              <img src={movie.poster} alt={movie.title} className="w-full h-72 object-cover" />
              <div className="p-3">
                <h2 className="text-sm font-semibold truncate">{movie.title}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
