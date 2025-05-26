import { Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';

const Header = () => {
  const navigate = useNavigate();

  const handleHeaderSearch = (searchTerm: string) => {
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm) {
      navigate(`/?search=${encodeURIComponent(trimmedSearchTerm)}`);
    } else {
      // Se o termo de busca for vazio, navega para a home sem parâmetros de busca
      // Isso efetivamente limpa a busca se o usuário apagar o texto e submeter
      navigate('/');
    }
  };

  return (
    <header className="bg-background border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-auto py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 self-start md:self-center">
          <Briefcase className="h-7 w-7 text-primary" />
          {/* O texto "concierge.ia" foi removido daqui */}
        </Link>
        <div className="w-full md:flex-1 md:max-w-xl">
          <SearchBar onSearch={handleHeaderSearch} />
        </div>
        <nav className="hidden md:flex items-center space-x-4">
          {/* Futuros links de navegação, como Login/Cadastro, podem ir aqui */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
