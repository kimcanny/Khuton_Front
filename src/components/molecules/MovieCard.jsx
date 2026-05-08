import { useState } from "react";

/**
 * MovieCard Component
 * Supports variant="full" (animated expand), "library", "preview", "compact"
 */
const MovieCard = ({ movie, onClick, variant = "full" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLibrary = variant === "library";
  const isPreview = variant === "preview";
  const isCompact = variant === "compact" || isLibrary || isPreview;
  const activeHover = isHovered && !isCompact;
  const [imageError, setImageError] = useState(false);

  const title = movie?.title || movie?.posterTitle || "Untitled Film";
  const director = movie?.director || "Unknown Director";
  const description = movie?.description || movie?.synopsis || "MOV:ON에서 소개하는 독립영화 작품입니다.";
  const rating = movie?.rating || "4.5";
  const tags = movie?.tags?.length
    ? movie.tags.slice(0, 3)
    : (movie?.genres?.slice(0, 3) || ["독립영화", "예술", "감성"]);

  const previewImage = movie?.videoThumbnail || movie?.stillImage || movie?.posterImage;
  const posterImage = movie?.posterImage || movie?.stillImage;

  const toneStyles = {
    melancholy: "from-blue-900/40 via-transparent to-black/80",
    noir: "from-zinc-900/60 via-transparent to-black/95 grayscale-[0.3]",
    warm: "from-orange-900/30 via-transparent to-black/80",
    youth: "from-emerald-900/20 via-transparent to-black/70",
    experimental: "from-purple-900/40 via-transparent to-black/90 contrast-125",
    minimal: "from-zinc-800/10 via-transparent to-black/60",
    blue: "from-indigo-900/40 via-transparent to-black/80",
    documentary: "from-stone-900/40 via-transparent to-black/80",
    romance: "from-pink-900/30 via-transparent to-black/80",
    thriller: "from-red-900/40 via-transparent to-black/95",
  };
  const currentTone = toneStyles[movie?.posterTone] || toneStyles.minimal;

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick && onClick(movie)}
      className={`relative h-[320px] transition-all duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden rounded-xl bg-zinc-950 border border-white/10 group flex
        ${activeHover
          ? "md:min-w-[520px] md:flex-[2.8] border-white/20 shadow-[0_32px_80px_rgba(0,0,0,0.5),0_0_30px_rgba(245,158,11,0.06)] z-30"
          : "flex-1 min-w-[200px] shadow-lg z-10"}
        ${isLibrary || isPreview ? "hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] !duration-300" : ""}
      `}
    >
      <div className={`absolute inset-0 z-0 bg-gradient-to-br from-white/5 via-transparent to-amber-500/5 transition-opacity duration-[520ms] pointer-events-none ${activeHover ? "opacity-100" : "opacity-0"}`} />

      {/* Poster */}
      <div className={`relative h-full shrink-0 transition-[width] duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-10 ${activeHover ? "md:w-[220px] w-full" : "w-full"}`}>
        <img
          src={posterImage}
          alt={title}
          className={`h-full w-full object-cover transition-all duration-[800ms]
            ${activeHover ? "brightness-[0.85] contrast-105 scale-110" : "brightness-100"}
            ${isLibrary && isHovered ? "brightness-[0.7] scale-105" : ""}
            ${movie?.posterTone === 'noir' ? 'grayscale-[0.2]' : ''}
          `}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${currentTone} transition-opacity duration-[520ms] ${activeHover ? "opacity-20" : "opacity-100"}`} />

        <div className={`absolute inset-0 p-5 flex flex-col justify-between pointer-events-none transition-all duration-[520ms] ${activeHover || (isLibrary && isHovered) ? "opacity-0" : "opacity-100"}`}>
          <div className="space-y-1">
            <p className="text-[8px] font-black tracking-[0.3em] text-amber-500 uppercase">{movie?.awardText || "OFFICIAL SELECTION"}</p>
            <p className="text-[11px] font-bold text-zinc-300 leading-tight italic line-clamp-2">{movie?.tagline}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[8px] font-black tracking-widest text-zinc-400 uppercase">{movie?.posterCredit}</p>
            <h3 className="text-xl font-black tracking-tighter text-white uppercase leading-tight drop-shadow-lg">{movie?.posterTitle || title}</h3>
          </div>
        </div>

        {/* Library hover overlay */}
        {isLibrary && (
          <div className={`absolute inset-0 z-20 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-black/40 to-transparent transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-black tracking-tighter text-white uppercase leading-tight">{title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">★ {rating}</span>
                  <div className="flex gap-1">
                    {tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); onClick(movie); }}
                  className="flex-1 py-2 bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-amber-400 transition transform active:scale-95"
                >
                  {movie.status === "업로드 완료" ? "반응 보기" : "보기"}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onClick(movie); }}
                  className="flex-1 py-2 bg-white/10 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-white/20 transition transform active:scale-95"
                >
                  {movie.status === "업로드 완료" ? "작품 관리" : "상세 정보"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preview panel (right side, full variant only) */}
      {!isCompact && (
        <div className={`relative flex-1 h-full overflow-hidden transition-[opacity,transform] duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col bg-zinc-950 border-l border-white/10 hidden md:flex z-20
          ${activeHover ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-1 pointer-events-none"}
        `}>
          <div className="relative h-36 w-full shrink-0 overflow-hidden bg-zinc-900">
            <div className="absolute inset-0 z-0">
              {!imageError && previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover opacity-70 transition-transform duration-1000"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black flex flex-col items-center justify-center space-y-1">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-30 text-[10px] text-white">▶</div>
                  <span className="text-[8px] font-black text-zinc-600 tracking-[0.3em] uppercase">MOV:ON PREVIEW</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <div className="w-9 h-9 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/40 text-xs transition-colors duration-[520ms] group-hover:text-amber-500 group-hover:border-amber-500/30">
                ▶
              </div>
            </div>
          </div>

          <div className={`relative z-30 -mt-12 p-6 flex-1 flex flex-col justify-between transition-[opacity,transform] duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)]
            ${isHovered ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}
          `}>
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/90 to-zinc-950 backdrop-blur-[3px] pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <div className="space-y-1.5">
                <h4 className="text-lg font-black tracking-tight text-white uppercase truncate leading-none">{title}</h4>
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  <span className="text-amber-400">{director} 감독</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-800" />
                  <div className="flex items-center gap-1 text-amber-500">
                    ★ <span className="text-zinc-300">{rating}</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] font-medium text-zinc-400 leading-relaxed line-clamp-2">{description}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {tags.slice(0, 2).map((tag, idx) => (
                  <span key={idx} className="text-[8px] font-black text-zinc-500 border border-white/5 bg-white/[0.03] px-2 py-1 rounded uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            </div>
            <div className="relative z-10 flex items-center gap-3 pt-4">
              <button
                onClick={(e) => { e.stopPropagation(); onClick(movie); }}
                className="flex-[2] h-11 bg-amber-500 text-black rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-amber-400 transition active:scale-95 shadow-lg shadow-amber-500/20"
              >
                Watch Now
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onClick(movie); }}
                className="flex-1 h-11 bg-white/5 border border-white/10 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition active:scale-95"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default MovieCard;
