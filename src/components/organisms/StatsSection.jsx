import StatCard from '../molecules/StatCard';

/**
 * StatsSection organism for a grid of StatCards.
 * Handles responsive layout and spacing.
 */
const StatsSection = ({ stats = [], className = "" }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsSection;
