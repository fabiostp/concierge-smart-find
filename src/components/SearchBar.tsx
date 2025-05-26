
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (searchTerm: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchTerm = event.currentTarget.search.value;
    if (onSearch) {
      onSearch(searchTerm);
    }
    console.log("Buscando por:", searchTerm);
    // A lógica de busca real será implementada depois
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl items-center space-x-2">
      <Input
        type="search"
        name="search"
        placeholder="O que você procura hoje? (ex: Marketing Digital, Consultoria Jurídica...)"
        className="flex-grow h-12 text-base"
        aria-label="Barra de busca de serviços"
      />
      <Button type="submit" className="h-12 px-6" aria-label="Buscar">
        <Search className="h-5 w-5 mr-2 sm:mr-0 md:mr-2" />
        <span className="hidden sm:inline">Buscar</span>
      </Button>
    </form>
  );
};

export default SearchBar;
