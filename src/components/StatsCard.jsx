import { Box, Card, Text, Title } from '@nimbus-ds/components';

function StatsCard({ title, value, icon, color = 'primary' }) {
  return (
    <Card>
      <Box padding="4">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Text fontSize="caption" color="neutral-textLow" marginBottom="1">
              {title}
            </Text>
            <Title as="h3" fontSize="h3">{value}</Title>
          </Box>
          <Box
            fontSize="h1"
            color={`${color}-textHigh`}
          >
            {icon}
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default StatsCard;
