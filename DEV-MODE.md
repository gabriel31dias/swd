# Modo Desenvolvedor - Nuvemshop App

## Como testar a aplicação no modo desenvolvedor

### 1. Configurar o ambiente

Certifique-se de que todas as dependências estão instaladas:

```bash
npm install
```

### 2. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

O Vite iniciará o servidor local, geralmente em `http://localhost:5173`

### 3. Habilitar o Modo Desenvolvedor no Admin da Nuvemshop

1. Acesse o painel administrativo da sua loja Nuvemshop
2. Navegue até **Minha Nuvemshop** → **Aplicativos**
3. Encontre seu aplicativo na lista
4. Ative o **Modo Desenvolvedor** nas configurações do app
5. Configure a URL do iframe para apontar para seu servidor local: `http://localhost:5173/config`

### 4. Testar a integração

Com o modo desenvolvedor ativo:

- A aplicação será carregada dentro de um iframe no Admin da Nuvemshop
- O Nexo SDK estabelecerá a comunicação entre o app e o Admin
- Você poderá testar todas as funcionalidades em tempo real

### 5. Recursos importantes

#### Nexo SDK
O Nexo SDK permite:
- Comunicação bidirecional entre o app e o Admin
- Navegação dentro do Admin
- Exibição de toasts/notificações
- Acesso a dados da loja

#### Nimbus Design System
Todos os componentes seguem o Nimbus DS:
- Consistência visual com o Admin da Nuvemshop
- Componentes otimizados e acessíveis
- Tema responsivo

### 6. Endpoints da API

A aplicação espera os seguintes endpoints no backend:

#### GET `/api/payment-provider/:storeId`
Retorna as configurações do gateway para uma loja específica.

**Resposta esperada:**
```json
{
  "settings": {
    "enabled": true,
    "clientId": "seu-client-id",
    "clientSecret": "seu-client-secret",
    "paymentMethods": {
      "creditCard": {
        "enabled": true,
        "installments": 12
      },
      "debitCard": {
        "enabled": true
      },
      "pix": {
        "enabled": true
      },
      "boleto": {
        "enabled": false
      }
    }
  }
}
```

#### PUT `/api/payment-provider/:storeId/settings`
Atualiza as configurações do gateway.

**Body esperado:**
```json
{
  "enabled": true,
  "clientId": "seu-client-id",
  "clientSecret": "seu-client-secret",
  "paymentMethods": {
    "creditCard": {
      "enabled": true,
      "installments": 12
    },
    "debitCard": {
      "enabled": true
    },
    "pix": {
      "enabled": true
    },
    "boleto": {
      "enabled": false
    }
  }
}
```

### 7. Variáveis de ambiente

Configure o arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
VITE_NEXO_CLIENT_ID=payco-payment-gateway
```

### 8. Debugging

Para debugar a integração com Nexo:

1. Abra o console do navegador (F12)
2. O Nexo SDK está configurado com `log: true` e mostrará mensagens detalhadas
3. Verifique erros de comunicação e eventos do Nexo

### 9. Checklist antes de publicar

- [ ] Testou todas as funcionalidades no modo desenvolvedor
- [ ] Verificou a responsividade em diferentes resoluções
- [ ] Confirmou que os toasts do Nexo estão funcionando
- [ ] Validou a persistência das configurações
- [ ] Testou todos os métodos de pagamento
- [ ] Verificou o comportamento de erro (API offline, etc.)
- [ ] Revisou a UX seguindo as diretrizes do Nimbus DS

### 10. Documentação oficial

- [Nuvemshop - Aplicações Nativas](https://dev.nuvemshop.com.br/docs/applications/native)
- [Nexo SDK](https://github.com/TiendaNube/nexo)
- [Nimbus Design System](https://nimbus.nuvemshop.com.br/)

## Problemas comuns

### CORS errors
Se você encontrar erros de CORS durante o desenvolvimento, configure o proxy no `vite.config.js` ou configure o CORS no seu backend.

### Nexo não conecta
Certifique-se de que:
1. A aplicação está rodando dentro de um iframe do Admin Nuvemshop
2. O modo desenvolvedor está ativado
3. A URL configurada no Admin está correta

### Componentes Nimbus não aparecem
Verifique se importou o CSS do Nimbus no `main.jsx`:
```javascript
import '@nimbus-ds/styles/dist/index.css';
```
