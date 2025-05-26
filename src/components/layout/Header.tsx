import { Link, useNavigate } from 'react-router-dom';
// SearchBar import was removed as it's not used after a previous change.
// If SearchBar is needed again in Header, its import and usage should be re-evaluated.

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
          {/* O ícone Briefcase foi removido daqui */}
          <span className="font-semibold text-xl text-primary">concierge.ia</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          {/* Futuros links de navegação, como Login/Cadastro, podem ir aqui */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
