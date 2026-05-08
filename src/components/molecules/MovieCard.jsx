import { Link } from "react-router-dom";

/**
 * Enhanced MovieCard Component
 * Renders a movie as a cinematic film poster with typography overlays.
 * Supports different poster tones (melancholy, noir, warm, etc.)
 */
const MovieCard = ({ movie, onClick }) => {
  // Styles based on posterTone
  const toneStyles = {
    melancholy: "from-blue-900/40 via-transparent to-black/80",
    noir: "from-zinc-900/60 via-transparent to-black/95 grayscale-[0.3]",
    warm: "from-orange-900/30 via-transparent to-black/80",
    youth: "from-emerald-900/20 via-transparent to-black/70",
    experimental: "from-purple-900/40 via-transparent to-black/90 contrast-125",
    minimal: "from-zinc-800/10 via-transparent to-black/60",
    blue: "from-indigo-900/40 via-transparent to-black/80",
    documentary: "from-stone-900/40 via-transparent to-black/80",
  };

  const currentTone = toneStyles[movie?.posterTone] || toneStyles.minimal;

  return (
    <div 
      onClick={() => onClick && onClick(movie)}
      className="group cursor-pointer block relative animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      {/* Poster Container */}
      <div className={`relative aspect-[10/15] overflow-hidden rounded-xl bg-zinc-900 shadow-2xl transition-all duration-500 group-hover:shadow-[0_20px_50px_-10px_rgba(245,158,11,0.2)] group-hover:-translate-y-2 border border-white/5`}>
        {/* Poster Image */}
        <img
          src={movie?.posterImage || movie?.stillImage}
          alt={movie?.title}
          className={`h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 ${movie?.posterTone === 'noir' ? 'grayscale-[0.4]' : ''}`}
        />
        
        {/* Gradient Overlay for Text Readability */}
        <div className={`absolute inset-0 bg-gradient-to-t ${currentTone} transition-opacity duration-500`} />
        
        {/* Poster Internal Typography */}
        <div className="absolute inset-0 p-5 flex flex-col justify-between pointer-events-none">
           {/* Top: Tagline & Award */}
           <div className="space-y-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
              <p className="text-[8px] font-black tracking-[0.2em] text-amber-500 uppercase drop-shadow-md">
                 {movie?.awardText}
              </p>
              <p className="text-[10px] font-bold text-zinc-300 leading-tight italic drop-shadow-lg">
                 {movie?.tagline ? `"${movie.tagline}"` : ""}
              </p>
           </div>

           {/* Middle/Bottom: Title & Credits */}
           <div className="space-y-2">
              <div className="space-y-0.5">
                 <p className="text-[8px] font-black tracking-widest text-zinc-400 uppercase">
                    {movie?.posterCredit}
                 </p>
                 <h3 className={`font-black tracking-tighter text-white uppercase drop-shadow-2xl transition-all duration-500 group-hover:scale-105 origin-left
                    ${movie?.posterTone === 'minimal' ? 'text-lg tracking-normal' : 'text-2xl'}
                 `}>
                    {movie?.posterTitle || movie?.title}
                 </h3>
              </div>
              
              <div className="flex items-center gap-2 pt-1">
                 <div className="h-[1px] w-4 bg-amber-500/50" />
                 <p className="text-[9px] font-black tracking-widest text-zinc-500 uppercase">
                    MOV:ON STUDENT FILM FESTIVAL
                 </p>
              </div>
           </div>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
           <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white text-xl scale-50 group-hover:scale-100 transition-transform duration-500">
              ▶
           </div>
        </div>
      </div>

      {/* Metadata Area (Outside Poster) */}
      <div className="mt-4 px-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h4 className="line-clamp-1 text-[14px] font-black tracking-tight text-white group-hover:text-amber-200 transition-colors">
            {movie?.title}
          </h4>
          <div className="flex items-center gap-1 text-[11px] font-black text-amber-500 shrink-0">
            <span>★</span>
            <span className="text-zinc-300">{movie?.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest border border-white/5 px-1.5 py-0.5 rounded-sm">
            {movie?.genres?.[0]}
          </span>
          <span className="text-[10px] font-bold text-zinc-600 tracking-tight">
            {movie?.director} 감독
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
