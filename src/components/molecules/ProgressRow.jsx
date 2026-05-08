import Subtitle from '../atoms/Subtitle';

/**
 * ProgressRow molecule for visual data representation.
 * Features a minimalist thin bar and clear percentage display.
 */
const ProgressRow = ({ label, value, percentage, className = "" }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-end">
        <Subtitle className="text-zinc-700 font-medium">{label}</Subtitle>
        <span className="text-[12px] font-semibold text-zinc-900">{value}</span>
      </div>
      <div className="h-1.5 w-full bg-zinc-100/80 rounded-full overflow-hidden border border-zinc-200/20">
        <div 
          className="h-full bg-zinc-900 rounded-full transition-all duration-700 ease-out" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressRow;
