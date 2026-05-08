import { useParams, useNavigate, Link } from "react-router-dom";
import { movies } from "../data/movies";
import NotFound from "./NotFound";

const WatchPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === parseInt(movieId));

  if (!movie) return <NotFound />;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Cinematic Player Header */}
      <div className="bg-[#0a0a0a] border-b border-white/5 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate(-1)} className="text-zinc-500 hover:text-white transition text-xl">✕</button>
          <div className="space-y-0.5">
            <h1 className="text-sm font-black tracking-tight">{movie.title}</h1>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{movie.director} 감독 • {movie.genres[0]}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <Link to={`/movies/${movie.id}/feedback`} className="px-4 py-2 bg-amber-500 text-black text-[11px] font-black rounded-lg hover:bg-amber-400 transition">
             LEAVE FEEDBACK
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] h-[calc(100vh-69px)]">
        {/* Player Area */}
        <div className="relative bg-black flex items-center justify-center overflow-hidden">
          <img src={movie.stillImage} alt="Movie Still" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Mock Playback UI */}
          <div className="absolute inset-0 flex flex-col justify-between p-8">
            <div className="flex justify-end">
               <span className="px-2 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded text-[10px] font-bold">1080P HD</span>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-center">
                <button className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-4xl hover:scale-110 transition">▶</button>
              </div>
              
              <div className="space-y-4">
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden cursor-pointer group">
                   <div className="h-full bg-amber-500 w-[35%] group-hover:bg-amber-400 transition-all relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform" />
                   </div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-black text-zinc-500 uppercase tracking-widest">
                  <span>14:22 / 42:10</span>
                  <div className="flex gap-6">
                    <button className="hover:text-white transition">Subtitles</button>
                    <button className="hover:text-white transition">Settings</button>
                    <button className="hover:text-white transition">Fullscreen</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Commentary / Comments */}
        <div className="bg-[#0a0a0a] border-l border-white/5 flex flex-col">
          <div className="p-6 border-b border-white/5">
             <h2 className="text-xs font-black uppercase tracking-widest text-amber-500">Live Commentary</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
             <CommentaryItem time="04:12" user="이지후 감독" text="이 장면은 실제 새벽 3시에 가로등 아래에서 촬영되었습니다. 인공적인 조명을 최대한 배제했죠." isDirector />
             <CommentaryItem time="08:45" user="김영화" text="색감이 너무 예뻐요. 필터 사용하신 건가요?" />
             <CommentaryItem time="12:20" user="박평론" text="숏의 구도가 굉장히 인상적입니다. 감정선이 잘 느껴지네요." />
             <CommentaryItem time="14:02" user="이지후 감독" text="방금 지나간 그림자는 의도된 연출입니다. 주인공의 불안함을 상징하죠." isDirector />
          </div>
          <div className="p-6 border-t border-white/5">
             <div className="relative">
                <input 
                  type="text" 
                  placeholder="장면 리액션 남기기..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-amber-500/50 transition-all"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500 text-xs font-black">SEND</button>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const CommentaryItem = ({ time, user, text, isDirector }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-black text-amber-500 font-mono">[{time}]</span>
      <span className={`text-[11px] font-black ${isDirector ? 'text-white' : 'text-zinc-500'} uppercase tracking-wider`}>
        {user} {isDirector && <span className="text-[9px] bg-amber-500 text-black px-1 rounded ml-1">DIRECTOR</span>}
      </span>
    </div>
    <p className="text-[12px] text-zinc-400 leading-relaxed font-medium">{text}</p>
  </div>
);

export default WatchPage;
