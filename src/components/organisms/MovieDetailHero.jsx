const MovieDetailHero = ({ movie }) => {
  return (
    <section className="relative px-8 pt-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
        {/* Poster */}
        <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.7)] group">
          <img 
            src={movie.posterImage} 
            alt={movie.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Still Image / Video Thumbnail */}
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group cursor-pointer bg-zinc-900">
          <img 
            src={movie.stillImage} 
            alt="Still cut" 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-4xl pl-2 transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:border-white/50 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]">
              ▶
            </button>
          </div>

          <div className="absolute bottom-8 left-8 flex items-center gap-2">
             <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[11px] font-bold tracking-widest text-white/70 uppercase">Main Trailer</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetailHero;
