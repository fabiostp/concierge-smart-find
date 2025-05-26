
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X as ClearIcon, Filter } from 'lucide-react'; // Adicionado Filter e renomeado X para ClearIcon
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { sampleProviders } from "@/data/providers";
import { ServiceProvider } from "@/components/ServiceCard"; // Importando ServiceProvider

interface AdvancedFilterOptions {
  rating?: number;
  location?: string;
  reviews?: number;
  // Campos para dados ainda não disponíveis em sampleProviders
  contactsReceived?: number;
  timeOnPlatform?: string;
  timeInMarket?: string;
}

interface SearchBarProps {
  onSearch?: (searchTerm: string, advancedFilters?: AdvancedFilterOptions) => void;
}

// Função para calcular a pontuação de relevância da sugestão
const calculateSuggestionScore = (provider: ServiceProvider, term: string): number => {
  let score = 0;
  const lowerTerm = term.toLowerCase();
  
  const serviceLower = provider.service.toLowerCase();
  const categoryLower = provider.category.toLowerCase();
  const nameLower = provider.name.toLowerCase();

  // Bônus específico para "contador" -> "Contabilidade"
  if (lowerTerm === "contador" && categoryLower === "contabilidade") {
    score += 10;
  }

  if (serviceLower.startsWith(lowerTerm)) score += 5;
  else if (serviceLower.includes(lowerTerm)) score += 2;

  if (categoryLower.startsWith(lowerTerm)) score += 4;
  else if (categoryLower.includes(lowerTerm)) score += 1;
  
  if (nameLower.startsWith(lowerTerm)) score += 3;
  else if (nameLower.includes(lowerTerm)) score += 1;

  if (provider.tags?.some(tag => tag.toLowerCase().includes(lowerTerm))) score += 1;

  return score;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{id: string, text: string, category: string}>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilterOptions>({});

  useEffect(() => {
    if (searchTerm.trim().length >= 1) {
      const filteredProviders = sampleProviders
        .filter(provider => {
          const searchableText = [
            provider.name,
            provider.service,
            provider.category,
            ...(provider.tags || [])
          ].join(' ').toLowerCase();
          
          // Lógica de filtro especial para "contador" pode ser adicionada aqui se necessário,
          // mas o sort deve cuidar da priorização.
          if (searchTerm.toLowerCase() === "contador") {
            return provider.category.toLowerCase() === "contabilidade" || searchableText.includes(searchTerm.toLowerCase());
          }
          return searchableText.includes(searchTerm.toLowerCase());
        });

      const sortedSuggestions = filteredProviders
        .map(provider => ({
          provider,
          score: calculateSuggestionScore(provider, searchTerm)
        }))
        .filter(item => item.score > 0) // Só incluir se tiver alguma pontuação
        .sort((a, b) => b.score - a.score) // Ordenar por pontuação descendente
        .slice(0, 5)
        .map(item => ({
          id: item.provider.id,
          text: item.provider.service,
          category: item.provider.category
        }));
      
      setSuggestions(sortedSuggestions);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [searchTerm]);

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const currentSearchTerm = searchTerm || (inputRef.current?.value || "");
    if (onSearch) {
      onSearch(currentSearchTerm, advancedFilters);
    }
    setIsOpen(false);
    setIsAdvancedSearchOpen(false); // Fechar o modal se estiver aberto ao submeter
    console.log("Buscando por:", currentSearchTerm, "com filtros:", advancedFilters);
  };

  const handleItemSelect = (value: string) => {
    setSearchTerm(value);
    setIsOpen(false);
    // Trigger search immediately on select, with current advanced filters
    if (onSearch) {
      onSearch(value, advancedFilters);
    }
    console.log("Selecionado e buscando por:", value, "com filtros:", advancedFilters);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleInputFocus = () => {
    if (searchTerm.trim().length >= 1 && suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    // A Dialog modal should handle focus correctly, this might need adjustment if issues arise
    if (!e.currentTarget.contains(e.relatedTarget as Node) && !isAdvancedSearchOpen) {
        setTimeout(() => {
            if (!isAdvancedSearchOpen) { // Verifique novamente, pois o estado do diálogo pode ter mudado
                 setIsOpen(false);
            }
        }, 200);
    }
  };
  
  const handleApplyAdvancedFilters = () => {
    handleSubmit(); // Reutiliza a lógica de submit que já considera advancedFilters
  };

  const handleClearSearchTerm = () => {
    setSearchTerm("");
    inputRef.current?.focus();
  }

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
            placeholder="O que você procura hoje? (ex: Marketing, Contador...)"
            className="flex-grow h-12 text-base pr-10"
            aria-label="Barra de busca de serviços"
            autoComplete="off"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearchTerm}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              aria-label="Limpar termo de busca"
            >
              <ClearIcon className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <Dialog open={isAdvancedSearchOpen} onOpenChange={setIsAdvancedSearchOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" className="h-12 px-4 sm:px-6 whitespace-nowrap">
              <Filter className="h-5 w-5 mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Busca Avançada</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Filtros Avançados</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rating" className="text-right col-span-1">
                  Estrelas (mínimo)
                </Label>
                <Select
                  value={advancedFilters.rating?.toString() || ""}
                  onValueChange={(value) => setAdvancedFilters(prev => ({ ...prev, rating: value ? parseInt(value) : undefined }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Qualquer avaliação" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map(star => (
                      <SelectItem key={star} value={star.toString()}>{star} estrela{star > 1 ? 's' : ''} ou mais</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right col-span-1">
                  Localidade
                </Label>
                <Input
                  id="location"
                  value={advancedFilters.location || ""}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Ex: São Paulo, SP"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reviews" className="text-right col-span-1">
                  Qtd Recomendações (mínimo)
                </Label>
                <Input
                  id="reviews"
                  type="number"
                  value={advancedFilters.reviews?.toString() || ""}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, reviews: e.target.value ? parseInt(e.target.value) : undefined }))}
                  placeholder="Ex: 50"
                  className="col-span-3"
                />
              </div>
               {/* Campos desabilitados por falta de dados em sampleProviders.ts */}
              <div className="grid grid-cols-4 items-center gap-4 opacity-50">
                <Label htmlFor="contactsReceived" className="text-right col-span-1">
                  Contatos Recebidos
                </Label>
                <Input id="contactsReceived" placeholder="Não disponível" className="col-span-3" disabled />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 opacity-50">
                <Label htmlFor="timeOnPlatform" className="text-right col-span-1">
                  Tempo na Plataforma
                </Label>
                <Input id="timeOnPlatform" placeholder="Não disponível" className="col-span-3" disabled />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 opacity-50">
                <Label htmlFor="timeInMarket" className="text-right col-span-1">
                  Tempo de Mercado
                </Label>
                <Input id="timeInMarket" placeholder="Não disponível" className="col-span-3" disabled />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="button" onClick={handleApplyAdvancedFilters}>Aplicar Filtros e Buscar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </form>

      {isOpen && suggestions.length > 0 && !isAdvancedSearchOpen && (
        <div className="absolute z-50 w-full bg-background rounded-md shadow-lg mt-1 border border-border max-h-80 overflow-auto">
          <Command>
            <CommandList>
              <CommandGroup heading="Sugestões">
                {suggestions.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.text} // O valor usado para filtragem interna do Command, se CommandInput fosse usado
                    onSelect={() => handleItemSelect(item.text)} // A ação ao selecionar
                    className="flex justify-between items-center py-3 px-4 hover:bg-accent cursor-pointer"
                  >
                    <span>{item.text}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
              {suggestions.length === 0 && !searchTerm && ( // Mostrar apenas se não houver termo ou sugestões
                 <CommandEmpty>Digite para ver sugestões.</CommandEmpty>
              )}
               {suggestions.length === 0 && searchTerm && (
                <CommandEmpty>Nenhum resultado encontrado para "{searchTerm}".</CommandEmpty>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

