import { useEffect } from 'react';
import { Box, Card, Title, Text, Button, Icon } from '@nimbus-ds/components';
import { useNavigate, useSearchParams } from 'react-router-dom';

function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const storeId = searchParams.get('store_id');

  useEffect(() => {
    // Redireciona automaticamente após 5 segundos
    const timer = setTimeout(() => {
      navigate(`/config?store_id=${storeId}`);
    }, 5000);

    return () => clearTimeout(timer);
  }, [storeId, navigate]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      padding="4"
      backgroundColor="neutral-background"
    >
      <Card maxWidth="500px">
        <Box padding="6" textAlign="center">
          <Box marginBottom="4">
            <div style={{ fontSize: '64px', color: '#48bb78' }}>✓</div>
          </Box>

          <Title as="h1" marginBottom="2">
            Instalação Concluída!
          </Title>

          <Text fontSize="base" marginBottom="4" color="neutral-textLow">
            O gateway de pagamento Payco foi instalado com sucesso na sua loja.
          </Text>

          <Box
            padding="3"
            backgroundColor="success-surface"
            borderRadius="base"
            marginBottom="4"
          >
            <Text fontSize="caption">
              Você será redirecionado para a página de configuração em 5 segundos...
            </Text>
          </Box>

          <Button
            onClick={() => navigate(`/config?store_id=${storeId}`)}
            appearance="primary"
          >
            Ir para Configurações
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default SuccessPage;
