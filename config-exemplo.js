// 📧 CONFIGURAÇÃO EMAILJS - SUPER SIMPLES!
// Este arquivo contém apenas a configuração do EmailJS (muito mais fácil)

// 📧 CONFIGURAÇÃO EMAILJS
// Obtenha suas credenciais em: https://emailjs.com (5 minutos de setup)
window.EMAILJS_CONFIG = {
    serviceId: 'service_xyz123',     // Substitua pelo seu Service ID
    templateId: 'template_abc456',   // Substitua pelo seu Template ID
    publicKey: 'user_def789'         // Substitua pela sua Public Key
};

// 📝 INSTRUÇÕES SIMPLES:
// 
// 1. Copie este arquivo e renomeie para 'config.js'
// 2. Configure EmailJS em 5 minutos: https://emailjs.com
// 3. Substitua os valores acima pelas suas credenciais
// 4. Inclua no HTML: <script src="config.js"></script>
// 5. Pronto! Briefings chegam no seu email automaticamente
//
// 🚀 COMO OBTER AS CREDENCIAIS (5 MIN):
//
// 1. Criar conta: https://emailjs.com
// 2. Adicionar serviço Gmail
// 3. Criar template de email 
// 4. Copiar Service ID, Template ID e Public Key
//
// Veja o guia completo: GUIA_EMAILJS_SIMPLES.md
//
// ✅ STATUS:
console.log('📧 EmailJS Config:', window.EMAILJS_CONFIG ? '✅ Carregado' : '❌ Não encontrado'); 