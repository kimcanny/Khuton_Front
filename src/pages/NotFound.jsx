import { Link } from 'react-router-dom';
import Title from '../components/atoms/Title';
import Subtitle from '../components/atoms/Subtitle';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-zinc-50/50 flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <span className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.2em]">Error 404</span>
          <Title className="text-5xl">Page not found</Title>
          <Subtitle className="text-base">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Subtitle>
        </div>
        <Link 
          to="/" 
          className="inline-block bg-zinc-900 text-white text-[13px] font-semibold px-6 py-2.5 rounded-lg hover:bg-zinc-800 transition-all shadow-sm"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
