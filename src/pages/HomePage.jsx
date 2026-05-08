import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { movies } from "../data/movies";
import MovieCard from "../components/molecules/MovieCard";
import MovieDetailModal from "../components/organisms/MovieDetailModal";
import EventHeroCarousel from "../components/organisms/EventHeroCarousel";

const categories = [
  "전체", 
  "드라마", 
  "로맨스", 
  "다큐", 
  "실험영화", 
  "청춘", 
  "스릴러", 
  "음악", 
  "새로운 발견", 
  "높은 평점"
];

function Header() {
  return (
    <header className="sticky top-0 z-[60] flex items-center justify-between px-8 py-4 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
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

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const filteredMovies = useMemo(() => {
    let result = movies;
    if (activeCategory === "높은 평점") {
      result = [...movies].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    } else if (activeCategory === "새로운 발견") {
      result = movies.filter(m => m.tags.includes("신작") || m.id > 15 || m.releaseDate.startsWith("2026"));
    } else if (activeCategory !== "전체") {
      result = movies.filter(movie => movie.genres.includes(activeCategory));
    }
    if (activeCategory === "새로운 발견") {
      return movies.filter(m => m.tags.includes("신작") || m.releaseDate.startsWith("2026"));
    }
    if (activeCategory === "청춘") {
       return movies.filter(m => m.genres.includes("청춘") || m.tags.includes("청춘") || m.tags.includes("Youth"));
    }
    if (activeCategory === "스릴러") {
       return movies.filter(m => m.genres.includes("스릴러") || m.genres.includes("미스터리") || m.genres.includes("호러"));
    }
    if (activeCategory === "음악") {
       return movies.filter(m => m.genres.includes("음악") || m.tags.includes("음악") || m.tags.includes("Underground Music"));
    }
    
    return movies.filter(movie => movie.genres.includes(activeCategory));
  }, [activeCategory]);

  // Group movies into rows for smooth horizontal expansion behavior
  // This ensures neighboring cards push each other naturally within the same flex container.
  const movieRows = useMemo(() => {
    const rows = [];
    const itemsPerRow = 5; 
    for (let i = 0; i < filteredMovies.length; i += itemsPerRow) {
      rows.push(filteredMovies.slice(i, i + itemsPerRow));
    }
    return rows;
  }, [filteredMovies]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-amber-500 selection:text-black">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-zinc-800/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative">
        
        {/* Main Hero: Event Carousel */}
        <div className="max-w-7xl mx-auto px-8 mt-12">
          <EventHeroCarousel />
        </div>

        <div className="max-w-7xl mx-auto px-8 mt-24 space-y-16 overflow-x-hidden">
          {/* Category Filter Row */}
          <div className="flex items-center justify-between border-b border-white/5 pb-8">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-7 py-3 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all duration-300 border ${
                      isActive
                        ? "bg-amber-500 text-black border-amber-500 shadow-[0_10px_30px_-5px_rgba(245,158,11,0.4)]"
                        : "text-zinc-500 border-white/5 hover:border-white/20 hover:text-white bg-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            <div className="hidden lg:flex items-center gap-2 text-zinc-500 font-bold text-[11px] uppercase tracking-[0.3em]">
              <span className="w-2 h-2 rounded-full bg-amber-500/40 animate-pulse" />
              <span>Cinematic Curation</span>
            </div>
          </div>

          {/* Movie Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-10 gap-y-20 pb-40">
            {filteredMovies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onClick={setSelectedMovie}
              />
            ))}
            
            {filteredMovies.length === 0 && (
              <div className="py-40 flex flex-col items-center text-center space-y-6">
                 <div className="text-6xl opacity-10 grayscale">🎬</div>
                 <div className="space-y-2">
                    <p className="text-zinc-300 font-black tracking-widest uppercase text-sm">해당하는 작품을 찾을 수 없습니다.</p>
                    <p className="text-zinc-600 font-bold text-xs">다른 카테고리를 선택하거나 검색어를 변경해 보세요.</p>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Movie Detail Modal Overlay */}
      {selectedMovie && (
        <MovieDetailModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#0a0a0a]/90 backdrop-blur-2xl border-t border-white/5 flex md:hidden items-center justify-around px-4 z-[100]">
        {['Explore', 'Search', 'Upload', 'Library'].map((item) => (
          <button key={item} className="flex flex-col items-center gap-1">
             <div className="w-5 h-5 bg-zinc-800 rounded-sm opacity-40" />
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-tighter">{item}</span>
          </button>
        ))}
      </nav>
    </main>
  );
}