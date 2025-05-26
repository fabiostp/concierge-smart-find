
import ServiceCard from "@/components/ServiceCard";
import { sampleProviders, getUniqueCategories } from "@/data/providers";
import { Badge } from "@/components/ui/badge";

const AllCategoriesPage = () => {
  const categories = getUniqueCategories();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8 text-center">
        Todas as Categorias e Parceiros
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-primary">Categorias Disponíveis</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge key={category} variant="secondary" className="text-lg px-4 py-2">
              {category}
            </Badge>
          ))}
        </div>
        {categories.length === 0 && (
          <p className="text-muted-foreground">Nenhuma categoria encontrada.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-primary">Todos os Parceiros</h2>
        {sampleProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleProviders.map((provider) => (
              <ServiceCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            Nenhum parceiro encontrado no momento. Volte em breve!
          </p>
        )}
      </section>
    </div>
  );
};

export default AllCategoriesPage;
