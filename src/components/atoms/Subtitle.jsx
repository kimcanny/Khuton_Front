/**
 * Subtitle component for secondary information.
 * Uses a muted zinc color and medium weight.
 */
const Subtitle = ({ children, className = "" }) => {
  return (
    <p className={`
      text-[13px] font-medium text-zinc-500 leading-relaxed tracking-normal
      ${className}
    `}>
      {children}
    </p>
  );
};

export default Subtitle;
