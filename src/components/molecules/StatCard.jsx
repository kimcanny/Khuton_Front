import Title from '../atoms/Title';
import Subtitle from '../atoms/Subtitle';

/**
 * StatCard molecule for displaying key metrics.
 * Features a clean white card with subtle depth and clear typography.
 */
const StatCard = ({ title, value, trend, className = "" }) => {
  const isPositive = trend?.startsWith('+');
  
  return (
    <div className={`
      p-5 bg-white rounded-2xl border border-zinc-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)]
      transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:border-zinc-300/80
      ${className}
    `}>
      <Subtitle className="mb-1">{title}</Subtitle>
      <div className="flex items-baseline gap-2">
        <Title level={1} className="text-[28px] leading-none">{value}</Title>
        {trend && (
          <span className={`
            text-[11px] font-semibold px-1.5 py-0.5 rounded-md
            ${isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}
          `}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
