
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

const Header = () => {
  // A função handleHeaderSearch e a importação de useNavigate foram removidas pois não são mais utilizadas aqui.

  return (
    <header className="bg-background border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-auto py-3 flex flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-semibold text-xl text-primary">concierge.ia</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          {/* 
          A tag <nav> foi mantida comentada caso futuros links de navegação sejam necessários.
          <nav className="hidden md:flex items-center space-x-4">
            Futuros links de navegação, como Login/Cadastro, podem ir aqui
          </nav>
          */}
        </div>
      </div>
    </header>
  );
};

export default Header;
