
import { Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-background border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Briefcase className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-primary">concierge.ia</h1>
        </Link>
        <nav className="flex items-center space-x-4">
          {/* Futuros links de navegação, como Login/Cadastro, podem ir aqui */}
          {/* <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-primary">Login</Link> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
