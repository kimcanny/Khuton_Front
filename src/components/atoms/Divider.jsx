/**
 * Divider component for clean separation of content.
 * Extremely subtle line following Apple's minimal aesthetic.
 */
const Divider = ({ className = "", vertical = false }) => {
  if (vertical) {
    return <div className={`h-full w-[1px] bg-zinc-200/60 mx-4 ${className}`} />;
  }
  
  return (
    <hr className={`border-0 h-[1px] bg-zinc-200/60 my-4 w-full ${className}`} />
  );
};

export default Divider;
