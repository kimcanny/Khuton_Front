import Title from '../components/atoms/Title';
import Subtitle from '../components/atoms/Subtitle';
import PolicyPanel from '../components/organisms/PolicyPanel';
import Badge from '../components/atoms/Badge';

const Reports = () => {
  const reports = [
    { name: "Annual Sustainability Report 2023", status: "Active", date: "Published Dec 15, 2023" },
    { name: "Q1 Financial Compliance Audit", status: "Active", date: "Published Mar 02, 2024" },
    { name: "Regional Market Analysis - EMEA", status: "Pending", date: "Scheduled for Apr 20, 2024" },
    { name: "Internal Diversity & Inclusion Survey", status: "Archived", date: "Archived Jan 10, 2024" },
    { name: "Quarterly Risk Assessment v4", status: "Active", date: "Published Apr 05, 2024" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50/50 py-12 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="neutral">Documentation</Badge>
            <span className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">Archive</span>
          </div>
          <Title className="text-4xl">Compliance Reports</Title>
          <Subtitle className="text-base text-zinc-500 max-w-xl">
            Access and manage all regulatory filings, internal audits, and external compliance documentation in a unified repository.
          </Subtitle>
        </header>

        <div className="bg-white rounded-2xl border border-zinc-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
            <Title level={2} className="text-lg">Recent Documents</Title>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Search reports..." 
                className="text-[13px] border border-zinc-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all"
              />
            </div>
          </div>
          <div className="divide-y divide-zinc-100 px-6">
            <PolicyPanel policies={reports} title="" className="border-0 shadow-none p-0 rounded-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
