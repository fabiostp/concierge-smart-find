
import { useState } from 'react';
import ServiceCard from "@/components/ServiceCard";
import { sampleProviders, getUniqueCategories } from "@/data/providers";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button'; // Importar Button
import { X } from 'lucide-react'; // Importar ícone X

const AllCategoriesPage = () => {
  const categories = getUniqueCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Deselecionar se clicar na mesma categoria
    } else {
      setSelectedCategory(category);
    }
  };

  const filteredProviders = selectedCategory
    ? sampleProviders.filter((provider) => provider.category === selectedCategory)
    : sampleProviders;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8 text-center">
        Todas as Categorias e Parceiros
      </h1>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Categorias Disponíveis</h2>
          {selectedCategory && (
            <Button variant="outline" size="sm" onClick={() => setSelectedCategory(null)} className="flex items-center">
              <X className="h-4 w-4 mr-1.5" />
              Limpar filtro ({selectedCategory})
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              className={`text-lg px-4 py-2 cursor-pointer transition-colors ${
                selectedCategory === category ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-secondary/80'
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
        {categories.length === 0 && (
          <p className="text-muted-foreground">Nenhuma categoria encontrada.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-primary">
          {selectedCategory ? `Parceiros em ${selectedCategory}` : 'Todos os Parceiros'}
        </h2>
        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProviders.map((provider) => (
              <ServiceCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            {selectedCategory 
              ? `Nenhum parceiro encontrado para a categoria "${selectedCategory}".`
              : "Nenhum parceiro encontrado no momento. Volte em breve!"
            }
          </p>
        )}
      </section>
    </div>
  );
};

export default AllCategoriesPage;
