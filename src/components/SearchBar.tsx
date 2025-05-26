
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { sampleProviders } from "@/data/providers";

interface SearchBarProps {
  onSearch?: (searchTerm: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{id: string, text: string, category: string}>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (searchTerm.trim().length >= 1) {
      const filteredSuggestions = sampleProviders
        .filter(provider => {
          const searchableText = [
            provider.name, 
            provider.service, 
            provider.category,
            ...(provider.tags || [])
          ].join(' ').toLowerCase();
          
          return searchableText.includes(searchTerm.toLowerCase());
        })
        .slice(0, 5) // Limita para 5 sugestões
        .map(provider => ({
          id: provider.id,
          text: provider.service,
          category: provider.category
        }));
      
      setSuggestions(filteredSuggestions);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [searchTerm]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentSearchTerm = searchTerm || event.currentTarget.search.value;
    if (onSearch) {
      onSearch(currentSearchTerm);
    }
    setIsOpen(false);
    console.log("Buscando por:", currentSearchTerm);
  };

  const handleItemSelect = (value: string) => {
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
    setIsOpen(false);
    console.log("Selecionado:", value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleInputFocus = () => {
    if (searchTerm.trim().length >= 1) {
      setIsOpen(true);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Pequeno atraso para permitir que o clique no item da sugestão seja registrado antes de fechar
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
        <div className="relative flex-grow">
          <Input
            ref={inputRef}
            type="search"
            name="search"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleBlur}
            placeholder="O que você procura hoje? (ex: Marketing Digital, Consultoria Jurídica...)"
            className="flex-grow h-12 text-base pr-10"
            aria-label="Barra de busca de serviços"
            autoComplete="off"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
        <Button type="submit" className="h-12 px-6" aria-label="Buscar">
          <Search className="h-5 w-5 mr-2 sm:mr-0 md:mr-2" />
          <span className="hidden sm:inline">Buscar</span>
        </Button>
      </form>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full bg-white rounded-md shadow-lg mt-1 border border-gray-200 max-h-80 overflow-auto">
          <Command>
            <CommandList>
              <CommandGroup heading="Sugestões">
                {suggestions.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.text}
                    onSelect={() => handleItemSelect(item.text)}
                    className="flex justify-between items-center py-3 px-4 hover:bg-gray-100 cursor-pointer"
                  >
                    <span>{item.text}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            {suggestions.length === 0 && (
              <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
            )}
          </Command>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
