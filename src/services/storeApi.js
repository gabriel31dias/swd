import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Busca as configurações da store
 * @param {string} storeId - ID da loja
 * @returns {Promise} Dados da store
 */
export const getStoreConfig = async (storeId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/store/${storeId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar configurações da store:', error);
    throw error;
  }
};

/**
 * Atualiza as configurações da store
 * @param {string} storeId - ID da loja
 * @param {object} config - Configurações a serem atualizadas
 * @returns {Promise} Dados atualizados
 */
export const updateStoreConfig = async (storeId, config) => {
  try {
    const response = await axios.post(
      `https://swd-olive.vercel.app/api/payment-provider/${storeId}/settings`,
      {
        paycoApiKey: config.gatewayConfig.paycoApiKey,
        paycoClientId: config.gatewayConfig.paycoClientId,
        enabled: config.gatewayConfig.enabled,
        paymentMethods: config.gatewayConfig.paymentMethods
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar configurações da store:', error);
    throw error;
  }
};
