import { useParams, useNavigate } from "react-router-dom";
import { movies } from "../data/movies";
import NotFound from "./NotFound";

const FeedbackPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === parseInt(movieId));

  if (!movie) return <NotFound />;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-12 px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="flex items-center justify-between">
           <div className="space-y-2">
              <button onClick={() => navigate(-1)} className="text-zinc-500 hover:text-white transition text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                ← Back to Movie
              </button>
              <h1 className="text-4xl font-black tracking-tighter">Feedback Analytics</h1>
              <p className="text-zinc-500 font-medium">실시간 시청 반응 및 AI 감성 분석 리포트</p>
           </div>
           <div className="text-right">
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] block mb-1">Total Feedbacks</span>
              <span className="text-4xl font-black">{movie.ratingCount}</span>
           </div>
        </header>

        {/* AI Summary Card */}
        <div className="p-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl text-black shadow-2xl relative overflow-hidden">
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 blur-[60px] rounded-full" />
           <div className="relative space-y-4">
              <div className="flex items-center gap-2">
                 <span className="text-2xl">✨</span>
                 <h2 className="text-xl font-black uppercase tracking-tight">AI 감성 요약</h2>
              </div>
              <p className="text-lg font-bold leading-relaxed">
                "이 영화는 전반적으로 <span className="underline decoration-4 decoration-white/40">몽환적인 미장센</span>과 <span className="underline decoration-4 decoration-white/40">절제된 연출</span>에 대한 호평이 지배적입니다. 특히 14분대 감정 폭발 씬에서 시청자 몰입도가 가장 높았습니다."
              </p>
              <div className="flex gap-4 pt-2">
                 <div className="bg-black/10 px-4 py-2 rounded-xl border border-black/10">
                    <span className="block text-[10px] font-black uppercase opacity-60">긍정 키워드</span>
                    <span className="text-sm font-black">독창적, 몰입감, 색감</span>
                 </div>
                 <div className="bg-black/10 px-4 py-2 rounded-xl border border-black/10">
                    <span className="block text-[10px] font-black uppercase opacity-60">개선 포인트</span>
                    <span className="text-sm font-black">음향 밸런스, 중반부 템포</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Timeline Feedback */}
        <section className="space-y-6">
           <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 border-b border-white/5 pb-4">Timeline Insights</h3>
           <div className="space-y-4">
              <TimelineCard time="04:12" count={42} text="배경 음악과 화면의 조화가 환상적이라는 반응" type="positive" />
              <TimelineCard time="14:22" count={128} text="주인공의 감정 변화에 대한 집중적인 공감" type="impact" />
              <TimelineCard time="28:45" count={15} text="대사가 조금 작게 들린다는 기술적 피드백" type="improvement" />
           </div>
        </section>

        {/* Recent Reviews */}
        <section className="space-y-6">
           <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 border-b border-white/5 pb-4">Recent Reviews</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ReviewCard user="김철수" rating={5} text="독립영화에서 보기 힘든 압도적인 영상미였습니다." />
              <ReviewCard user="이영희" rating={4} text="감독님의 다음 작품이 벌써 기다려지네요. 응원합니다!" />
              <ReviewCard user="박지성" rating={5} text="삶에 대해 다시 한번 생각해보게 만드는 깊은 여운..." />
              <ReviewCard user="최유정" rating={3} text="전체적으로 좋았지만 호흡이 조금 느리게 느껴졌어요." />
           </div>
        </section>
      </div>
    </main>
  );
};

const TimelineCard = ({ time, count, text, type }) => {
  const colors = {
    positive: "border-emerald-500/30 bg-emerald-500/5 text-emerald-500",
    impact: "border-amber-500/30 bg-amber-500/5 text-amber-500",
    improvement: "border-rose-500/30 bg-rose-500/5 text-rose-500",
  };
  return (
    <div className={`p-5 rounded-2xl border flex items-center justify-between transition-all hover:scale-[1.01] ${colors[type]}`}>
       <div className="flex items-center gap-6">
          <span className="text-xl font-black font-mono">[{time}]</span>
          <p className="text-sm font-bold text-white/80">{text}</p>
       </div>
       <div className="text-right">
          <span className="block text-[10px] font-black uppercase opacity-60">Reaction</span>
          <span className="text-lg font-black">{count}</span>
       </div>
    </div>
  );
};

const ReviewCard = ({ user, rating, text }) => (
  <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-3">
     <div className="flex justify-between items-center">
        <span className="text-xs font-black uppercase tracking-widest text-zinc-400">{user}</span>
        <div className="text-amber-500 text-xs">{"★".repeat(rating)}</div>
     </div>
     <p className="text-sm text-zinc-400 leading-relaxed font-medium">"{text}"</p>
  </div>
);

export default FeedbackPage;
