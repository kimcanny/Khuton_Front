import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * CommunityPostPage Component
 * Displays the detail view of a community post and handles application interaction.
 */
const CommunityPostPage = () => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleApply = () => {
    setShowSuccessModal(true);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pb-32">
      <div className="max-w-4xl mx-auto px-8 pt-16 space-y-12">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate("/community")}
          className="group flex items-center gap-3 text-zinc-500 hover:text-white transition-colors"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          <span className="text-[11px] font-black uppercase tracking-widest">목록으로 돌아가기</span>
        </button>

        {/* Post Content Area */}
        <article className="bg-white/2 border border-white/5 rounded-[2.5rem] overflow-hidden">
          {/* Post Header */}
          <header className="p-10 border-b border-white/5 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-black px-2 py-0.5 rounded border border-amber-500/30 text-amber-500 uppercase tracking-widest">상영회</span>
                <span className="text-[9px] font-black px-1.5 py-0.5 bg-amber-500 text-black rounded-sm uppercase tracking-tighter">모집중</span>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-medium text-zinc-600 uppercase tracking-widest">
                <span>조회 128</span>
                <span className="w-1 h-1 rounded-full bg-zinc-800" />
                <span>댓글 12</span>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tighter leading-tight">학생 독립영화 상영회 참가 신청 안내</h1>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-[10px] font-black text-black">M</div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-white">MOV:ON 운영팀</span>
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">2026.05.09</span>
                </div>
              </div>
            </div>
          </header>

          {/* Post Body */}
          <div className="p-10 space-y-10">
            <div className="space-y-6 text-zinc-300 leading-relaxed font-medium">
              <p>MOV:ON에서 학생 독립영화 상영회를 진행합니다.</p>
              <p>온라인에 업로드된 작품 중 일부를 오프라인 공간에서 함께 감상하고, 감독과 관객이 직접 이야기를 나누는 시간을 마련했습니다.</p>
              
              <div className="bg-white/5 rounded-2xl p-8 space-y-4 border border-white/5">
                <h3 className="text-sm font-black text-amber-500 uppercase tracking-widest border-b border-white/5 pb-3">행사 정보</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-4">
                    <span className="text-zinc-500 w-16 shrink-0 font-bold uppercase tracking-widest text-[10px]">일정</span>
                    <span className="text-white font-bold">2026.05.18</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-zinc-500 w-16 shrink-0 font-bold uppercase tracking-widest text-[10px]">장소</span>
                    <span className="text-white font-bold">서울 독립영화 전용관</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-zinc-500 w-16 shrink-0 font-bold uppercase tracking-widest text-[10px]">대상</span>
                    <span className="text-white font-bold">학생 감독, 영화 제작팀, 관객 피드백 참여자</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-zinc-500 w-16 shrink-0 font-bold uppercase tracking-widest text-[10px]">모집 인원</span>
                    <span className="text-white font-bold">40명</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-zinc-500 w-16 shrink-0 font-bold uppercase tracking-widest text-[10px]">참가비</span>
                    <span className="text-emerald-500 font-black">무료</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-zinc-500 w-16 shrink-0 font-bold uppercase tracking-widest text-[10px]">프로그램</span>
                    <span className="text-white font-medium">단편 상영, 감독과의 대화, 장면별 피드백 세션</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                 <h3 className="text-sm font-black text-white uppercase tracking-widest">참가 안내</h3>
                 <p className="text-sm">신청자는 행사 전날 안내 메시지를 받게 됩니다.</p>
                 <p className="text-sm">상영 후에는 MOV:ON 피드백 시스템을 통해 작품별 감상평을 남길 수 있습니다.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-8">
              <button 
                onClick={handleApply}
                className="flex-1 py-5 bg-amber-500 text-black font-black uppercase tracking-widest rounded-2xl shadow-2xl hover:bg-amber-400 transition transform active:scale-[0.98]"
              >
                참가 신청하기
              </button>
              <button 
                onClick={() => navigate("/community")}
                className="px-10 py-5 bg-white/5 border border-white/10 text-zinc-400 font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition"
              >
                목록
              </button>
            </div>
          </div>
        </article>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowSuccessModal(false)} />
          <div className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-[2rem] p-10 shadow-2xl space-y-8 animate-in fade-in zoom-in duration-300">
             <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-3xl mx-auto">
                ✨
             </div>
             <div className="text-center space-y-3">
                <h2 className="text-2xl font-black tracking-tighter uppercase">상영회 참가 신청이 완료되었습니다!</h2>
                <p className="text-sm font-medium text-zinc-400 leading-relaxed">
                   신청 내역은 알림에서 확인할 수 있습니다.
                </p>
             </div>
             <div className="space-y-3">
                <button 
                   onClick={() => setShowSuccessModal(false)}
                   className="w-full py-4 bg-amber-500 text-black font-black uppercase tracking-widest rounded-2xl hover:bg-amber-400 transition transform active:scale-95 shadow-lg shadow-amber-500/20"
                >
                   확인
                </button>
                <button 
                   onClick={() => navigate("/")}
                   className="w-full py-4 bg-white/5 border border-white/10 text-zinc-400 font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition"
                >
                   홈으로 이동
                </button>
             </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CommunityPostPage;
