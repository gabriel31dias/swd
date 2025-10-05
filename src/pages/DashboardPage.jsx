import { useState, useEffect } from 'react';
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
    const code = searchParams.get('code');
    if (code) {
      handleInstallCode(code);
    }
    loadStats();
  }, []);

  const handleInstallCode = async (code) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/install?code=${code}`);
      console.log('Install response:', response.data);
    } catch (error) {
      console.error('Erro ao processar código de instalação:', error);
    }
  };

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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p>Carregando dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', margin: 0 }}>Dashboard</h1>
          <p style={{ color: '#718096', margin: 0, marginTop: '0.25rem' }}>
            Visão geral das transações do gateway Payco
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
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
        </div>

        <div style={{
          padding: '1rem',
          backgroundColor: '#ebf8ff',
          borderRadius: '6px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
            Painel completo em desenvolvimento
          </h3>
          <p style={{ color: '#718096', margin: 0 }}>
            Em breve você terá acesso a relatórios detalhados, gráficos de transações e muito mais.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
