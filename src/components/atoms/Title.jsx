/**
 * Title component with tight tracking and semi-bold weight.
 * Optimized for dashboard headers.
 */
const Title = ({ children, className = "", level = 1 }) => {
  const Tag = level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3';
  
  return (
    <Tag className={`
      text-zinc-900 font-semibold tracking-tight
      ${level === 1 ? 'text-2xl' : level === 2 ? 'text-xl' : 'text-lg'}
      ${className}
    `}>
      {children}
    </Tag>
  );
};

export default Title;
