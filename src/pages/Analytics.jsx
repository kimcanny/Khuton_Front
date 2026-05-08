import Title from '../components/atoms/Title';
import Subtitle from '../components/atoms/Subtitle';
import StatsSection from '../components/organisms/StatsSection';
import ProgressRow from '../components/molecules/ProgressRow';
import Badge from '../components/atoms/Badge';

const Analytics = () => {
  const mainMetrics = [
    { title: "Avg. Compliance Score", value: "92.4", trend: "+4.2%" },
    { title: "Risk Mitigation Rate", value: "78%", trend: "+12%" },
    { title: "Audit Completion", value: "100%", trend: "Stable" },
    { title: "System Latency", value: "24ms", trend: "-2ms" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50/50 py-12 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="success">Real-time</Badge>
            <span className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">Data Engine</span>
          </div>
          <Title className="text-4xl">System Analytics</Title>
          <Subtitle className="text-base text-zinc-500 max-w-xl">
            Deep-dive into performance metrics, risk vectors, and historical compliance data with our advanced analytics engine.
          </Subtitle>
        </header>

        <StatsSection stats={mainMetrics} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white rounded-2xl border border-zinc-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-8">
            <Title level={2}>Performance Vectors</Title>
            <div className="space-y-6">
              <ProgressRow label="Data Processing" value="High" percentage={92} />
              <ProgressRow label="API Response" value="Optimal" percentage={88} />
              <ProgressRow label="Cache Hit Rate" value="74%" percentage={74} />
              <ProgressRow label="Error Frequency" value="Low" percentage={12} />
            </div>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-zinc-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <div>
              <Title level={2} className="mb-2">Network Health</Title>
              <Subtitle>Global distribution of node performance and latency across all primary regions.</Subtitle>
            </div>
            <div className="h-48 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center justify-center border-dashed">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Visualization Placeholder</span>
            </div>
            <div className="mt-6 flex justify-between items-center text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
              <span>Uptime: 99.99%</span>
              <span className="text-emerald-500">All Systems Nominal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
