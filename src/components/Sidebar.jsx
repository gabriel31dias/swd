import { Box, Text } from '@nimbus-ds/components';
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
    <Box
      width="240px"
      backgroundColor="neutral-surface"
      borderRight="1px solid"
      borderColor="neutral-interactive"
      minHeight="100vh"
      padding="4"
    >
      <Box marginBottom="6">
        <Text fontSize="caption" color="neutral-textLow" fontWeight="medium">
          MENU
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{ textDecoration: 'none' }}
          >
            <Box
              padding="3"
              borderRadius="base"
              backgroundColor={isActive(item.path) ? 'primary-surface' : 'transparent'}
              display="flex"
              alignItems="center"
              gap="2"
              style={{
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <Text
                fontWeight={isActive(item.path) ? 'medium' : 'regular'}
                color={isActive(item.path) ? 'primary-textHigh' : 'neutral-textHigh'}
              >
                {item.label}
              </Text>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
}

export default Sidebar;
