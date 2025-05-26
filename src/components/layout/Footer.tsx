
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-muted py-8 border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
        <p>&copy; {currentYear} concierge.ia. Todos os direitos reservados.</p>
        <p className="mt-1">Sua central inteligente para encontrar parceiros de negócios e serviços.</p>
      </div>
    </footer>
  );
};

export default Footer;
