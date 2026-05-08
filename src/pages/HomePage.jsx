import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { movies } from "../data/movies";
import MovieCard from "../components/molecules/MovieCard";
import MovieDetailModal from "../components/organisms/MovieDetailModal";

const categories = ["전체", "드라마", "로맨스", "다큐", "실험영화", "청춘", "새로운 발견", "높은 평점"];

function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div className="flex items-center gap-10">
        <Link to="/" className="text-3xl text-white font-black tracking-tighter hover:scale-105 transition active:scale-95 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
          MOV<span className="text-amber-500">:</span>ON
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em]">
          <Link to="/" className="text-white hover:text-white transition">Explore</Link>
          <Link to="/upload" className="hover:text-white transition">Upload</Link>
          <Link to="/mypage" className="hover:text-white transition">My Library</Link>
        </nav>
      </div>

      <div className="flex flex-1 max-w-lg mx-12 items-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-zinc-400 focus-within:bg-white/10 focus-within:border-amber-500/30 transition-all shadow-inner group">
        <span className="text-lg mr-3 opacity-40 group-focus-within:opacity-100 group-focus-within:text-amber-500 transition-all">⌕</span>
        <input
          className="w-full bg-transparent outline-none placeholder:text-zinc-600 text-white font-medium"
          placeholder="독립영화, 감독, 제작팀 검색..."
        />
        <div className="flex items-center gap-2 ml-3">
          <span className="text-[9px] font-black px-2 py-1 rounded bg-zinc-800 text-zinc-500 border border-white/5">⌘K</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Link to="/upload" className="hidden md:flex items-center gap-2 rounded-full bg-amber-500 text-black px-6 py-2.5 text-[12px] font-black shadow-[0_10px_20px_-5px_rgba(245,158,11,0.3)] transition hover:bg-amber-400 active:scale-95">
          + UPLOAD
        </Link>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-zinc-500 hover:text-white transition group">
            <span className="text-xl group-hover:scale-110 transition-transform block">🔔</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-600 border-2 border-[#0a0a0a]" />
          </button>
          <Link to="/mypage" className="h-10 w-10 rounded-full border-2 border-white/10 bg-gradient-to-br from-amber-400 to-orange-600 p-[1px] hover:scale-105 transition-transform shadow-lg overflow-hidden">
             <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center text-[11px] font-black">SY</div>
          </Link>
        </div>
      </div>
    </header>
  );
}

function HeroSection({ onMovieClick }) {
  // Safe access to featured movies with dynamic fallback
  const featuredMovie = movies.length > 0 ? movies[movies.length - 1] : null;
  const sideMovie1 = movies.length > 1 ? movies[2] : movies[0];
  const sideMovie2 = movies.length > 2 ? movies[0] : null;
  
  if (!featuredMovie) {
    return (
      <section className="mx-auto mt-8 max-w-7xl px-8 h-[400px] flex items-center justify-center bg-zinc-900 rounded-[2.5rem] border border-white/5">
        <p className="text-zinc-500 font-bold tracking-widest uppercase">No movies available</p>
      </section>
    );
  }

  const heroImage = featuredMovie?.stillImage || featuredMovie?.posterImage || "";

  return (
    <section className="mx-auto mt-8 grid max-w-7xl grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 px-8">
      <div className="relative group h-[520px] overflow-hidden rounded-[2.5rem] bg-zinc-900 shadow-2xl">
        {heroImage && (
          <img
            src={heroImage}
            alt={featuredMovie?.title}
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

        <div className="absolute bottom-12 left-12 space-y-5 max-w-xl">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-amber-500 text-black rounded text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">New Featured</span>
            <span className="text-[11px] font-bold text-amber-500/60 uppercase tracking-widest">{featuredMovie?.genres?.[0]} • {featuredMovie?.director} 감독</span>
          </div>
          <h1 className="text-6xl font-black leading-[1.05] tracking-tighter text-white drop-shadow-2xl">
            {featuredMovie?.title}
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed max-w-md font-medium">
            {featuredMovie?.description}
          </p>
          <div className="flex items-center gap-4 pt-4">
            <button 
              onClick={() => onMovieClick(featuredMovie)}
              className="px-8 py-4 bg-white text-black rounded-2xl font-black text-sm hover:bg-zinc-200 transition shadow-2xl active:scale-95"
            >
              상세 정보 보기
            </button>
            <Link to={`/movies/${featuredMovie?.id}/watch`} className="px-8 py-4 bg-white/10 text-white rounded-2xl font-black text-sm hover:bg-white/20 backdrop-blur-md transition active:scale-95">
              바로 시청하기
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {sideMovie1 && (
          <HeroSideCard
            movie={sideMovie1}
            badge="MOST LOVED"
            onClick={onMovieClick}
          />
        )}
        {sideMovie2 && (
          <HeroSideCard
            movie={sideMovie2}
            badge="EDITOR'S PICK"
            onClick={onMovieClick}
          />
        )}
      </div>
    </section>
  );
}

function HeroSideCard({ movie, badge, onClick }) {
  if (!movie) return null;
  const cardImage = movie?.posterImage || movie?.stillImage || "";

  return (
    <div 
      onClick={() => onClick(movie)}
      className="relative h-[247px] group overflow-hidden rounded-[2rem] bg-zinc-900 shadow-xl cursor-pointer block border border-white/5"
    >
      {cardImage && (
        <img src={cardImage} alt={movie?.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
      <div className="absolute bottom-6 left-6 space-y-1.5">
        <span className="px-2 py-0.5 bg-amber-500 text-black text-[9px] font-black tracking-widest rounded mb-2 inline-block uppercase shadow-lg">{badge}</span>
        <h2 className="text-2xl font-black tracking-tight text-white group-hover:text-amber-200 transition-colors">
          {movie?.title}
        </h2>
        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{movie?.genres?.[0]} • {movie?.director} 감독</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const filteredMovies = useMemo(() => {
    if (activeCategory === "전체") return movies;
    if (activeCategory === "높은 평점") {
      return [...movies].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    }
    if (activeCategory === "새로운 발견") {
      return movies.filter(m => m.tags.includes("신작") || m.id > 15);
    }
    return movies.filter(movie => movie.genres.includes(activeCategory));
  }, [activeCategory]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0a0a0a] text-white selection:bg-amber-500 selection:text-black">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-zinc-800/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative">
        <Header />
        
        <HeroSection onMovieClick={setSelectedMovie} />

        <div className="max-w-7xl mx-auto px-8 mt-24 space-y-12">
          {/* Category Filter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all duration-300 border ${
                      isActive
                        ? "bg-amber-500 text-black border-amber-500 shadow-[0_10px_20px_-5px_rgba(245,158,11,0.4)]"
                        : "text-zinc-500 border-white/5 hover:border-white/20 hover:text-white bg-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            <div className="hidden sm:flex items-center gap-2 text-zinc-500 font-bold text-[11px] uppercase tracking-widest">
              <span>Sorted by</span>
              <span className="text-white bg-white/5 px-2 py-1 rounded border border-white/10">Relevance</span>
            </div>
          </div>

          {/* Movie Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-16 pb-32">
            {filteredMovies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onClick={setSelectedMovie}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieDetailModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}

      {/* Floating Logo Ornament */}
      <div className="fixed bottom-12 left-12 text-[10vw] font-black text-white/2 pointer-events-none select-none leading-none tracking-tighter mix-blend-overlay">
        MOV:ON
      </div>
    </main>
  );
}