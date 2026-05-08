import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CommunityPostModal from "../components/organisms/CommunityPostModal";

const POSTS_PER_PAGE = 10;

const NOTICE_POSTS = [
  {
    id: "screening-info",
    category: "상영회",
    title: "학생 독립영화 상영회 참가 신청 안내",
    author: "MOV:ON 운영팀",
    date: "2026.05.09",
    views: 128,
    comments: 12,
    isNotice: true,
    status: "모집중",
  },
];

const INITIAL_NORMAL_POSTS = [
  { id: 101, category: "상영회", title: "6월 단편영화 합동 상영회 참가팀 모집", author: "김민지", date: "2026.05.09", views: 87, comments: 5, status: "모집중" },
  { id: 102, category: "상영회", title: "신촌 소극장 독립영화 밤 상영 안내", author: "이서현", date: "2026.05.08", views: 214, comments: 11, status: "예정" },
  { id: 103, category: "상영회", title: "학생 감독 3인전 관객 신청 받습니다", author: "박준호", date: "2026.05.08", views: 66, comments: 4, status: "모집중" },
  { id: 104, category: "상영회", title: "졸업작품 오프라인 시사회 일정 공유", author: "최소리", date: "2026.05.07", views: 153, comments: 8 },
  { id: 201, category: "팀원 모집", title: "단편영화 촬영 보조 구합니다", author: "한지우", date: "2026.05.09", views: 45, comments: 3, status: "모집중" },
  { id: 202, category: "팀원 모집", title: "단편영화 〈먼지의 방향〉 촬영팀 추가 모집합니다", author: "이지혜", date: "2026.05.08", views: 45, comments: 3, status: "진행중" },
  { id: 203, category: "팀원 모집", title: "주말 야외 촬영 배우 2명 모집", author: "윤도현", date: "2026.05.08", views: 92, comments: 7, status: "모집중" },
  { id: 204, category: "팀원 모집", title: "편집 같이 해주실 분 찾습니다", author: "정유진", date: "2026.05.07", views: 38, comments: 2, status: "모집중" },
  { id: 205, category: "팀원 모집", title: "영화 음악 작업 가능한 분 계신가요?", author: "강하늘", date: "2026.05.07", views: 61, comments: 6, status: "모집중" },
  { id: 206, category: "팀원 모집", title: "조명 장비 다뤄본 스태프 모집합니다", author: "오세린", date: "2026.05.06", views: 29, comments: 1, status: "마감" },
  { id: 301, category: "피드백", title: "실험영화 〈푸른 방〉 편집본 피드백 부탁드려요", author: "최소리", date: "2026.05.08", views: 62, comments: 8 },
  { id: 302, category: "피드백", title: "첫 장면 몰입감 피드백 부탁드립니다", author: "문채원", date: "2026.05.09", views: 44, comments: 3, status: "요청중" },
  { id: 303, category: "피드백", title: "엔딩이 너무 설명적인지 봐주세요", author: "김민지", date: "2026.05.08", views: 77, comments: 9, status: "요청중" },
  { id: 304, category: "피드백", title: "대사 없는 장면 길이 의견 받고 싶습니다", author: "이서현", date: "2026.05.07", views: 33, comments: 4 },
  { id: 305, category: "피드백", title: "포스터 문구가 작품이랑 어울리는지 궁금합니다", author: "박준호", date: "2026.05.07", views: 51, comments: 6, status: "요청중" },
  { id: 306, category: "피드백", title: "러프컷 보고 장면별 의견 남겨주실 분", author: "한지우", date: "2026.05.06", views: 28, comments: 2 },
  { id: 401, category: "영화제", title: "제24회 캠퍼스 단편 영화제 출품 일정 공유", author: "영화학도", date: "2026.05.07", views: 89, comments: 1 },
  { id: 402, category: "영화제", title: "청년 단편영화제 출품 마감 공유", author: "윤도현", date: "2026.05.09", views: 175, comments: 14, status: "공유" },
  { id: 403, category: "영화제", title: "2026 대학생 영화제 일정 정리", author: "정유진", date: "2026.05.08", views: 240, comments: 18, status: "공유" },
  { id: 404, category: "영화제", title: "독립영화 공모전 제출 서류 질문", author: "강하늘", date: "2026.05.07", views: 56, comments: 7 },
  { id: 405, category: "영화제", title: "장르 단편 영화제 출품 조건 공유", author: "오세린", date: "2026.05.06", views: 43, comments: 3, status: "공유" },
  { id: 501, category: "자유", title: "첫 장편 다큐멘터리 완성 소감", author: "박준호", date: "2026.05.07", views: 31, comments: 5 },
  { id: 502, category: "자유", title: "촬영 전날 잠 안 올 때 다들 뭐 하시나요", author: "문채원", date: "2026.05.09", views: 118, comments: 16 },
  { id: 503, category: "자유", title: "밤샘 편집할 때 듣는 음악 추천해주세요", author: "김민지", date: "2026.05.08", views: 95, comments: 13 },
  { id: 504, category: "자유", title: "혼자 단편 찍어본 분 있나요", author: "이서현", date: "2026.05.08", views: 72, comments: 9 },
  { id: 505, category: "자유", title: "영화 상영 후 관객 반응 들으면 어떤 기분인가요", author: "최소리", date: "2026.05.07", views: 143, comments: 11 },
  { id: 506, category: "자유", title: "학교 장비 대여 팁 공유합니다", author: "한지우", date: "2026.05.06", views: 58, comments: 6 },
  { id: 507, category: "자유", title: "오늘 본 단편 중 가장 좋았던 장면", author: "윤도현", date: "2026.05.05", views: 37, comments: 4 },
];

// ─── Post detail mini-modal ───────────────────────────────────────────────────
const PostDetailModal = ({ post, onClose }) => {
  if (!post) return null;
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-7 py-5 border-b border-white/10 gap-4">
          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black px-2 py-0.5 rounded border border-white/10 text-zinc-500">
                {post.category}
              </span>
              {post.isNew && (
                <span className="text-[9px] font-black px-2 py-0.5 rounded bg-amber-500 text-black">NEW</span>
              )}
            </div>
            <h2 className="text-base font-black tracking-tight text-white leading-snug">{post.title}</h2>
            <p className="text-xs text-zinc-600 font-medium">
              {post.author} · {post.date} · 조회 {post.views}
            </p>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition text-lg leading-none shrink-0">✕</button>
        </div>
        <div className="px-7 py-6">
          <p className="text-sm text-zinc-300 font-medium leading-relaxed whitespace-pre-wrap">
            {post.content || "내용이 없습니다."}
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Main CommunityPage ───────────────────────────────────────────────────────
const CommunityPage = () => {
  const [activeCategory, setActiveCategory] = useState("전체");
  // Notices and normal posts are kept separate so notices can never be displaced
  const [normalPosts, setNormalPosts] = useState(INITIAL_NORMAL_POSTS);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [detailPost, setDetailPost] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const categories = ["전체", "상영회", "팀원 모집", "피드백", "영화제", "자유"];

  // New posts go to the top of normalPosts — never above notices
  const handleNewPost = useCallback((newPost) => {
    setNormalPosts((prev) => [{ ...newPost, isNotice: false }, ...prev]);
    setShowWriteModal(false);
    setPage(1);
  }, []);

  const handleRowClick = (post) => {
    if (post.id === "screening-info") {
      navigate("/community/post/screening");
    } else if (post.content !== undefined || post.isNew) {
      setDetailPost(post);
    }
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setPage(1);
  };

  // Notices shown at top only when they match the active category (or 전체)
  const visibleNotices = useMemo(() =>
    NOTICE_POSTS.filter(
      (p) => activeCategory === "전체" || p.category === activeCategory
    ),
    [activeCategory]
  );

  // Filter normal posts by category
  const filteredNormal = useMemo(() => {
    if (activeCategory === "전체") return normalPosts;
    return normalPosts.filter((p) => p.category === activeCategory);
  }, [normalPosts, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredNormal.length / POSTS_PER_PAGE));
  const pagedNormal = filteredNormal.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pb-32">
      <div className="max-w-5xl mx-auto px-6 pt-16 space-y-10">

        {/* Header */}
        <div className="flex items-end justify-between border-b border-white/5 pb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tighter uppercase">MOV:ON 커뮤니티</h1>
            <p className="text-zinc-500 font-bold text-sm">
              상영회, 팀원 모집, 피드백 세션, 영화제 정보를 함께 나누는 공간입니다.
            </p>
          </div>
          <button
            onClick={() => setShowWriteModal(true)}
            className="px-6 py-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-amber-500/20 transition active:scale-95 text-amber-400 hover:text-amber-300"
          >
            글쓰기
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat
                ? "bg-amber-500 text-black shadow-[0_8px_20px_-5px_rgba(245,158,11,0.3)]"
                : "bg-white/5 text-zinc-500 hover:text-zinc-300"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Board */}
        <div className="w-full border border-white/10 rounded-2xl overflow-hidden">
          {/* Table header */}
          <div className="hidden md:flex items-center px-6 py-3 border-b border-white/10 bg-zinc-950/80 text-[10px] font-black uppercase tracking-widest text-zinc-600 gap-4">
            <div className="w-12 text-center shrink-0">번호</div>
            <div className="w-20 shrink-0">말머리</div>
            <div className="flex-1">제목</div>
            <div className="w-28 text-right shrink-0">상태</div>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {/* ── Notice rows (always pinned at top) ── */}
            {visibleNotices.map((post) => (
              <div
                key={post.id}
                onClick={() => handleRowClick(post)}
                className="flex items-center gap-4 px-6 py-4 cursor-pointer transition-colors group
                  bg-amber-500/[0.08] hover:bg-amber-500/[0.14]
                  border-l-4 border-l-amber-400
                  shadow-[inset_0_0_40px_rgba(245,158,11,0.04)]"
              >
                {/* Notice label */}
                <div className="hidden md:flex w-12 shrink-0 justify-center">
                  <span className="text-amber-400 font-black text-[10px] uppercase tracking-wider">공지</span>
                </div>

                {/* Category badge */}
                <div className="hidden md:block w-20 shrink-0">
                  <span className="text-[9px] font-black px-2 py-0.5 rounded border text-amber-500 border-amber-500/40 bg-amber-500/10">
                    {post.category}
                  </span>
                </div>

                {/* Title + metadata */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="md:hidden text-[9px] font-black px-1.5 py-0.5 rounded border text-amber-500 border-amber-500/30">
                      {post.category}
                    </span>
                    <span className="text-sm font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
                      {post.title}
                    </span>
                    {post.status && (
                      <span className="text-[8px] font-black px-1.5 py-0.5 bg-amber-500 text-black rounded shrink-0">
                        {post.status}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-amber-700/80 font-medium flex-wrap">
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>조회 {post.views}</span>
                    {post.comments > 0 && (
                      <>
                        <span>·</span>
                        <span className="text-amber-500/60 font-bold">댓글 {post.comments}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Right spacer for status (already in title row for notice) */}
                <div className="hidden md:block w-28 shrink-0" />
              </div>
            ))}

            {/* ── Normal post rows (paginated) ── */}
            {pagedNormal.map((post, idx) => {
              // Number counts down from total filtered normal posts
              const displayNumber = filteredNormal.length - ((page - 1) * POSTS_PER_PAGE + idx);
              return (
                <div
                  key={post.id}
                  onClick={() => handleRowClick(post)}
                  className="flex items-center gap-4 px-6 py-4 cursor-pointer transition-colors group bg-transparent hover:bg-white/[0.03]"
                >
                  {/* Number */}
                  <div className="hidden md:flex w-12 shrink-0 justify-center text-[11px] font-bold text-zinc-600">
                    {displayNumber}
                  </div>

                  {/* Category badge */}
                  <div className="hidden md:block w-20 shrink-0">
                    <span className="text-[9px] font-black px-2 py-0.5 rounded border text-zinc-500 border-white/10">
                      {post.category}
                    </span>
                  </div>

                  {/* Title + metadata */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="md:hidden text-[9px] font-black px-1.5 py-0.5 rounded border text-zinc-500 border-white/10">
                        {post.category}
                      </span>
                      <span className="text-sm font-bold tracking-tight truncate text-zinc-200 group-hover:text-amber-400 transition-colors">
                        {post.title}
                      </span>
                      {post.isNew && (
                        <span className="text-[8px] font-black px-1.5 py-0.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded shrink-0">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-600 font-medium flex-wrap">
                      <span>{post.author}</span>
                      <span className="text-zinc-700">·</span>
                      <span>{post.date}</span>
                      <span className="text-zinc-700">·</span>
                      <span>조회 {post.views}</span>
                      {post.comments > 0 && (
                        <>
                          <span className="text-zinc-700">·</span>
                          <span className="text-amber-500/70 font-bold">댓글 {post.comments}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className="hidden md:block w-28 text-right shrink-0">
                    {post.status && (
                      <span className={`inline-block text-[9px] font-black px-2 py-0.5 rounded ${post.status === "모집중" ? "bg-amber-500 text-black"
                        : post.status === "마감" ? "bg-zinc-800 text-zinc-500"
                          : post.status === "NEW" ? "bg-zinc-700 text-zinc-300"
                            : "bg-white/10 text-zinc-400"
                        }`}>
                        {post.status}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 pt-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="text-zinc-600 hover:text-white disabled:opacity-30 transition text-sm font-bold px-2"
            >
              이전
            </button>
            <div className="flex items-center gap-3">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`text-xs font-black w-7 h-7 rounded-lg transition-all ${page === p ? "bg-amber-500 text-black" : "text-zinc-600 hover:text-zinc-300"
                    }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="text-zinc-600 hover:text-white disabled:opacity-30 transition text-sm font-bold px-2"
            >
              다음
            </button>
          </div>
        )}
      </div>

      {/* Decorative text */}
      <div className="fixed bottom-12 right-12 text-[12vw] font-black text-white/[0.01] pointer-events-none select-none leading-none tracking-tighter mix-blend-overlay">
        COMMUNITY
      </div>

      {/* Write post modal */}
      {showWriteModal && (
        <CommunityPostModal
          onClose={() => setShowWriteModal(false)}
          onSubmit={handleNewPost}
        />
      )}

      {/* Post detail modal */}
      {detailPost && (
        <PostDetailModal post={detailPost} onClose={() => setDetailPost(null)} />
      )}
    </main>
  );
};

export default CommunityPage;
