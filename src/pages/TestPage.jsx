import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Box, Card, Title, Text, Button } from '@nimbus-ds/components';
import { CheckCircleIcon } from '@nimbus-ds/icons';
import { initNexo } from '../services/nexoClient';

function TestPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Inicializar Nexo quando o componente montar
    initNexo().catch(err => {
      console.error('Erro ao inicializar Nexo:', err);
    });
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="4"
      padding="4"
    >
      <Box>
        <Title as="h1">Tela de Teste</Title>
        <Text fontSize="base" color="neutral-textLow">
          Esta rota está funcionando perfeitamente!
        </Text>
      </Box>

      <Card>
        <Card.Header>
          <Title as="h3">Informações da Rota</Title>
        </Card.Header>
        <Card.Body>
          <Box display="flex" flexDirection="column" gap="2">
            <Box display="flex" alignItems="center" gap="2">
              <CheckCircleIcon color="success-textHigh" />
              <Text>Rota: <strong>/test</strong></Text>
            </Box>
            <Box display="flex" alignItems="center" gap="2">
              <CheckCircleIcon color="success-textHigh" />
              <Text>Componente: <strong>TestPage</strong></Text>
            </Box>
            <Box display="flex" alignItems="center" gap="2">
              <CheckCircleIcon color="success-textHigh" />
              <Text>Status: <strong>Ativo</strong></Text>
            </Box>
            <Box display="flex" alignItems="center" gap="2">
              <CheckCircleIcon color="success-textHigh" />
              <Text>Navegação: <strong>Funcionando</strong></Text>
            </Box>
          </Box>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <Title as="h3">Navegação</Title>
        </Card.Header>
        <Card.Body>
          <Box display="flex" gap="2" flexWrap="wrap">
            <Button onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
            <Button onClick={() => navigate('/config')} appearance="neutral">
              Configurações
            </Button>
            <Button onClick={() => navigate('/transactions')} appearance="neutral">
              Transações
            </Button>
          </Box>
        </Card.Body>
      </Card>

      <Box>
        <Text fontSize="caption" color="neutral-textLow">
          Data/Hora: {new Date().toLocaleString('pt-BR')}
        </Text>
      </Box>
    </Box>
  );
}

export default TestPage;
