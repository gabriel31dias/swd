import { useSearchParams } from 'react-router-dom';

function ErrorPage() {
  const [searchParams] = useSearchParams();
  const errorMessage = searchParams.get('message') || 'Ocorreu um erro durante a instalação.';

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
          <div style={{ fontSize: '64px', color: '#f56565' }}>✗</div>
        </div>

        <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Erro na Instalação
        </h1>

        <p style={{ fontSize: '1rem', marginBottom: '1.5rem', color: '#718096' }}>
          {errorMessage}
        </p>

        <div style={{
          padding: '0.75rem',
          backgroundColor: '#fff5f5',
          borderRadius: '6px',
          marginBottom: '1.5rem'
        }}>
          <p style={{ fontSize: '0.875rem' }}>
            Por favor, tente novamente ou entre em contato com o suporte.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button
            onClick={() => window.location.href = '/auth/install'}
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
            Tentar Novamente
          </button>
          <button
            onClick={() => window.open('https://payco.com.br/suporte', '_blank')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#e2e8f0',
              color: '#2d3748',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Contatar Suporte
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
