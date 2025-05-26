
import { ServiceProvider } from "@/components/ServiceCard";

export const sampleProviders: ServiceProvider[] = [
  {
    id: "1",
    name: "Agência Criativa Alpha",
    service: "Marketing Digital Completo",
    category: "Marketing",
    location: "São Paulo, SP",
    rating: 5,
    reviews: 120,
    description: "Especialistas em SEO, mídias sociais e campanhas de publicidade online para alavancar seu negócio.",
    tags: ["SEO", "Redes Sociais", "Google Ads"]
  },
  {
    id: "2",
    name: "Soluções Tech Beta",
    service: "Desenvolvimento de Software Sob Medida",
    category: "TI",
    location: "Rio de Janeiro, RJ",
    rating: 4,
    reviews: 85,
    description: "Criamos softwares personalizados e aplicativos móveis para atender às necessidades específicas da sua empresa.",
    tags: ["Web Apps", "Mobile Apps", "Sistemas"]
  },
  {
    id: "3",
    name: "Consultoria Jurídica Gamma",
    service: "Assessoria Empresarial e Contratual",
    category: "Jurídico",
    location: "Belo Horizonte, MG",
    rating: 5,
    reviews: 95,
    description: "Oferecemos suporte jurídico completo para empresas, desde a abertura até a gestão de contratos complexos.",
    tags: ["Direito Empresarial", "Contratos", "LGPD"]
  },
  // Adicione mais provedores se necessário para testar a listagem
];

export const getUniqueCategories = () => {
  const categories = sampleProviders.map(provider => provider.category);
  return [...new Set(categories)];
};

