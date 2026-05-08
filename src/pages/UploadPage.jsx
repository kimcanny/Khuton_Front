import { useState } from "react";
import MovieCard from "../components/molecules/MovieCard";

const UploadPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    director: "신연호",
    genres: ["독립영화"],
    description: "",
    rating: "0.0",
    posterImage: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=800&q=80",
    tags: []
  });

  const previewMovie = {
    id: 999,
    ...formData,
    genres: formData.genres.length > 0 ? formData.genres : ["Genre"],
    tags: formData.tags.length > 0 ? formData.tags : ["Preview Tag"]
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-20 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-20">
        
        {/* Upload Form */}
        <div className="space-y-12">
          <header className="space-y-2">
             <h1 className="text-5xl font-black tracking-tighter">New Project</h1>
             <p className="text-zinc-500 font-medium">당신의 영화를 MOV:ON 독립영화 아카이브에 등록하세요.</p>
          </header>

          <form className="space-y-10">
             {/* Basic Info */}
             <div className="space-y-6">
                <div className="grid gap-2">
                   <label className="text-[11px] font-black uppercase tracking-widest text-zinc-500">Project Title</label>
                   <input 
                      type="text" 
                      placeholder="영화 제목을 입력하세요"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-amber-500/50 transition-all font-bold"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                   />
                </div>

                <div className="grid gap-2">
                   <label className="text-[11px] font-black uppercase tracking-widest text-zinc-500">One-line Description</label>
                   <input 
                      type="text" 
                      placeholder="프로젝트를 한 줄로 설명해 주세요"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-amber-500/50 transition-all font-bold"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                   />
                </div>
             </div>

             {/* Asset Upload */}
             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                   <label className="text-[11px] font-black uppercase tracking-widest text-zinc-500">Poster Image</label>
                   <div className="aspect-[3/4] rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 hover:border-amber-500/30 transition-colors cursor-pointer bg-white/2">
                      <span className="text-3xl">🖼️</span>
                      <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500">Upload Poster</span>
                   </div>
                </div>
                <div className="space-y-3">
                   <label className="text-[11px] font-black uppercase tracking-widest text-zinc-500">Video File</label>
                   <div className="aspect-[3/4] rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 hover:border-amber-500/30 transition-colors cursor-pointer bg-white/2">
                      <span className="text-3xl">🎞️</span>
                      <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500">Upload Video</span>
                   </div>
                </div>
             </div>

             {/* Tags & Details */}
             <div className="space-y-6">
                <div className="grid gap-2">
                   <label className="text-[11px] font-black uppercase tracking-widest text-zinc-500">Tags (Comma separated)</label>
                   <input 
                      type="text" 
                      placeholder="여름, 청춘, 독립영화..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-amber-500/50 transition-all font-bold"
                      onChange={(e) => setFormData({...formData, tags: e.target.value.split(",").map(t => t.trim())})}
                   />
                </div>
                <div className="grid gap-2">
                   <label className="text-[11px] font-black uppercase tracking-widest text-zinc-500">Synopsis</label>
                   <textarea 
                      placeholder="영화의 줄거리를 입력하세요"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-amber-500/50 transition-all font-bold min-h-[150px] resize-none"
                   />
                </div>
             </div>

             <button className="w-full py-5 bg-amber-500 text-black font-black uppercase tracking-widest rounded-2xl shadow-2xl hover:bg-amber-400 transition transform active:scale-[0.98]">
                Publish Project
             </button>
          </form>
        </div>

        {/* Real-time Preview */}
        <div className="relative">
           <div className="sticky top-32 space-y-8">
              <div className="space-y-2">
                 <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-500">Live Preview</h3>
                 <p className="text-[12px] font-bold text-zinc-500">홈 화면에 표시될 카드 디자인을 확인하세요.</p>
              </div>
              <div className="max-w-[300px] mx-auto">
                 <MovieCard movie={previewMovie} />
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                 <h4 className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Quality Check</h4>
                 <div className="space-y-2">
                    <CheckItem label="Poster Aspect Ratio" status={true} />
                    <CheckItem label="Video Bitrate (Min 10Mbps)" status={false} />
                    <CheckItem label="Tag Legibility" status={true} />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
};

const CheckItem = ({ label, status }) => (
  <div className="flex items-center justify-between">
     <span className="text-[11px] font-medium text-zinc-400">{label}</span>
     <span className={status ? "text-emerald-500" : "text-rose-500"}>{status ? "✓" : "✕"}</span>
  </div>
);

export default UploadPage;
