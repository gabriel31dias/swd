import { Box, Title, Text } from '@nimbus-ds/components';

function Header() {
  return (
    <Box
      padding="4"
      backgroundColor="primary-surface"
      borderBottom="1px solid"
      borderColor="neutral-interactive"
    >
      <Box maxWidth="1200px" margin="0 auto">
        <Box display="flex" alignItems="center" gap="3">
          <Box
            width="48px"
            height="48px"
            backgroundColor="primary-textHigh"
            borderRadius="base"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="h3" color="neutral-background">💳</Text>
          </Box>
          <Box>
            <Title as="h2" fontSize="h4">Payco Gateway</Title>
            <Text fontSize="caption" color="neutral-textLow">
              Gateway de Pagamento para Nuvemshop
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
