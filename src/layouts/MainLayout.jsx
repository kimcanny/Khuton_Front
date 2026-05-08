import { Outlet, NavLink } from 'react-router-dom';
import Title from '../components/atoms/Title';

const MainLayout = () => {
  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Reports', path: '/reports' },
    { name: 'Analytics', path: '/analytics' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/60 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Title level={3} className="text-xl tracking-tight text-zinc-900 select-none">
              Policy<span className="text-zinc-400 font-medium">OS</span>
            </Title>
            
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-zinc-100 text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.05)]' 
                      : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}
                  `}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center cursor-pointer hover:bg-zinc-200 transition-colors">
              <span className="text-[10px] font-bold text-zinc-500 uppercase">JS</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-200/40">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] text-zinc-400 font-medium uppercase tracking-widest">
          <span>&copy; 2024 Policy OS Framework</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-900 transition-colors">Documentation</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Support</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
