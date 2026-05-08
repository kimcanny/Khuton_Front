import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { movies } from "../data/movies";
import NotFound from "./NotFound";
import movieVideo from "../assets/movie.mp4";

const WatchPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === parseInt(movieId));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movieId]);

  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e) => {
    if (videoRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const clickedPercent = x / rect.width;
      const newTime = clickedPercent * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!movie) return <NotFound />;

  return (
    <main className="flex flex-col min-h-screen bg-white text-black font-sans overflow-x-hidden">
      {/* 1. Full Viewport Video Section */}
      <section className="relative w-full h-screen shrink-0 bg-black overflow-hidden group">
        {/* Overlaid Top Header */}
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-8 bg-gradient-to-b from-black/60 to-transparent">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:scale-110 transition p-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button className="text-white hover:scale-110 transition p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          </button>
        </div>

        {/* Video Background */}
        {/* Video or Image Background */}
        {movie.title === "소란스러운 밤" ? (
          <video
            ref={videoRef}
            src={movieVideo}
            autoPlay
            muted
            loop
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full object-cover opacity-80"
          />
        ) : (
          <img
            src={movie.stillImage}
            alt="Movie Still"
            className="w-full h-full object-cover opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Playback Controls Overlay */}
        <div className="absolute bottom-12 left-0 right-0 px-12 space-y-6">
          {/* Progress Bar */}
          <div 
            className="relative h-1.5 w-full bg-white/20 rounded-full cursor-pointer group"
            onClick={handleProgressClick}
          >
            <div 
              className="absolute h-full bg-red-600 rounded-full" 
              style={{ width: `${progressPercent}%` }} 
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-xl -ml-2" 
              style={{ left: `${progressPercent}%` }}
            />
          </div>
        </div>
      </section>

      {/* 2. Scrollable Content Area */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Movie Summary Header */}
        <div className="flex justify-between items-start mb-12">
          <div className="space-y-4">
            <h1 className="text-3xl font-black tracking-tight text-zinc-900">{movie.title}</h1>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-200 rounded-full overflow-hidden">
                <div className="w-full h-full bg-zinc-300" />
              </div>
              <div className="text-sm">
                <p className="font-bold text-zinc-500">{movie.director} 이름 / {movie.team} 이름</p>
              </div>
            </div>
          </div>
          <div className="text-right space-y-2">
            <div className="flex gap-1 justify-end">
              {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} width="32" height="32" viewBox="0 0 24 24" fill={i <= 4 ? "#FBBF24" : "none"} stroke="#FBBF24" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              ))}
            </div>
            <p className="text-xs font-bold text-zinc-400">평점 {movie.rating} / {movie.ratingCount}명 평가</p>
          </div>
        </div>

        {/* Review Input Section */}
        <div className="bg-zinc-200 p-10 rounded-lg mb-16 text-zinc-500 font-bold text-lg">
          작품에 대한 평가를 남겨보세요
        </div>

        {/* Detail Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
          {/* Left: Community & Reviews */}
          <div className="space-y-8">
            {/* Regular Review & Reply */}
            <div className="space-y-4">
              <div className="bg-zinc-200 p-6 rounded-lg relative">
                <p className="font-bold text-zinc-700">&lt;{movie.director}&gt; 영화에는 감동이 있다</p>
                <span className="absolute bottom-4 right-6 text-xs font-bold text-zinc-500">김아무개</span>
              </div>
              <div className="flex justify-end">
                <div className="bg-zinc-300 p-6 rounded-lg w-[85%] relative">
                  <p className="font-bold text-zinc-700">감사합니다</p>
                  <span className="absolute bottom-4 right-6 text-xs font-bold text-zinc-500">{movie.director}👑</span>
                </div>
              </div>
            </div>

            {/* Donation Review */}
            <div className="bg-red-100 border-red-200 p-8 rounded-lg relative space-y-4">
              <div className="text-red-500 font-black text-xl flex items-center gap-2">
                500,000,000 ₩ <span className="text-sm">₩</span>
              </div>
              <p className="font-bold text-zinc-700 leading-relaxed pr-20">
                영화를 보니 연출이 정말 좋았다는 생각을 하게 되네요. <br />
                어떻게 저렇게 창의적인 연출을?ㄷㄷㄷ <br />
                영화 많이 만들어주세요~~~.
              </p>
              <span className="absolute bottom-6 right-8 text-xs font-bold text-zinc-500 flex items-center gap-1">
                김규현 <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
              </span>
            </div>

            {/* Spoiler Review */}
            <div className="bg-zinc-200 p-6 rounded-lg relative">
              <p className="font-bold text-zinc-400 blur-[4px] select-none">
                나는 스포일러 맨 이 영화에서 감독은 죽는다
              </p>
              <div className="absolute inset-0 flex items-center justify-center font-black text-zinc-600">
                (스포일러)
              </div>
              <span className="absolute bottom-4 right-6 text-[10px] font-bold text-zinc-400">지욱이형이포함됨</span>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-12">
            {/* Director's Word */}
            <div className="bg-zinc-200 p-8 rounded-lg space-y-6">
              <div className="inline-block bg-white px-4 py-1 rounded text-xs font-black text-zinc-900">
                감독의 한마디
              </div>
              <p className="text-sm font-bold text-zinc-600 leading-relaxed">
                무환경, 사회문제를 비롯한 다양성 영화의 경우 <br />
                관객을 찾아가기가 쉽지 않은 현실에서 무비블록은 <br />
                창작자에게 많은 기회와 의욕을 줄 수 있는 멋진 서비스다.
              </p>
            </div>

            {/* Ad Section */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-zinc-400 text-right uppercase tracking-tighter">
                수익의 일부는 영화 제작 지원에 사용됩니다
              </p>
              <div className="bg-zinc-200 aspect-[4/3] rounded-lg flex items-center justify-center">
                <span className="font-bold text-zinc-400 text-xl tracking-widest">광고</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WatchPage;

