import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Card,
  Title,
  Text,
  Input,
  Button,
  Alert,
  Toggle,
  Select,
  Checkbox,
  Label
} from '@nimbus-ds/components';
import { initNexo, showToast } from '../services/nexoClient';

function ConfigPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchParams] = useSearchParams();
  const storeId = searchParams.get('store_id') || '123456';
  const [config, setConfig] = useState({
    enabled: false,
    clientId: '',
    clientSecret: '',
    paymentMethods: {
      creditCard: {
        enabled: true,
        installments: 12
      },
      debitCard: {
        enabled: true
      },
      pix: {
        enabled: true
      },
      boleto: {
        enabled: false
      }
    }
  });
  const [showSecret, setShowSecret] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // Inicializar Nexo
    initNexo().catch(err => {
      console.error('Erro ao inicializar Nexo:', err);
    });

    loadConfig(storeId);
  }, [storeId]);

  const loadConfig = async (id) => {
    try {
      const response = await axios.get(`/api/payment-provider/${id}`);
      if (response.data.settings) {
        setConfig({
          enabled: response.data.settings.enabled || false,
          clientId: response.data.settings.clientId || '',
          clientSecret: response.data.settings.clientSecret || '',
          paymentMethods: response.data.settings.paymentMethods || config.paymentMethods
        });
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      setMessage({
        type: 'warning',
        text: 'Configurações padrão carregadas. Configure e salve para ativar o gateway.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      await axios.put(`/api/payment-provider/${storeId}/settings`, config);
      setMessage({
        type: 'success',
        text: 'Configurações salvas com sucesso! Seu gateway está ativo.'
      });

      // Mostrar toast usando Nexo
      showToast('Configurações salvas com sucesso!', 'success');
    } catch (error) {
      setMessage({
        type: 'danger',
        text: 'Erro ao salvar configurações. Tente novamente.'
      });
      showToast('Erro ao salvar configurações', 'error');
    } finally {
      setSaving(false);
    }
  };

  const updatePaymentMethod = (method, field, value) => {
    setConfig({
      ...config,
      paymentMethods: {
        ...config.paymentMethods,
        [method]: {
          ...config.paymentMethods[method],
          [field]: value
        }
      }
    });
  };

  const installmentOptions = [
    { label: '1x sem juros', value: '1' },
    { label: '2x sem juros', value: '2' },
    { label: '3x sem juros', value: '3' },
    { label: '6x sem juros', value: '6' },
    { label: '12x sem juros', value: '12' }
  ];

  if (loading) {
    return (
      <Box padding="4" display="flex" justifyContent="center" alignItems="center">
        <Text>Carregando configurações...</Text>
      </Box>
    );
  }

  return (
    <Box padding="4" maxWidth="900px" margin="0 auto">
      <Box marginBottom="6">
        <Title as="h1">Configuração do Gateway Payco</Title>
        <Text color="neutral-textLow">
          Configure os métodos de pagamento disponíveis na sua loja
        </Text>
      </Box>

      {message.text && (
        <Box marginBottom="4">
          <Alert appearance={message.type} title={message.text} />
        </Box>
      )}

      {/* Credenciais da API */}
      <Card>
        <Card.Header>
          <Title as="h3">Credenciais da API</Title>
        </Card.Header>
        <Card.Body>
          <Box display="flex" flexDirection="column" gap="4">
            <Box>
              <Label>Client ID</Label>
              <Input
                type="text"
                value={config.clientId}
                onChange={(e) => setConfig({ ...config, clientId: e.target.value })}
                placeholder="Digite seu Client ID"
              />
            </Box>

            <Box>
              <Label>Client Secret</Label>
              <Box display="flex" gap="2">
                <Input
                  type={showSecret ? 'text' : 'password'}
                  value={config.clientSecret}
                  onChange={(e) => setConfig({ ...config, clientSecret: e.target.value })}
                  placeholder="Digite seu Client Secret"
                />
                <Button
                  appearance="default"
                  onClick={() => setShowSecret(!showSecret)}
                >
                  {showSecret ? '🙈' : '👁️'}
                </Button>
              </Box>
              <Text fontSize="caption" color="neutral-textLow">
                Suas credenciais são armazenadas de forma segura e criptografada
              </Text>
            </Box>
          </Box>
        </Card.Body>
      </Card>

      {/* Status do Gateway */}
      <Box marginTop="4">
        <Card>
          <Card.Body>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Title as="h3">Status do Gateway</Title>
                <Text color="neutral-textLow">
                  {config.enabled
                    ? '✓ Gateway ativo e processando pagamentos'
                    : '○ Gateway desativado - ative para começar a receber pagamentos'}
                </Text>
              </Box>
              <Toggle
                checked={config.enabled}
                onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                label={config.enabled ? 'Ativo' : 'Inativo'}
              />
            </Box>
          </Card.Body>
        </Card>
      </Box>

      {/* Métodos de Pagamento */}
      <Box marginTop="4">
        <Card>
          <Card.Header>
            <Title as="h3">Métodos de Pagamento</Title>
          </Card.Header>
          <Card.Body>
            <Box display="flex" flexDirection="column" gap="4">

              {/* Cartão de Crédito */}
              <Card>
                <Card.Body>
                  <Box display="flex" flexDirection="column" gap="3">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Title as="h4">💳 Cartão de Crédito</Title>
                        <Text fontSize="caption" color="neutral-textLow">
                          Aceite pagamentos parcelados em até 12x
                        </Text>
                      </Box>
                      <Checkbox
                        checked={config.paymentMethods.creditCard.enabled}
                        onChange={(e) => updatePaymentMethod('creditCard', 'enabled', e.target.checked)}
                        label="Ativo"
                      />
                    </Box>

                    {config.paymentMethods.creditCard.enabled && (
                      <Box>
                        <Label>Número máximo de parcelas</Label>
                        <Select
                          value={String(config.paymentMethods.creditCard.installments)}
                          onChange={(e) => updatePaymentMethod('creditCard', 'installments', parseInt(e.target.value))}
                          options={installmentOptions}
                        />
                      </Box>
                    )}
                  </Box>
                </Card.Body>
              </Card>

              {/* PIX */}
              <Card>
                <Card.Body>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Title as="h4">📱 PIX</Title>
                      <Text fontSize="caption" color="neutral-textLow">
                        Pagamento instantâneo e aprovação imediata
                      </Text>
                    </Box>
                    <Checkbox
                      checked={config.paymentMethods.pix.enabled}
                      onChange={(e) => updatePaymentMethod('pix', 'enabled', e.target.checked)}
                      label="Ativo"
                    />
                  </Box>
                </Card.Body>
              </Card>

              {/* Cartão de Débito */}
              <Card>
                <Card.Body>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Title as="h4">💳 Cartão de Débito</Title>
                      <Text fontSize="caption" color="neutral-textLow">
                        Pagamento à vista com aprovação instantânea
                      </Text>
                    </Box>
                    <Checkbox
                      checked={config.paymentMethods.debitCard.enabled}
                      onChange={(e) => updatePaymentMethod('debitCard', 'enabled', e.target.checked)}
                      label="Ativo"
                    />
                  </Box>
                </Card.Body>
              </Card>

              {/* Boleto */}
              <Card>
                <Card.Body>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Title as="h4">🧾 Boleto Bancário</Title>
                      <Text fontSize="caption" color="neutral-textLow">
                        Vencimento em 3 dias úteis
                      </Text>
                    </Box>
                    <Checkbox
                      checked={config.paymentMethods.boleto.enabled}
                      onChange={(e) => updatePaymentMethod('boleto', 'enabled', e.target.checked)}
                      label="Ativo"
                    />
                  </Box>
                </Card.Body>
              </Card>

            </Box>
          </Card.Body>
          <Card.Footer>
            <Box display="flex" justifyContent="flex-end" gap="2">
              <Button
                appearance="default"
                onClick={() => window.location.reload()}
              >
                Cancelar
              </Button>
              <Button
                appearance="primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Salvando...' : 'Salvar Configurações'}
              </Button>
            </Box>
          </Card.Footer>
        </Card>
      </Box>

      {/* Informações */}
      <Box marginTop="4">
        <Card>
          <Card.Header>
            <Title as="h3">Informações</Title>
          </Card.Header>
          <Card.Body>
            <Box display="flex" flexDirection="column" gap="2">
              <Text>
                <strong>ID da Loja:</strong> {storeId}
              </Text>
              <Text fontSize="caption" color="neutral-textLow">
                Para suporte, acesse: payco.com.br/suporte
              </Text>
            </Box>
          </Card.Body>
        </Card>
      </Box>
    </Box>
  );
}

export default ConfigPage;
