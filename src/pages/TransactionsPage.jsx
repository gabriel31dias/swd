import { useState, useEffect } from 'react';
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
      paid: { label: 'Pago', color: '#48bb78' },
      authorized: { label: 'Autorizado', color: '#3182ce' },
      pending: { label: 'Pendente', color: '#ed8936' },
      cancelled: { label: 'Cancelado', color: '#f56565' },
      refunded: { label: 'Reembolsado', color: '#718096' }
    };

    const config = statusMap[status] || { label: status, color: '#718096' };
    return (
      <span style={{
        padding: '0.25rem 0.5rem',
        backgroundColor: config.color + '20',
        color: config.color,
        borderRadius: '4px',
        fontSize: '0.75rem',
        fontWeight: '500'
      }}>
        {config.label}
      </span>
    );
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p>Carregando transações...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', margin: 0 }}>Transações</h1>
          <p style={{ color: '#718096', margin: 0, marginTop: '0.25rem' }}>
            Histórico de todas as transações processadas
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          padding: '1rem'
        }}>
          <div style={{ overflowX: 'auto' }}>
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
                      <span style={{ fontWeight: '500' }}>{transaction.id}</span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ fontSize: '0.875rem' }}>
                        {new Date(transaction.date).toLocaleDateString('pt-BR')}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span>{transaction.customer}</span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ fontSize: '0.875rem' }}>
                        {getMethodLabel(transaction.method)}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <span style={{ fontWeight: '500' }}>
                        {formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      {getStatusBadge(transaction.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {transactions.length === 0 && (
            <div style={{ padding: '1.5rem', textAlign: 'center' }}>
              <p style={{ color: '#718096' }}>
                Nenhuma transação encontrada
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionsPage;
