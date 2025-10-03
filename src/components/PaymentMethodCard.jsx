function PaymentMethodCard({
  title,
  description,
  icon,
  enabled,
  onToggle,
  children,
  recommended = false
}) {
  return (
    <div style={{
      marginBottom: '0.75rem',
      padding: '1rem',
      backgroundColor: enabled ? '#ebf8ff' : '#f7fafc',
      borderRadius: '6px',
      border: '1px solid',
      borderColor: enabled ? '#3182ce' : '#cbd5e0',
      transition: 'all 0.2s'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          flex: '1'
        }}>
          <div style={{ fontSize: '1.5rem' }}>{icon}</div>
          <div style={{ flex: '1' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontWeight: '500' }}>{title}</span>
              {recommended && (
                <span style={{
                  fontSize: '0.75rem',
                  padding: '0.125rem 0.5rem',
                  backgroundColor: '#3182ce',
                  color: 'white',
                  borderRadius: '4px'
                }}>
                  Recomendado
                </span>
              )}
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: '#718096',
              margin: 0,
              marginTop: '0.25rem'
            }}>
              {description}
            </p>
          </div>
        </div>
        <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={enabled}
            onChange={onToggle}
            aria-label={`Ativar ${title}`}
            style={{
              width: '2.5rem',
              height: '1.5rem',
              cursor: 'pointer'
            }}
          />
        </label>
      </div>

      {enabled && children && (
        <div style={{
          marginTop: '0.75rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid #cbd5e0'
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default PaymentMethodCard;
