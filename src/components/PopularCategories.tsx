
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardTitle } from "@/components/ui/card"; // Adicionado CardTitle
import { Badge } from "@/components/ui/badge"; // Adicionado Badge
import { getUniqueCategories, sampleProviders } from "@/data/providers";
import { ArrowRight, LayoutGrid } from "lucide-react"; // Adicionando LayoutGrid e ArrowRight

interface CategoryWithCount {
  name: string;
  count: number;
}

const PopularCategories = () => {
  const categories = getUniqueCategories();
  
  const categoriesWithCounts: CategoryWithCount[] = categories.map(categoryName => {
    const count = sampleProviders.filter(provider => provider.category === categoryName).length;
    return { name: categoryName, count };
  });

  // Ordenar categorias pela contagem de provedores, decrescente
  const sortedCategories = categoriesWithCounts.sort((a, b) => b.count - a.count).slice(0, 8); // Pegar as top 8

  if (sortedCategories.length === 0) {
    return null; // Não renderizar nada se não houver categorias
  }

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-left mb-4 sm:mb-0">
            Categorias Populares
          </h2>
          <Link to="/categories" className="text-sm text-primary hover:text-primary/80 flex items-center group">
            Ver todas as categorias <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: sortedCategories.length > 3, // Habilitar loop se houver mais de 3 categorias
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {sortedCategories.map((category, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <Link to={`/categories?category=${encodeURIComponent(category.name)}`} className="block group">
                  <Card className="overflow-hidden h-full flex flex-col justify-between transform transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <LayoutGrid className="h-10 w-10 text-primary mb-3" />
                      <CardTitle className="text-md font-semibold group-hover:text-primary transition-colors">
                        {category.name}
                      </CardTitle>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {category.count} {category.count === 1 ? "serviço" : "serviços"}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          {sortedCategories.length > 3 && ( // Mostrar botões apenas se houver itens suficientes para rolar
            <>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 ml-[-16px] sm:ml-[-20px] h-10 w-10" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 mr-[-16px] sm:mr-[-20px] h-10 w-10" />
            </>
          )}
        </Carousel>
      </div>
    </section>
  );
};

export default PopularCategories;
