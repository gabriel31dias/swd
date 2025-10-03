function StatsCard({ title, value, icon, color = 'primary' }) {
  const colorMap = {
    primary: '#3182ce',
    success: '#48bb78',
    warning: '#ed8936',
    danger: '#f56565'
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      padding: '1rem'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <p style={{
            fontSize: '0.875rem',
            color: '#718096',
            marginBottom: '0.25rem',
            margin: 0
          }}>
            {title}
          </p>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            margin: 0,
            marginTop: '0.25rem'
          }}>
            {value}
          </h3>
        </div>
        <div style={{
          fontSize: '2rem',
          color: colorMap[color] || colorMap.primary
        }}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
