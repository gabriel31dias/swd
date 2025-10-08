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
import { initNexo, showToast, getStoreId } from '../services/nexoClient';
import { getStoreConfig, updateStoreConfig } from '../services/storeApi';

function ConfigPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchParams] = useSearchParams();
  const [storeId, setStoreId] = useState(searchParams.get('store_id') || null);
  const [storeInfo, setStoreInfo] = useState(null);
  const [config, setConfig] = useState({
    enabled: false,
    paycoApiKey: '',
    paycoClientId: '',
    paymentMethods: []
  });
  const [showSecret, setShowSecret] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Inicializar Nexo
        await initNexo();

        // Obter storeId do ACTION_AUTH_SESSION_TOKEN
        let id = storeId;
        if (!id) {
          id = await getStoreId();
          setStoreId(id);
        }

        if (id) {
          await loadConfig(id);
        } else {
          setMessage({
            type: 'danger',
            text: 'Não foi possível obter o ID da loja.'
          });
          setLoading(false);
        }
      } catch (err) {
        console.error('Erro ao inicializar:', err);
        setMessage({
          type: 'danger',
          text: 'Erro ao inicializar aplicação.'
        });
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  const loadConfig = async (id) => {
    try {
      const data = await getStoreConfig(id);

      // Armazenar informações da store
      setStoreInfo(data.storeInfo);

      // Popular configurações do gateway
      if (data.gatewayConfig) {
        setConfig({
          enabled: data.gatewayConfig.enabled || false,
          paycoApiKey: data.gatewayConfig.paycoApiKey || '',
          paycoClientId: data.gatewayConfig.paycoClientId || '',
          paymentMethods: data.gatewayConfig.paymentMethods || []
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
      await updateStoreConfig(storeId, {
        gatewayConfig: config
      });

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

  const togglePaymentMethod = (method) => {
    const methods = config.paymentMethods.includes(method)
      ? config.paymentMethods.filter(m => m !== method)
      : [...config.paymentMethods, method];

    setConfig({
      ...config,
      paymentMethods: methods
    });
  };

  const isPaymentMethodEnabled = (method) => {
    return config.paymentMethods.includes(method);
  };

  if (loading) {
    return (
      <Box padding="4" display="flex" justifyContent="center" alignItems="center">
        <Text>Carregando configurações...</Text>
      </Box>
    );
  }

  if (!storeId) {
    return (
      <Box padding="4" display="flex" justifyContent="center" alignItems="center">
        <Alert appearance="danger" title="Erro: ID da loja não encontrado" />
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
              <Label>Payco Client ID</Label>
              <Input
                type="text"
                value={config.paycoClientId}
                onChange={(e) => setConfig({ ...config, paycoClientId: e.target.value })}
                placeholder="Digite seu Client ID"
              />
            </Box>

            <Box>
              <Label>Payco API Key</Label>
              <Box display="flex" gap="2">
                <Input
                  type={showSecret ? 'text' : 'password'}
                  value={config.paycoApiKey}
                  onChange={(e) => setConfig({ ...config, paycoApiKey: e.target.value })}
                  placeholder="Digite sua API Key"
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
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Title as="h4">💳 Cartão de Crédito</Title>
                      <Text fontSize="caption" color="neutral-textLow">
                        Aceite pagamentos parcelados em até 12x
                      </Text>
                    </Box>
                    <Checkbox
                      checked={isPaymentMethodEnabled('credit_card')}
                      onChange={() => togglePaymentMethod('credit_card')}
                      label="Ativo"
                    />
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
                      checked={isPaymentMethodEnabled('pix')}
                      onChange={() => togglePaymentMethod('pix')}
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
                      checked={isPaymentMethodEnabled('boleto')}
                      onChange={() => togglePaymentMethod('boleto')}
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
              {storeInfo && (
                <>
                  <Text>
                    <strong>Nome da Loja:</strong> {storeInfo.name || 'N/A'}
                  </Text>
                  <Text>
                    <strong>URL:</strong> {storeInfo.url || 'N/A'}
                  </Text>
                </>
              )}
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
