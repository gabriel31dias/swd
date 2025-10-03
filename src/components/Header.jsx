function Header() {
  return (
    <div style={{
      padding: '1rem',
      backgroundColor: '#ebf8ff',
      borderBottom: '1px solid #cbd5e0'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#3182ce',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '1.5rem' }}>💳</span>
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Payco Gateway</h2>
            <p style={{ fontSize: '0.875rem', color: '#718096', margin: 0 }}>
              Gateway de Pagamento para Nuvemshop
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
