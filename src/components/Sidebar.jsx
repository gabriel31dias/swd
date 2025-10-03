import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const storeId = searchParams.get('store_id') || '123456';

  const menuItems = [
    { path: `/dashboard?store_id=${storeId}`, label: 'Dashboard', icon: '📊' },
    { path: `/config?store_id=${storeId}`, label: 'Configurações', icon: '⚙️' },
    { path: `/transactions?store_id=${storeId}`, label: 'Transações', icon: '💰' },
  ];

  const isActive = (path) => {
    return location.pathname === path.split('?')[0];
  };

  return (
    <div style={{
      width: '240px',
      backgroundColor: '#f7fafc',
      borderRight: '1px solid #cbd5e0',
      minHeight: '100vh',
      padding: '1rem'
    }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.75rem', color: '#718096', fontWeight: '500', margin: 0 }}>
          MENU
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              padding: '0.75rem',
              borderRadius: '6px',
              backgroundColor: isActive(item.path) ? '#ebf8ff' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}>
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <span style={{
                fontWeight: isActive(item.path) ? '500' : '400',
                color: isActive(item.path) ? '#2c5282' : '#2d3748'
              }}>
                {item.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
