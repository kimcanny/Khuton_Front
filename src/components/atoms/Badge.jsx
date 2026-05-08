/**
 * Badge component with Apple-inspired minimal styling.
 * Supports different variants using neutral zinc palette.
 */
const Badge = ({ children, variant = "neutral", className = "" }) => {
  const variants = {
    neutral: "bg-zinc-100 text-zinc-600 border-zinc-200/50",
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border-amber-100",
    error: "bg-rose-50 text-rose-700 border-rose-100",
    primary: "bg-zinc-900 text-white border-zinc-900",
  };

  return (
    <span 
      className={`
        inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border
        transition-colors duration-200
        ${variants[variant] || variants.neutral}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
