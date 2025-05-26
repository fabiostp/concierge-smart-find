import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  serviceName: z.string().min(2, { message: "Nome do serviço deve ter pelo menos 2 caracteres." }),
  category: z.string().min(2, { message: "Categoria deve ter pelo menos 2 caracteres." }),
  description: z.string().min(10, { message: "Descrição deve ter pelo menos 10 caracteres." }).max(500, { message: "Descrição não pode exceder 500 caracteres." }),
  location: z.string().min(2, { message: "Localização deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres." }),
});

type ProviderFormValues = z.infer<typeof formSchema>;

const ProviderRegistrationPage = () => {
  const navigate = useNavigate();
  const form = useForm<ProviderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceName: "",
      category: "",
      description: "",
      location: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: ProviderFormValues) {
    console.log("Dados do formulário de cadastro do provedor:", values);
    alert("Cadastro enviado (simulação)! Verifique o console para os dados.");
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="absolute left-4 top-4 md:left-6 md:top-6 text-sm px-2 py-1 h-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <CardTitle className="text-3xl font-bold text-center pt-8 md:pt-0">Cadastre seu Serviço</CardTitle>
          <CardDescription className="text-center">
            Preencha o formulário abaixo para se juntar à nossa rede de parceiros.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Importante!</AlertTitle>
            <AlertDescription>
              Este é um formulário de demonstração. Para que o cadastro funcione e você possa gerenciar seus contatos,
              precisaremos integrar com um sistema de backend (como o Supabase, que é recomendado para este projeto).
            </AlertDescription>
          </Alert>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="serviceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Serviço/Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Consultoria Criativa Digital" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria Principal do Serviço</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Marketing, TI, Jurídico" {...field} />
                    </FormControl>
                     <FormDescription>
                      Informe a principal área de atuação do seu serviço.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição Detalhada do Serviço</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva os serviços que você oferece, seus diferenciais, etc."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localização (Cidade/Estado)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: São Paulo, SP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail para Login e Contato</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Este e-mail será usado para login na plataforma e para clientes entrarem em contato.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                     <FormDescription>
                      Crie uma senha segura para acessar sua conta de fornecedor.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg">
                Cadastrar Serviço
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderRegistrationPage;
