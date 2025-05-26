import SearchBar from "@/components/SearchBar";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Zap, Users, Building } from 'lucide-react';
import { Link } from "react-router-dom";
import { sampleProviders } from "@/data/providers";

const Index = () => {
  const handleSearch = (searchTerm: string) => {
    // Lógica para lidar com a busca será implementada aqui
    // Por enquanto, apenas exibimos no console
    console.log("Termo buscado na página Index:", searchTerm);
    // Poderíamos filtrar `sampleProviders` aqui ou fazer uma chamada API
  };

  return (
    <>
      {/* Seção Hero */}
      <section className="pb-16 md:pb-24 bg-gradient-to-br from-primary/10 via-background to-background"> {/* Padding superior removido daqui */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 md:pt-12"> {/* Padding superior adicionado aqui */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Encontre os <span className="text-primary">parceiros ideais</span> para o seu sucesso.
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10">
            Chega de perder tempo em grupos! concierge.ia conecta você aos melhores profissionais e serviços de forma rápida e inteligente.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar onSearch={handleSearch} />
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
      
      {/* Seção de Serviços em Destaque (Exemplo) */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Parceiros em Destaque
          </h2>
          {sampleProviders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sampleProviders.slice(0, 3).map((provider) => ( // Mostrar apenas 3 em destaque na home
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
