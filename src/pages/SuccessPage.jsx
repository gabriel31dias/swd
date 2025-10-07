import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const storeId = searchParams.get('store_id');

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      handleInstallCode(code);
    }

    // Redireciona automaticamente após 5 segundos
   

    return () => clearTimeout(timer);
  }, [storeId, navigate]);

  const handleInstallCode = async (code) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/install?code=${code}`);
      console.log('Install response:', response.data);
    } catch (error) {
      console.error('Erro ao processar código de instalação:', error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '1rem',
      backgroundColor: '#f7fafc'
    }}>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '64px', color: '#48bb78' }}>✓</div>
        </div>

        <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Instalação Concluída!
        </h1>

        <p style={{ fontSize: '1rem', marginBottom: '1.5rem', color: '#718096' }}>
          O gateway de pagamento Payco foi instalado com sucesso na sua loja.
        </p>

        <div style={{
          padding: '0.75rem',
          backgroundColor: '#f0fff4',
          borderRadius: '6px',
          marginBottom: '1.5rem'
        }}>
          <p style={{ fontSize: '0.875rem' }}>
            Você será redirecionado para a página de configuração em 5 segundos...
          </p>
        </div>

        <button
          onClick={() => navigate(`/config?store_id=${storeId}`)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#3182ce',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Ir para Configurações
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;
