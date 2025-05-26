import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from 'lucide-react';

export interface ServiceProvider {
  id: string;
  name: string;
  service: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  tags?: string[];
}

interface ServiceCardProps {
  provider: ServiceProvider;
}

const ServiceCard = ({ provider }: ServiceCardProps) => {
  return (
    <Card className="w-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold text-primary">{provider.name}</CardTitle>
          <Badge variant="secondary">{provider.category}</Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground pt-1">
          {provider.service}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{provider.description}</p>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <MapPin className="h-4 w-4 mr-1.5 text-gray-500" /> {provider.location}
        </div>
        <div className="flex items-center text-sm">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < provider.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="ml-1.5 text-muted-foreground">({provider.reviews} avaliações)</span>
        </div>
        {provider.tags && provider.tags.length > 0 && (
          <div className="mt-3">
            {provider.tags.map(tag => (
              <Badge key={tag} variant="outline" className="mr-1 mb-1 text-xs">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full">Solicitar Contato</Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
