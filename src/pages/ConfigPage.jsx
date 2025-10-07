import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

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
    } catch (error) {
      setMessage({
        type: 'danger',
        text: 'Erro ao salvar configurações. Tente novamente.'
      });
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

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Carregando configurações...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '28px' }}>Configuração do Gateway Payco</h1>
        <p style={{ margin: 0, color: '#666' }}>Configure os métodos de pagamento disponíveis na sua loja</p>
      </div>

      {message.text && (
        <div style={{
          padding: '15px',
          marginBottom: '20px',
          borderRadius: '8px',
          backgroundColor: message.type === 'success' ? '#d4edda' : message.type === 'warning' ? '#fff3cd' : '#f8d7da',
          color: message.type === 'success' ? '#155724' : message.type === 'warning' ? '#856404' : '#721c24',
          border: `1px solid ${message.type === 'success' ? '#c3e6cb' : message.type === 'warning' ? '#ffeeba' : '#f5c6cb'}`
        }}>
          {message.text}
        </div>
      )}

      <div style={{ padding: '20px', borderRadius: '8px', backgroundColor: 'white', border: '1px solid #dee2e6', marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 20px 0' }}>Credenciais da API</h3>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>
            Client ID
          </label>
          <input
            type="text"
            value={config.clientId}
            onChange={(e) => setConfig({ ...config, clientId: e.target.value })}
            placeholder="Digite seu Client ID"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '4px',
              border: '1px solid #cbd5e0',
              fontSize: '14px',
              fontFamily: 'monospace'
            }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>
            Client Secret
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showSecret ? 'text' : 'password'}
              value={config.clientSecret}
              onChange={(e) => setConfig({ ...config, clientSecret: e.target.value })}
              placeholder="Digite seu Client Secret"
              style={{
                width: '100%',
                padding: '10px 12px',
                paddingRight: '45px',
                borderRadius: '4px',
                border: '1px solid #cbd5e0',
                fontSize: '14px',
                fontFamily: 'monospace'
              }}
            />
            <button
              type="button"
              onClick={() => setShowSecret(!showSecret)}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: '18px',
                padding: '4px 8px'
              }}
            >
              {showSecret ? '🙈' : '👁️'}
            </button>
          </div>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#666' }}>
            Suas credenciais são armazenadas de forma segura e criptografada
          </p>
        </div>
      </div>

      <div style={{
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '8px',
        backgroundColor: config.enabled ? '#d4edda' : '#f8f9fa',
        border: '1px solid #dee2e6',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h3 style={{ margin: '0 0 8px 0' }}>Status do Gateway</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            {config.enabled
              ? '✓ Gateway ativo e processando pagamentos'
              : '○ Gateway desativado - ative para começar a receber pagamentos'}
          </p>
        </div>
        <button
          onClick={() => setConfig({ ...config, enabled: !config.enabled })}
          style={{
            padding: '10px 20px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: config.enabled ? '#dc3545' : '#007bff',
            color: 'white',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          {config.enabled ? 'Desativar' : 'Ativar Gateway'}
        </button>
      </div>

      <div style={{ padding: '20px', borderRadius: '8px', backgroundColor: 'white', border: '1px solid #dee2e6' }}>
        <h3 style={{ margin: '0 0 20px 0' }}>Métodos de Pagamento</h3>

        {/* Cartão de Crédito */}
        <div style={{ padding: '20px', marginBottom: '15px', border: '1px solid #dee2e6', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <h4 style={{ margin: '0 0 5px 0' }}>💳 Cartão de Crédito</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Aceite pagamentos parcelados em até 12x</p>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={config.paymentMethods.creditCard.enabled}
                onChange={(e) => updatePaymentMethod('creditCard', 'enabled', e.target.checked)}
                style={{ marginRight: '8px', width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <span>Ativo</span>
            </label>
          </div>
          {config.paymentMethods.creditCard.enabled && (
            <div style={{ marginTop: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>
                Número máximo de parcelas
              </label>
              <select
                value={config.paymentMethods.creditCard.installments}
                onChange={(e) => updatePaymentMethod('creditCard', 'installments', parseInt(e.target.value))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid #cbd5e0',
                  fontSize: '14px'
                }}
              >
                <option value="1">1x sem juros</option>
                <option value="2">2x sem juros</option>
                <option value="3">3x sem juros</option>
                <option value="6">6x sem juros</option>
                <option value="12">12x sem juros</option>
              </select>
            </div>
          )}
        </div>

        {/* PIX */}
        <div style={{ padding: '20px', marginBottom: '15px', border: '1px solid #dee2e6', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0 0 5px 0' }}>📱 PIX</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Pagamento instantâneo e aprovação imediata</p>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={config.paymentMethods.pix.enabled}
                onChange={(e) => updatePaymentMethod('pix', 'enabled', e.target.checked)}
                style={{ marginRight: '8px', width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <span>Ativo</span>
            </label>
          </div>
        </div>

        {/* Cartão de Débito */}
        <div style={{ padding: '20px', marginBottom: '15px', border: '1px solid #dee2e6', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0 0 5px 0' }}>💳 Cartão de Débito</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Pagamento à vista com aprovação instantânea</p>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={config.paymentMethods.debitCard.enabled}
                onChange={(e) => updatePaymentMethod('debitCard', 'enabled', e.target.checked)}
                style={{ marginRight: '8px', width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <span>Ativo</span>
            </label>
          </div>
        </div>

        {/* Boleto */}
        <div style={{ padding: '20px', marginBottom: '15px', border: '1px solid #dee2e6', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0 0 5px 0' }}>🧾 Boleto Bancário</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Vencimento em 3 dias úteis</p>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={config.paymentMethods.boleto.enabled}
                onChange={(e) => updatePaymentMethod('boleto', 'enabled', e.target.checked)}
                style={{ marginRight: '8px', width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <span>Ativo</span>
            </label>
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              borderRadius: '6px',
              border: '1px solid #dee2e6',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#007bff',
              color: 'white',
              cursor: saving ? 'not-allowed' : 'pointer',
              fontWeight: '500',
              opacity: saving ? 0.6 : 1
            }}
          >
            {saving ? 'Salvando...' : 'Salvar Configurações'}
          </button>
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '20px', borderRadius: '8px', backgroundColor: 'white', border: '1px solid #dee2e6' }}>
        <h3 style={{ margin: '0 0 15px 0' }}>Informações</h3>
        <p style={{ margin: '0 0 10px 0' }}>
          <strong>ID da Loja:</strong> {storeId}
        </p>
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          Para suporte, acesse: payco.com.br/suporte
        </p>
      </div>
    </div>
  );
}

export default ConfigPage;
