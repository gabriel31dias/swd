import nexo, { connect, iAmReady, getStoreInfo as nexoGetStoreInfo } from '@tiendanube/nexo';

let nexoClient = null;
let isConnected = false;

export const initNexo = async () => {
  try {
    nexoClient = nexo.create({
      clientId: '21916',
      log: true
    });

    await connect(nexoClient);
    isConnected = true;

    // Notificar que o app está pronto
    iAmReady(nexoClient);

    console.log('Nexo conectado com sucesso');
    return nexoClient;
  } catch (error) {
    console.error('Erro ao conectar com Nexo:', error);
    throw error;
  }
};

export const getNexoClient = () => {
  if (!nexoClient) {
    console.warn('Nexo client não foi inicializado');
  }
  return nexoClient;
};

export const isNexoConnected = () => isConnected;

// Funções auxiliares para navegação
export const navigateToApp = (route) => {
  if (nexoClient) {
    nexoClient.navigate(route);
  }
};

export const goBack = () => {
  if (nexoClient) {
    nexoClient.goBack();
  }
};

// Função para mostrar toast/notificações
export const showToast = (message, type = 'success') => {
  if (nexoClient) {
    nexoClient.showToast({
      message,
      type, // 'success', 'error', 'warning', 'info'
      duration: 3000
    });
  }
};

// Função para obter informações da loja
export const getStoreInfo = async () => {
  if (!nexoClient) {
    throw new Error('Nexo client não está inicializado');
  }

  try {
    const storeInfo = await nexoGetStoreInfo(nexoClient);
    return storeInfo;
  } catch (error) {
    console.error('Erro ao obter informações da loja:', error);
    throw error;
  }
};

// Função para obter o storeId usando getStoreInfo
export const getStoreId = async () => {
  if (!nexoClient) {
    throw new Error('Nexo client não está inicializado');
  }

  try {
    const storeInfo = await nexoGetStoreInfo(nexoClient);
    return storeInfo?.id || null;
  } catch (error) {
    console.error('Erro ao obter storeId:', error);
    throw error;
  }
};
