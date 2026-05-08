import Title from '../atoms/Title';
import PolicyItem from '../molecules/PolicyItem';
import Divider from '../atoms/Divider';

/**
 * PolicyPanel organism for grouping policy-related items.
 * Uses a clean white card with a title and list of items.
 */
const PolicyPanel = ({ policies = [], title = "Active Policies", className = "" }) => {
  return (
    <div className={`
      p-6 bg-white rounded-2xl border border-zinc-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)]
      ${className}
    `}>
      <Title level={2} className="mb-4">{title}</Title>
      <div className="space-y-1">
        {policies.map((policy, index) => (
          <div key={index}>
            <PolicyItem {...policy} />
            {index < policies.length - 1 && <Divider className="my-0 opacity-40" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicyPanel;
