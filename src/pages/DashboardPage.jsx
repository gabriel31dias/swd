import { useState, useEffect } from 'react';
import { Box, Title, Text, Layout } from '@nimbus-ds/components';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import axios from 'axios';

function DashboardPage() {
  const [searchParams] = useSearchParams();
  const storeId = searchParams.get('store_id') || '123456';
  const [stats, setStats] = useState({
    totalTransactions: 0,
    totalAmount: 0,
    pendingPayments: 0,
    successRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Aqui você faria uma chamada real para pegar estatísticas
      // const response = await axios.get(`/api/stats/${storeId}`);

      // Simulando dados
      setTimeout(() => {
        setStats({
          totalTransactions: 1234,
          totalAmount: 45678.90,
          pendingPayments: 12,
          successRate: 95.8
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Text>Carregando dashboard...</Text>
      </Box>
    );
  }

  return (
    <Layout>
      <Header />
      <Box padding="4" maxWidth="1200px" margin="0 auto">
        <Box marginBottom="4">
          <Title as="h1">Dashboard</Title>
          <Text color="neutral-textLow">
            Visão geral das transações do gateway Payco
          </Text>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
          gap="4"
          marginBottom="6"
        >
          <StatsCard
            title="Total de Transações"
            value={stats.totalTransactions.toLocaleString('pt-BR')}
            icon="📊"
            color="primary"
          />
          <StatsCard
            title="Volume Total"
            value={formatCurrency(stats.totalAmount)}
            icon="💰"
            color="success"
          />
          <StatsCard
            title="Pagamentos Pendentes"
            value={stats.pendingPayments}
            icon="⏳"
            color="warning"
          />
          <StatsCard
            title="Taxa de Sucesso"
            value={`${stats.successRate}%`}
            icon="✓"
            color="success"
          />
        </Box>

        <Box
          padding="4"
          backgroundColor="primary-surface"
          borderRadius="base"
          textAlign="center"
        >
          <Title as="h3" marginBottom="2">
            Painel completo em desenvolvimento
          </Title>
          <Text color="neutral-textLow">
            Em breve você terá acesso a relatórios detalhados, gráficos de transações e muito mais.
          </Text>
        </Box>
      </Box>
    </Layout>
  );
}

export default DashboardPage;
