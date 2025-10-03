import { Box, Toggle, Text, Input, Badge } from '@nimbus-ds/components';

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
    <Box
      marginBottom="3"
      padding="4"
      backgroundColor={enabled ? 'primary-surface' : 'neutral-surface'}
      borderRadius="base"
      border="1px solid"
      borderColor={enabled ? 'primary-interactive' : 'neutral-interactive'}
      transition="all 0.2s"
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box display="flex" gap="3" alignItems="center" flex="1">
          <Box fontSize="h2">{icon}</Box>
          <Box flex="1">
            <Box display="flex" alignItems="center" gap="2">
              <Text fontWeight="medium">{title}</Text>
              {recommended && (
                <Badge appearance="primary">Recomendado</Badge>
              )}
            </Box>
            <Text fontSize="caption" color="neutral-textLow">
              {description}
            </Text>
          </Box>
        </Box>
        <Toggle
          checked={enabled}
          onChange={onToggle}
          aria-label={`Ativar ${title}`}
        />
      </Box>

      {enabled && children && (
        <Box marginTop="3" paddingTop="3" borderTop="1px solid" borderColor="neutral-interactive">
          {children}
        </Box>
      )}
    </Box>
  );
}

export default PaymentMethodCard;
