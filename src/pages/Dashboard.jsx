import Title from '../components/atoms/Title';
import Subtitle from '../components/atoms/Subtitle';
import StatsSection from '../components/organisms/StatsSection';
import PolicyPanel from '../components/organisms/PolicyPanel';
import ProgressRow from '../components/molecules/ProgressRow';
import Badge from '../components/atoms/Badge';

const Dashboard = () => {
  const stats = [
    { title: "Active Licenses", value: "1,284", trend: "+12.5%" },
    { title: "Policy Compliance", value: "94.2%", trend: "+2.1%" },
    { title: "Risk Assessment", value: "Low", trend: "Stable" },
    { title: "Pending Reviews", value: "24", trend: "-5" },
  ];

  const activePolicies = [
    { name: "Environmental Impact Protocol", status: "Active", date: "Last modified May 12, 2024" },
    { name: "Data Sovereignty Framework", status: "Active", date: "Last modified Apr 28, 2024" },
    { name: "Supply Chain Transparency", status: "Pending", date: "Draft version 0.8" },
    { name: "Workplace Equity Standard", status: "Archived", date: "Superseded by v2.1" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50/50 py-12 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="primary">2024 Q2</Badge>
              <span className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">Quarterly Report</span>
            </div>
            <Title className="text-4xl">Policy Overview</Title>
            <Subtitle className="text-base text-zinc-500 max-w-xl">
              A comprehensive analysis of current regulatory standards, compliance metrics, and strategic policy implementations.
            </Subtitle>
          </div>
          <button className="bg-zinc-900 text-white text-[13px] font-semibold px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors shadow-sm">
            Export Report
          </button>
        </header>

        {/* Stats Grid */}
        <StatsSection stats={stats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Policy List */}
          <div className="lg:col-span-2">
            <PolicyPanel 
              title="Recent Policy Updates" 
              policies={activePolicies} 
            />
          </div>
          
          {/* Progress Indicators */}
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-zinc-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <Title level={2} className="mb-6">Compliance Progress</Title>
              <div className="space-y-6">
                <ProgressRow label="Governance Review" value="88%" percentage={88} />
                <ProgressRow label="Security Audit" value="62%" percentage={62} />
                <ProgressRow label="Operational Risk" value="94%" percentage={94} />
                <ProgressRow label="Stakeholder Input" value="41%" percentage={41} />
              </div>
            </div>

            {/* Info Card */}
            <div className="p-6 bg-zinc-900 rounded-2xl text-white">
              <Title level={3} className="text-white mb-2">System Status</Title>
              <p className="text-[13px] text-zinc-400 leading-relaxed">
                All monitoring systems are operational. Next scheduled audit is in 14 days.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-semibold text-emerald-500 uppercase tracking-wider">Live</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
