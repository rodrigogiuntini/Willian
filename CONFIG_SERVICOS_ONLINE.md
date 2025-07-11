# 🌐 Configuração de Serviços Online - Briefing

## Visão Geral

O sistema de briefing agora envia dados para múltiplos destinos online:
- **EmailJS**: Envio por email
- **Google Sheets**: Planilha automatizada  
- **Webhook**: API personalizada (opcional)

## 1. 📧 Configuração EmailJS

### **Passo 1: Criar conta no EmailJS**
1. Acesse [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crie uma conta gratuita
3. Vá em **Email Services** e conecte seu Gmail/Outlook

### **Passo 2: Criar Template**
1. Vá em **Email Templates**
2. Clique em **Create New Template**
3. Use este template:

```
Assunto: Novo Briefing - {{cliente_nome}} ({{subject}})

Olá Rodrigo,

Novo briefing recebido!

📅 Data: {{data_envio}}
👤 Cliente: {{cliente_nome}}
📧 Email: {{cliente_email}}
📱 WhatsApp: {{cliente_whatsapp}}

📝 BRIEFING COMPLETO:
{{briefing_completo}}

🔧 DADOS TÉCNICOS (JSON):
{{dados_json}}

---
Enviado automaticamente pelo sistema de briefing
```

### **Passo 3: Configurar no código**
No arquivo `briefing.html`, substitua:
```javascript
const CONFIG_ONLINE = {
    emailjs: {
        serviceId: 'seu_service_id',
        templateId: 'seu_template_id', 
        publicKey: 'sua_public_key'
    }
}
```

## 2. 📊 Configuração Google Sheets

### **Passo 1: Criar Google Apps Script**
1. Acesse [https://script.google.com/](https://script.google.com/)
2. Clique em **Novo projeto**
3. Cole este código:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // ID da sua planilha
    const SHEET_ID = 'COLE_AQUI_O_ID_DA_SUA_PLANILHA';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Se é a primeira vez, criar cabeçalhos
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp', 'Cliente', 'Nome Artístico', 'Área', 'Bio',
        'Vibe', 'Cor Principal', 'Tem Logo', 'Qtd Projetos',
        'Links Projetos', 'Info Projetos', 'Referências',
        'Outras Refs', 'Seções', 'Seção Extra', 'Instagram',
        'WhatsApp', 'Email', 'Outras Redes', 'Frase Impacto',
        'História', 'Funcionalidade', 'Observações', 'JSON Completo'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    // Adicionar dados
    const row = [
      data.timestamp, data.cliente, data.nomeArtistico, data.areaAtuacao,
      data.bioDescricao, data.vibe, data.corPrincipal, data.temLogo,
      data.quantidadeProjetos, data.linksProjetos, data.infosProjetos,
      data.referencia, data.outrasReferencias, data.secao, data.secaoExtra,
      data.instagram, data.whatsapp, data.emailOrcamento, data.outrasRedes,
      data.fraseImpacto, data.historiaEspecial, data.funcionalidadeEspecial,
      data.observacoes, data.dadosCompletos
    ];
    
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### **Passo 2: Publicar como Web App**
1. Clique em **Implantar** > **Nova implantação**
2. Tipo: **Aplicativo da Web**
3. Executar como: **Eu**
4. Quem tem acesso: **Qualquer pessoa**
5. Copie a URL gerada

### **Passo 3: Criar Planilha**
1. Crie uma nova Google Sheets
2. Copie o ID da URL (entre `/d/` e `/edit`)
3. Cole no código do Apps Script

### **Passo 4: Configurar no código**
```javascript
googleSheets: {
    scriptUrl: 'SUA_URL_DO_APPS_SCRIPT_AQUI',
    enabled: true
}
```

## 3. 🔗 Webhook (Opcional)

Se você tiver uma API própria:
```javascript
webhook: {
    url: 'https://sua-api.com/briefing',
    enabled: true
}
```

## 4. 🚀 Ativação Rápida

### **Método 1: Editar diretamente no HTML**
Substitua as configurações no arquivo `briefing.html`:
```javascript
const CONFIG_ONLINE = {
    emailjs: {
        serviceId: 'service_xyz123',
        templateId: 'template_abc456',
        publicKey: 'user_def789'
    },
    googleSheets: {
        scriptUrl: 'https://script.google.com/macros/s/ABC123/exec',
        enabled: true
    }
};
```

### **Método 2: Arquivo de configuração externo**
Crie um arquivo `config.js`:
```javascript
window.EMAILJS_CONFIG = {
    serviceId: 'service_xyz123',
    templateId: 'template_abc456', 
    publicKey: 'user_def789'
};

window.SHEETS_CONFIG = {
    scriptUrl: 'https://script.google.com/macros/s/ABC123/exec',
    enabled: true
};
```

E inclua no HTML:
```html
<script src="config.js"></script>
```

## 5. 🧪 Teste

1. Preencha algumas perguntas do briefing
2. Clique em **"Testar Envio Online"**
3. Verifique o status dos serviços
4. Confirme recebimento no email/planilha

## 6. 📋 Checklist de Configuração

- [ ] Conta EmailJS criada
- [ ] Template de email configurado
- [ ] Service ID, Template ID e Public Key obtidos
- [ ] Google Apps Script criado e implantado
- [ ] Planilha Google Sheets criada
- [ ] URLs atualizadas no código
- [ ] Teste realizado com sucesso

## 7. ❗ Troubleshooting

### **EmailJS não funciona**
- Verifique se as credenciais estão corretas
- Confirme se o serviço de email está ativo
- Teste o template diretamente no EmailJS

### **Google Sheets não recebe dados**
- Verifique se a URL do Apps Script está correta
- Confirme se o script tem permissões necessárias
- Teste a URL diretamente no navegador

### **Status mostra "não configurado"**
- Verifique se as chaves não contêm valores padrão
- Confirme se `enabled: true` está definido
- Reinicie o navegador e teste novamente

---

**Desenvolvido por Rodrigo Giuntini**
*Sistema robusto de envio online com múltiplas camadas de backup* 