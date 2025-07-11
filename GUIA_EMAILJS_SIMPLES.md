# 📧 GUIA SIMPLES - CONFIGURAR EMAILJS

## 🎯 **Por que EmailJS?**

- **Simples**: 3 passos para configurar
- **Rápido**: 5 minutos de setup
- **Gratuito**: 200 emails/mês
- **Confiável**: Usado por milhares de sites
- **Sem servidor**: Não precisa de backend

## ⚡ **Configuração em 3 Passos**

### **1. Criar Conta (2 minutos)**
1. Acesse [https://emailjs.com](https://emailjs.com)
2. Clique em **"Sign Up"**
3. Use seu Gmail para login rápido

### **2. Configurar Serviço (2 minutos)**
1. No dashboard, clique **"Add New Service"**
2. Escolha **"Gmail"** (mais fácil)
3. Autorize acesso ao seu email
4. **Copie o Service ID** (ex: `service_abc123`)

### **3. Criar Template (1 minuto)**
1. Clique **"Email Templates"** → **"Create New Template"**
2. Use este template pronto:

**Assunto:**
```
Novo Briefing - {{cliente_nome}}
```

**Conteúdo:**
```
Olá Rodrigo!

Novo briefing recebido:

{{briefing_completo}}

---
Dados técnicos: {{dados_json}}
```

3. **Copie o Template ID** (ex: `template_xyz456`)

## 🔧 **Configurar no Código**

Edite o arquivo `briefing.html` na linha que contém `CONFIG_EMAILJS`:

```javascript
const CONFIG_EMAILJS = {
    serviceId: 'service_abc123',     // Cole seu Service ID aqui
    templateId: 'template_xyz456',   // Cole seu Template ID aqui
    publicKey: 'user_def789'         // Cole sua Public Key aqui
};
```

### **Como encontrar sua Public Key:**
1. No EmailJS, vá em **"Account"** → **"General"**
2. Copie a **"Public Key"**

## ✅ **Testar**

1. Abra `briefing.html`
2. Preencha primeira pergunta
3. Clique **"Testar Envio por Email"**
4. Verifique seu email

## 🎉 **Pronto!**

Agora quando o Willian completar o briefing, você receberá automaticamente um email com todas as respostas formatadas!

---

## 📝 **Template de Email Completo (Opcional)**

Se quiser um email mais bonito, use este template:

**Assunto:**
```
🎬 Novo Briefing - {{cliente_nome}}
```

**Conteúdo:**
```
<h2>🎬 Novo Briefing Recebido!</h2>

<p><strong>Cliente:</strong> {{cliente_nome}}<br>
<strong>Email:</strong> {{cliente_email}}<br>
<strong>WhatsApp:</strong> {{cliente_whatsapp}}<br>
<strong>Data:</strong> {{data_envio}}</p>

<h3>📝 Briefing Completo:</h3>
<div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
{{briefing_completo}}
</div>

<h3>💻 Dados Técnicos (JSON):</h3>
<pre style="background: #f0f0f0; padding: 15px; border-radius: 5px; font-size: 12px;">
{{dados_json}}
</pre>

<p><em>Enviado automaticamente pelo sistema de briefing</em></p>
```

## 🔧 **Configuração Alternativa (Arquivo Separado)**

Se preferir manter as credenciais em arquivo separado:

1. Crie arquivo `config.js`:
```javascript
window.EMAILJS_CONFIG = {
    serviceId: 'service_abc123',
    templateId: 'template_xyz456',
    publicKey: 'user_def789'
};
```

2. Inclua no HTML (antes do `</head>`):
```html
<script src="config.js"></script>
```

## 📊 **Limites do Plano Gratuito**

- **200 emails/mês** (suficiente para muitos briefings)
- **Sem limite de templates**
- **Suporte básico**

## 💰 **Se Precisar de Mais**

- **Plano Personal**: $10/mês = 1000 emails
- **Plano Business**: $20/mês = 5000 emails

---

**É isso! Super simples e funciona perfeitamente.** 🚀

Agora você pode receber todos os briefings por email automaticamente, sem precisar de servidor ou configurações complexas! 