import { useParams, Link } from "react-router-dom";
import { movies } from "../data/movies";
import MovieCard from "../components/molecules/MovieCard";

const CreatorProfilePage = () => {
  const { creatorId } = useParams();
  
  // For demo, we'll assume the first director in our list is the creator
  const creator = {
    id: creatorId,
    name: "이지후",
    role: "Film Director / Producer",
    bio: "현실과 환상의 경계를 탐구하는 독립영화 제작자입니다. 인간의 내면적인 고독과 치유를 주제로 시각적인 서사를 구축하는 작업에 집중하고 있습니다.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    tags: ["시각주의자", "감성연출", "독립영화상 수상"],
    stats: { works: 8, followers: "2.4K", reviews: 450 }
  };

  const creatorMovies = movies.slice(0, 4); // Mock works

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Profile Header */}
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 via-[#0a0a0a] to-[#0a0a0a]" />
        <div className="relative max-w-6xl mx-auto px-8 pt-32 flex flex-col md:flex-row items-end gap-8">
           <div className="w-48 h-48 rounded-[3rem] overflow-hidden border-4 border-[#0a0a0a] shadow-2xl shrink-0">
              <img src={creator.image} alt={creator.name} className="w-full h-full object-cover" />
           </div>
           <div className="flex-1 pb-4 space-y-4">
              <div className="space-y-1">
                 <span className="text-xs font-black text-amber-500 uppercase tracking-[0.2em]">{creator.role}</span>
                 <h1 className="text-5xl font-black tracking-tighter">{creator.name}</h1>
              </div>
              <div className="flex gap-6">
                 <StatItem label="Works" value={creator.stats.works} />
                 <StatItem label="Followers" value={creator.stats.followers} />
                 <StatItem label="Avg. Rating" value="4.8" />
              </div>
           </div>
           <div className="pb-4 flex gap-3">
              <button className="px-8 py-3 bg-white text-black rounded-xl font-black text-xs hover:bg-zinc-200 transition">FOLLOW</button>
              <button className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-black text-xs hover:bg-white/10 transition">MESSAGE</button>
           </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-20">
         {/* Works Section */}
         <section className="space-y-10">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
               <h2 className="text-xl font-black tracking-tight">Featured Works</h2>
               <button className="text-xs font-black text-zinc-500 uppercase tracking-widest hover:text-white transition">View All</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
               {creatorMovies.map(movie => (
                 <MovieCard key={movie.id} movie={movie} />
               ))}
            </div>
         </section>

         {/* Info Sidebar */}
         <aside className="space-y-12">
            <div className="space-y-4">
               <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">Biography</h3>
               <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                  {creator.bio}
               </p>
            </div>

            <div className="space-y-4">
               <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">Creator Tags</h3>
               <div className="flex flex-wrap gap-2">
                  {creator.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black tracking-widest text-zinc-300 uppercase">
                      {tag}
                    </span>
                  ))}
               </div>
            </div>

            <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-3xl space-y-4">
               <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-500">Contact</h3>
               <p className="text-xs font-bold text-zinc-400">jihulover@movon.com</p>
               <div className="flex gap-4 pt-2">
                  <span className="text-xl cursor-pointer hover:text-amber-500 transition">📸</span>
                  <span className="text-xl cursor-pointer hover:text-amber-500 transition">🎥</span>
                  <span className="text-xl cursor-pointer hover:text-amber-500 transition">🐦</span>
               </div>
            </div>
         </aside>
      </div>
    </main>
  );
};

const StatItem = ({ label, value }) => (
  <div>
     <span className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</span>
     <span className="text-xl font-black">{value}</span>
  </div>
);

export default CreatorProfilePage;
