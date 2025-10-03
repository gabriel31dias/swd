import { useState, useEffect } from 'react';
import {
  Box,
  Title,
  Text,
  Card,
  Table,
  Badge,
  Button,
  Layout
} from '@nimbus-ds/components';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';

function TransactionsPage() {
  const [searchParams] = useSearchParams();
  const storeId = searchParams.get('store_id') || '123456';
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      // Em produção, fazer chamada real:
      // const response = await axios.get(`/api/transactions/${storeId}`);

      // Dados simulados para demonstração
      setTimeout(() => {
        setTransactions([
          {
            id: 'TXN-001',
            date: '2025-10-03',
            customer: 'João Silva',
            amount: 150.00,
            method: 'credit_card',
            status: 'paid'
          },
          {
            id: 'TXN-002',
            date: '2025-10-03',
            customer: 'Maria Santos',
            amount: 89.90,
            method: 'pix',
            status: 'paid'
          },
          {
            id: 'TXN-003',
            date: '2025-10-02',
            customer: 'Pedro Costa',
            amount: 320.50,
            method: 'credit_card',
            status: 'authorized'
          },
          {
            id: 'TXN-004',
            date: '2025-10-02',
            customer: 'Ana Lima',
            amount: 45.00,
            method: 'debit_card',
            status: 'pending'
          },
          {
            id: 'TXN-005',
            date: '2025-10-01',
            customer: 'Carlos Souza',
            amount: 220.00,
            method: 'boleto',
            status: 'cancelled'
          }
        ]);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      paid: { label: 'Pago', appearance: 'success' },
      authorized: { label: 'Autorizado', appearance: 'primary' },
      pending: { label: 'Pendente', appearance: 'warning' },
      cancelled: { label: 'Cancelado', appearance: 'danger' },
      refunded: { label: 'Reembolsado', appearance: 'neutral' }
    };

    const config = statusMap[status] || { label: status, appearance: 'neutral' };
    return <Badge appearance={config.appearance}>{config.label}</Badge>;
  };

  const getMethodLabel = (method) => {
    const methods = {
      credit_card: '💳 Cartão de Crédito',
      debit_card: '💳 Cartão de Débito',
      pix: '📱 PIX',
      boleto: '🧾 Boleto'
    };
    return methods[method] || method;
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
        <Text>Carregando transações...</Text>
      </Box>
    );
  }

  return (
    <Layout>
      <Header />
      <Box padding="4" maxWidth="1200px" margin="0 auto">
        <Box marginBottom="4">
          <Title as="h1">Transações</Title>
          <Text color="neutral-textLow">
            Histórico de todas as transações processadas
          </Text>
        </Box>

        <Card>
          <Box padding="4">
            <Box overflowX="auto">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Data</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Cliente</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Método</th>
                    <th style={{ padding: '12px', textAlign: 'right' }}>Valor</th>
                    <th style={{ padding: '12px', textAlign: 'center' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      style={{ borderBottom: '1px solid #e2e8f0' }}
                    >
                      <td style={{ padding: '12px' }}>
                        <Text fontWeight="medium">{transaction.id}</Text>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Text fontSize="caption">
                          {new Date(transaction.date).toLocaleDateString('pt-BR')}
                        </Text>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Text>{transaction.customer}</Text>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Text fontSize="caption">
                          {getMethodLabel(transaction.method)}
                        </Text>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <Text fontWeight="medium">
                          {formatCurrency(transaction.amount)}
                        </Text>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        {getStatusBadge(transaction.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>

            {transactions.length === 0 && (
              <Box padding="6" textAlign="center">
                <Text color="neutral-textLow">
                  Nenhuma transação encontrada
                </Text>
              </Box>
            )}
          </Box>
        </Card>
      </Box>
    </Layout>
  );
}

export default TransactionsPage;
