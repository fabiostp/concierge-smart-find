import { useState, useEffect, useCallback } from "react";
import SearchBar from "@/components/SearchBar"; // Importar SearchBar
import ServiceCard, { ServiceProvider } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Zap, Users, Building } from 'lucide-react';
import { Link, useSearchParams } from "react-router-dom";
import { sampleProviders } from "@/data/providers";

const Index = () => {
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[] | null>(null);
  const [activeSearchTerm, setActiveSearchTerm] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  // Esta função contém a lógica de filtragem e atualização do estado local
  const performSearchLogic = useCallback((searchTerm: string) => {
    const trimmedSearchTerm = searchTerm.trim();
    setActiveSearchTerm(trimmedSearchTerm);

    if (!trimmedSearchTerm) {
      setFilteredProviders(null);
      console.log("Busca resetada. Mostrando parceiros em destaque.");
      return;
    }

    console.log("Termo buscado na página Index:", trimmedSearchTerm);
    const lowerSearchTerm = trimmedSearchTerm.toLowerCase();

    const results = sampleProviders.filter(provider => {
      const searchableText = [
        provider.name,
        provider.service,
        provider.category,
        ...(provider.tags || [])
      ].join(' ').toLowerCase();
      return searchableText.includes(lowerSearchTerm);
    });

    const rankedResults = results.sort((a, b) => {
      if (a.rating !== b.rating) {
        return b.rating - a.rating; // Maior rating primeiro
      }
      return b.reviews - a.reviews; // Maior número de reviews primeiro
    });

    console.log("Resultados encontrados:", rankedResults.length);
    setFilteredProviders(rankedResults);
  }, [setActiveSearchTerm, setFilteredProviders]);

  // useEffect para reagir a mudanças nos parâmetros da URL
  useEffect(() => {
    const queryParamSearch = searchParams.get("search");
    performSearchLogic(queryParamSearch || ""); // Executa a lógica de busca com o termo da URL ou string vazia
  }, [searchParams, performSearchLogic]);

  // Handler para quando a SearchBar na página Index é submetida
  const handleIndexPageSearch = (searchTerm: string) => {
    const trimmedSearchTerm = searchTerm.trim();
    setSearchParams(trimmedSearchTerm ? { search: trimmedSearchTerm } : {});
  };

  const clearSearchAndShowFeatured = () => {
    setSearchParams({}); // Remove o parâmetro "search" da URL, o que acionará o useEffect
  };

  return (
    <>
      {/* Seção Hero */}
      <section className="pb-16 md:pb-24 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 md:pt-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Encontre os <span className="text-primary">parceiros ideais</span> para o seu sucesso.
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-8"> {/* Diminuído mb de 10 para 8 */}
            Chega de perder tempo em grupos! concierge.ia conecta você aos melhores profissionais e serviços de forma rápida e inteligente.
          </p>
          <div className="w-full max-w-xl mx-auto mb-10"> {/* Div para centralizar e dimensionar a SearchBar */}
            <SearchBar onSearch={handleIndexPageSearch} /> {/* SearchBar adicionada de volta */}
          </div>
        </div>
      </section>

      {/* Seção de Benefícios */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Por que usar o concierge.ia?</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Simplificamos a busca por fornecedores qualificados para que você possa focar no que realmente importa.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Busca Rápida e Inteligente</h3>
              <p className="text-muted-foreground text-sm">Encontre o que precisa em segundos com nossa plataforma otimizada.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Parceiros Verificados</h3>
              <p className="text-muted-foreground text-sm">Acesso a uma rede de profissionais e empresas qualificadas (em breve!).</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Building className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Centralize suas Conexões</h3>
              <p className="text-muted-foreground text-sm">Todas as suas necessidades de negócios em um só lugar.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção de Serviços em Destaque ou Resultados da Busca */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {activeSearchTerm === "" ? (
            // Modo Padrão: Parceiros em Destaque
            <>
              <h2 className="text-3xl font-bold text-center mb-12">
                Parceiros em Destaque
              </h2>
              {sampleProviders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sampleProviders.slice(0, 3).map((provider) => (
                    <ServiceCard key={provider.id} provider={provider} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  Nenhum parceiro em destaque no momento. Volte em breve!
                </p>
              )}
              <div className="text-center mt-12">
                <Button size="lg" variant="outline" asChild>
                  <Link to="/categories">Ver todas as categorias e parceiros</Link>
                </Button>
              </div>
            </>
          ) : (
            // Modo Busca: Resultados da Busca
            <>
              <h2 className="text-3xl font-bold text-center mb-12">
                Resultados para "{activeSearchTerm}"
              </h2>
              {filteredProviders && filteredProviders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProviders.map((provider) => (
                    <ServiceCard key={provider.id} provider={provider} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  Nenhum parceiro encontrado para "{activeSearchTerm}". Tente outros termos ou limpe a busca.
                </p>
              )}
              <div className="text-center mt-12">
                <Button size="lg" variant="outline" onClick={clearSearchAndShowFeatured}>
                  Limpar Busca e Ver Destaques
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

       {/* Seção Call to Action para Parceiros */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">É um fornecedor de serviços?</h2>
          <p className="max-w-xl mx-auto text-lg mb-8">
            Junte-se à nossa rede e alcance mais clientes. O cadastro é simples e rápido!
          </p>
          <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
            <Link to="/register-service">Cadastre seu Serviço</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Index;
