# 📧 Template EmailJS para Briefing

## 🎯 Problema Identificado

O briefing estava usando o **mesmo template do contrato** (`template_i076npw`), causando falhas no envio porque os parâmetros são incompatíveis:

- **Contrato**: Campos específicos (cliente_cpf, servico_preco, assinaturas, etc.)
- **Briefing**: Dados diferentes (nome artístico, projetos, referências, etc.)

## ✅ Solução

Criar um **template dedicado** para briefing com parâmetros simples e universais.

---

## 🛠️ Instruções para Criar o Template

### 1. Acessar EmailJS Dashboard
```
https://dashboard.emailjs.com/admin/templates
```

### 2. Criar Novo Template
- Clique em **"Create New Template"**
- **Template ID**: `template_briefing`
- **Template Name**: `Briefing Portfolio Audiovisual`

### 3. Configurações do Template

#### Service Settings:
- **Service**: `service_bj6c6km` (mesmo do contrato)

#### Email Settings:
```
To Name: {{to_name}}
To Email: {{to_email}}
From Name: {{from_name}}
From Email: {{from_email}}
Subject: {{subject}}
Reply To: {{reply_to}}
```

### 4. Conteúdo do Email

#### Subject:
```
{{subject}}
```

#### Body (HTML) - RECOMENDADO:
1. **Copie todo o conteúdo** do arquivo `TEMPLATE_HTML_BRIEFING.html`
2. **Cole no campo HTML** do template EmailJS
3. **Mantenha as variáveis** {{to_name}}, {{from_name}}, etc.

**Características do template HTML:**
- 🎨 **Design profissional** com gradientes e cores modernas
- 📱 **Responsivo** para desktop e mobile
- 📧 **Call-to-action** com botão para responder
- 🎬 **Temática audiovisual** com emojis e cores adequadas
- 📋 **Formatação clara** dos dados do briefing
- 👤 **Assinatura profissional** com seus dados

#### Body (Text) - Alternativo simples:
```
Olá {{to_name}},

Você recebeu um novo briefing de {{from_name}}!

📋 DETALHES DO BRIEFING:
{{message}}

📞 CONTATO:
Email: {{from_email}}

---
Este email foi enviado automaticamente pelo sistema de briefing.
```

### 5. Parâmetros Utilizados

| Parâmetro | Descrição | Exemplo |
|-----------|-----------|---------|
| `to_name` | Nome do destinatário | Rodrigo Rocha Giuntini |
| `to_email` | Email do destinatário | rodrigorochagiuntini@bityx.app |
| `from_name` | Nome do cliente | Willian / Nome artístico |
| `from_email` | Email do cliente | contato@willian.com |
| `subject` | Assunto do email | 🎬 Novo Briefing - Willian |
| `message` | Conteúdo formatado do briefing | Dados completos do briefing |
| `reply_to` | Email para resposta | contato@willian.com |
| `data_briefing` | Data/hora do briefing | 15 de dezembro de 2024 às 14:30 |

---

## 🎨 Preview Visual do Template

O template HTML criado oferece:

### **Header Elegante**
- Gradiente roxo/azul com título destacado
- Ícone 🎬 representando audiovisual
- Subtítulo identificando o sistema

### **Conteúdo Estruturado**
- Saudação personalizada com nome
- Box destacado com informações do cliente
- Área específica para detalhes do briefing (fonte monospace)
- Call-to-action com botão para resposta

### **Footer Profissional**
- Seus dados de contato completos
- Assinatura como desenvolvedor
- Aviso sobre email automático

### **Cores e Estilo**
- **Primária**: #667eea (azul-roxo)
- **Secundária**: #764ba2 (roxo)
- **Texto**: #2c3e50 (azul escuro)
- **Subtexto**: #64748b (cinza azulado)
- **Backgrounds**: Gradientes sutis

---

## 🧪 Teste do Template

1. Salvar o template
2. Ir para **Test** na dashboard
3. Preencher os parâmetros de teste:
   ```json
   {
     "to_name": "Rodrigo Rocha Giuntini",
     "to_email": "rodrigorochagiuntini@bityx.app",
     "from_name": "Willian Teste",
     "from_email": "teste@willian.com",
     "subject": "🎬 Teste Briefing - Willian",
     "message": "Teste de conteúdo do briefing...",
     "reply_to": "teste@willian.com",
     "data_briefing": "15 de dezembro de 2024 às 14:30"
   }
   ```
4. Enviar teste
5. Verificar inbox

---

## 🔧 Implementação no Código

O briefing.html já foi atualizado com:

```javascript
const CONFIG_EMAILJS = {
    serviceId: 'service_bj6c6km',
    templateId: 'template_briefing', // Template específico
    publicKey: 'E1K5MJNe_E2Dk5n7o'
};

const templateParams = {
    to_name: 'Rodrigo Rocha Giuntini',
    to_email: 'rodrigorochagiuntini@bityx.app',
    from_name: briefingData.nomeArtistico || 'Willian',
    from_email: briefingData.emailOrcamento || 'Não informado',
    subject: '🎬 Novo Briefing - ' + (briefingData.nomeArtistico || 'Willian'),
    message: dadosFormatados,
    reply_to: briefingData.emailOrcamento || 'rodrigorochagiuntini@bityx.app'
};
```

---

## 🚀 Vantagens da Solução

✅ **Template dedicado** para briefing  
✅ **Parâmetros simples** e universais  
✅ **Compatível** com EmailJS padrão  
✅ **Fácil manutenção** e debug  
✅ **Reutilizável** para outros formulários  

---

## 🔄 Próximos Passos

1. ⏳ **Criar template** na dashboard do EmailJS
   - Usar configurações da seção 3
   - Copiar HTML do arquivo `TEMPLATE_HTML_BRIEFING.html`
   - Configurar parâmetros da seção 5

2. ✅ **Testar envio** com dados de exemplo  
   - Usar JSON de teste da seção "🧪 Teste do Template"
   - Verificar formatação do email recebido

3. 🚀 **Ativar no briefing** e testar funcionamento
   - Template criado = envio direto
   - Template não criado = fallback automático

4. 📧 **Verificar emails** chegando corretamente
   - Verificar inbox e spam
   - Testar botão "Responder Cliente"

---

**Status**: 
- ✅ Template configurado no código  
- ✅ Template HTML profissional criado
- ⏳ Criação na dashboard do EmailJS pendente 