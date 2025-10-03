import { Box, Card, Title, Text, Button } from '@nimbus-ds/components';
import { useSearchParams } from 'react-router-dom';

function ErrorPage() {
  const [searchParams] = useSearchParams();
  const errorMessage = searchParams.get('message') || 'Ocorreu um erro durante a instalação.';

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
            <div style={{ fontSize: '64px', color: '#f56565' }}>✗</div>
          </Box>

          <Title as="h1" marginBottom="2">
            Erro na Instalação
          </Title>

          <Text fontSize="base" marginBottom="4" color="neutral-textLow">
            {errorMessage}
          </Text>

          <Box
            padding="3"
            backgroundColor="danger-surface"
            borderRadius="base"
            marginBottom="4"
          >
            <Text fontSize="caption">
              Por favor, tente novamente ou entre em contato com o suporte.
            </Text>
          </Box>

          <Box display="flex" gap="2" justifyContent="center">
            <Button
              onClick={() => window.location.href = '/auth/install'}
              appearance="primary"
            >
              Tentar Novamente
            </Button>
            <Button
              onClick={() => window.open('https://payco.com.br/suporte', '_blank')}
            >
              Contatar Suporte
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default ErrorPage;
