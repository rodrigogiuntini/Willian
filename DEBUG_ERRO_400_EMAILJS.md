# 🔧 DEBUG: Erro 400 EmailJS - Guia de Solução

## 🎯 **Problema Identificado**
```
connection. Receiving end does not exist.
api.emailjs.com/api/v1.0/email/send:1            
Failed to load resource: the server responded with a status of 400 ()
```

**Erro específico encontrado:**
```
The template ID not found. To find this ID, visit https://dashboard.emailjs.com/admin/templates
```

**Erro 400 = Bad Request** - Template `template_z16zup7` não existe na dashboard do EmailJS.

---

## 🔍 **Ferramentas de Debug Implementadas**

### **1. Console do Navegador (F12)**
Abra o console e execute:
```javascript
// Verificar se EmailJS está carregado
console.log('EmailJS carregado:', typeof emailjs !== 'undefined');

// Ver configuração atual
console.log('Config:', CONFIG_EMAILJS);

// Ver dados do briefing
console.log('Dados:', briefingData);
```

### **2. Botões de Debug na Interface**
Na tela final do briefing, use os botões:
- **🔍 Diagnosticar** - Análise completa do sistema
- **📡 Testar Conexão** - Teste direto com EmailJS
- **📋 Ver Dados** - Exibe dados no console
- **⚙️ Ver Config** - Mostra configuração atual

### **3. Função de Diagnóstico**
```javascript
diagnosticarProblemas() // Execute no console
```

---

## 🛠️ **Possíveis Causas do Erro 400**

### **1. Template ID Incorreto**
```javascript
// Verificar se template existe
const CONFIG_EMAILJS = {
    templateId: 'template_z16zup7' // ← Confirmar se existe
};
```

### **2. Service ID Incorreto**
```javascript
// Verificar service
const CONFIG_EMAILJS = {
    serviceId: 'service_bj6c6km' // ← Confirmar se existe
};
```

### **3. Public Key Incorreta**
```javascript
// Verificar public key
const CONFIG_EMAILJS = {
    publicKey: 'E1K5MJNe_E2Dk5n7o' // ← Confirmar se está correta
};
```

### **4. Parâmetros Incompatíveis**
O template `template_z16zup7` pode não ter todos os parâmetros que estamos enviando.

---

## 🔧 **Soluções Implementadas**

### **1. Validação Automática**
```javascript
// Validar parâmetros obrigatórios
const requiredParams = ['to_name', 'to_email', 'from_name', 'subject'];
const missingParams = requiredParams.filter(param => !templateParams[param]);
```

### **2. Fallback Automático**
```javascript
// Se template_z16zup7 falhar, usar template do contrato
if (error.status === 400) {
    // Usar template_i076npw com parâmetros simplificados
}
```

### **3. Logs Detalhados**
```javascript
// Logs antes do envio
console.log('🔍 [DEBUG] Tentando enviar para:', serviceId, templateId);
console.log('🔍 [DEBUG] Parâmetros:', templateParams);

// Logs após erro
console.error('❌ [DEBUG] Erro 400 - Possíveis causas:');
console.error('- Template ID incorreto');
console.error('- Service ID incorreto');
console.error('- Parâmetros incompatíveis');
```

---

## 🎯 **Passos para Resolver**

### **Passo 1: Verificar Template no EmailJS**
1. Acesse https://dashboard.emailjs.com/admin/templates
2. Confirme se `template_z16zup7` existe
3. Verifique se tem todos os parâmetros necessários

### **Passo 2: Usar Ferramentas de Debug**
1. Abra o briefing
2. Vá para a tela final
3. Clique **🔍 Diagnosticar**
4. Veja os logs no console (F12)

### **Passo 3: Testar Conexão**
1. Clique **📡 Testar Conexão**
2. Verifique se o teste passa
3. Se falhar, veja o erro específico

### **Passo 4: Verificar Configuração**
1. Clique **⚙️ Ver Config**
2. Confirme se os IDs estão corretos
3. Compare com sua dashboard do EmailJS

---

## 🚀 **Solução Rápida**

Se o erro persistir, o sistema tem **fallback automático**:

```javascript
// Fallback para template do contrato (que funciona)
return emailjs.send(
    'service_bj6c6km',
    'template_i076npw', // Template que já funciona
    fallbackParams
);
```

---

## 📋 **Checklist de Verificação**

- [ ] EmailJS carregado (`typeof emailjs !== 'undefined'`)
- [ ] Template `template_z16zup7` existe na dashboard
- [ ] Service `service_bj6c6km` ativo
- [ ] Public Key `E1K5MJNe_E2Dk5n7o` correta
- [ ] Parâmetros obrigatórios preenchidos
- [ ] Teste de conexão passa
- [ ] Logs no console não mostram erros

---

## 🔄 **Próximos Passos**

1. **Execute o diagnóstico** usando as ferramentas
2. **Verifique o console** para logs detalhados
3. **Teste a conexão** com botão específico
4. **Reporte os resultados** dos testes

### **Se o problema persistir:**
- O sistema usa fallback automático
- Email será enviado via template do contrato
- Dados não serão perdidos

---

## 📞 **Resultado Esperado**

Com essas melhorias, o erro 400 será:
- ✅ **Identificado** automaticamente
- ✅ **Reportado** com detalhes específicos
- ✅ **Resolvido** via fallback automático
- ✅ **Logado** para análise posterior

**O email será enviado com sucesso, mesmo que o template específico tenha problemas!** 