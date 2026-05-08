import { useState, useEffect, useRef } from "react";

const POST_CATEGORIES = ["상영회", "팀원 모집", "피드백", "영화제", "자유"];

/**
 * CommunityPostModal
 * A write-post modal for MOV:ON community.
 *
 * Props:
 *   onClose()         – called when modal should close without submitting
 *   onSubmit(post)    – called with the new post object on successful submit
 */
const CommunityPostModal = ({ onClose, onSubmit }) => {
  const [category, setCategory] = useState("자유");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const overlayRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("제목과 내용을 모두 입력해주세요.");
      return;
    }
    setError("");

    const today = new Date();
    const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;

    onSubmit({
      id: Date.now(),
      category,
      title: title.trim(),
      author: "나",
      date: dateStr,
      views: 0,
      comments: 0,
      status: "NEW",
      content: content.trim(),
      isNew: true,
    });
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-xl bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/10">
          <h2 className="text-base font-black tracking-tight text-white uppercase">
            커뮤니티 글쓰기
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition text-lg leading-none"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-7 space-y-5">
          {/* Category chips */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
              말머리
            </label>
            <div className="flex flex-wrap gap-2">
              {POST_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                    category === cat
                      ? "bg-amber-500 text-black shadow-[0_4px_12px_-4px_rgba(245,158,11,0.5)]"
                      : "bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Title input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              placeholder="제목을 입력하세요"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-medium outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder:text-zinc-600"
            />
          </div>

          {/* Content textarea */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
              내용
            </label>
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (error) setError("");
              }}
              placeholder="내용을 입력하세요"
              rows={5}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-medium outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all resize-none placeholder:text-zinc-600"
            />
          </div>

          {/* Validation error */}
          {error && (
            <p className="text-amber-400 text-xs font-bold">{error}</p>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-white/5 border border-white/10 text-zinc-400 font-black text-[11px] uppercase tracking-widest rounded-xl hover:bg-white/10 transition active:scale-95"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-amber-500 text-black font-black text-[11px] uppercase tracking-widest rounded-xl hover:bg-amber-400 transition active:scale-95 shadow-lg shadow-amber-500/20"
            >
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunityPostModal;
