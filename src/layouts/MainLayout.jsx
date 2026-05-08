import { Outlet } from 'react-router-dom';

/**
 * MainLayout Component
 * Clean layout wrapper that preserves the routing architecture
 * without injecting legacy UI elements.
 */
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* 
          Legacy PolicyOS header and navigation removed.
          MOV:ON pages manage their own headers or use specific components.
      */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
