// 📊 GOOGLE APPS SCRIPT - BRIEFING RECEPTOR
// Este script recebe os dados do formulário de briefing e salva no Google Sheets

// 🔧 CONFIGURAÇÃO
const CONFIG = {
  SHEET_ID: 'COLE_AQUI_O_ID_DA_SUA_PLANILHA', // Substitua pelo ID da sua planilha
  SHEET_NAME: 'Briefings',                     // Nome da aba na planilha
  EMAIL_NOTIFICACAO: 'rodrigorochagiuntini@bityx.app', // Email para notificações
  ENVIAR_EMAIL: true                           // true para enviar email de notificação
};

// 📨 FUNÇÃO PRINCIPAL - Recebe dados via POST
function doPost(e) {
  try {
    console.log('📩 Dados recebidos:', e.postData.contents);
    
    // Parse dos dados recebidos
    const data = JSON.parse(e.postData.contents);
    
    // Salvar na planilha
    const resultado = salvarNaPlanilha(data);
    
    // Enviar notificação por email (opcional)
    if (CONFIG.ENVIAR_EMAIL) {
      enviarNotificacaoEmail(data);
    }
    
    // Retorno de sucesso
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Briefing salvo com sucesso!',
        timestamp: new Date().toISOString(),
        linha: resultado.linha
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ Erro ao processar briefing:', error);
    
    // Retorno de erro
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 💾 SALVAR DADOS NA PLANILHA
function salvarNaPlanilha(data) {
  try {
    // Abrir planilha
    const sheet = obterOuCriarPlanilha();
    
    // Preparar dados para inserção
    const linha = [
      data.timestamp || new Date().toISOString(),
      data.cliente || 'Willian',
      data.nomeArtistico || '',
      data.areaAtuacao || '',
      data.bioDescricao || '',
      data.vibe || '',
      data.corPrincipal || '',
      data.temLogo || '',
      data.quantidadeProjetos || '',
      data.linksProjetos || '',
      data.infosProjetos || '',
      data.referencia || '',
      data.outrasReferencias || '',
      data.secao || '',
      data.secaoExtra || '',
      data.instagram || '',
      data.whatsapp || '',
      data.emailOrcamento || '',
      data.outrasRedes || '',
      data.fraseImpacto || '',
      data.historiaEspecial || '',
      data.funcionalidadeEspecial || '',
      data.observacoes || '',
      data.dadosCompletos || JSON.stringify(data)
    ];
    
    // Inserir na planilha
    const range = sheet.appendRow(linha);
    const linhaNumero = sheet.getLastRow();
    
    console.log(`✅ Dados salvos na linha ${linhaNumero}`);
    
    return {
      sucesso: true,
      linha: linhaNumero,
      range: range
    };
    
  } catch (error) {
    console.error('❌ Erro ao salvar na planilha:', error);
    throw error;
  }
}

// 📋 OBTER OU CRIAR PLANILHA
function obterOuCriarPlanilha() {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    let sheet;
    
    // Tentar obter a aba existente
    try {
      sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
    } catch (e) {
      // Se não existir, criar nova aba
      sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
    }
    
    // Se é a primeira vez, criar cabeçalhos
    if (sheet.getLastRow() === 0) {
      criarCabecalhos(sheet);
    }
    
    return sheet;
    
  } catch (error) {
    console.error('❌ Erro ao acessar planilha:', error);
    throw new Error(`Erro ao acessar planilha: ${error.message}`);
  }
}

// 📊 CRIAR CABEÇALHOS DA PLANILHA
function criarCabecalhos(sheet) {
  const cabecalhos = [
    'Timestamp',
    'Cliente', 
    'Nome Artístico',
    'Área de Atuação',
    'Bio/Descrição',
    'Vibe/Estilo',
    'Cor Principal',
    'Tem Logo',
    'Quantidade Projetos',
    'Links dos Projetos',
    'Info dos Projetos',
    'Referências (Rafa Webber)',
    'Outras Referências',
    'Seções do Site',
    'Seção Extra',
    'Instagram',
    'WhatsApp',
    'Email Orçamento',
    'Outras Redes',
    'Frase de Impacto',
    'História Especial',
    'Funcionalidade Especial',
    'Observações',
    'JSON Completo'
  ];
  
  // Inserir cabeçalhos
  const range = sheet.getRange(1, 1, 1, cabecalhos.length);
  range.setValues([cabecalhos]);
  
  // Formatação dos cabeçalhos
  range.setFontWeight('bold');
  range.setBackground('#4285f4');
  range.setFontColor('#ffffff');
  
  // Auto-ajustar largura das colunas
  sheet.autoResizeColumns(1, cabecalhos.length);
  
  console.log('📊 Cabeçalhos criados na planilha');
}

// 📧 ENVIAR NOTIFICAÇÃO POR EMAIL
function enviarNotificacaoEmail(data) {
  try {
    const assunto = `🎬 Novo Briefing - ${data.nomeArtistico || 'Willian'}`;
    
    const corpo = `
    <h2>🎬 Novo Briefing Recebido!</h2>
    
    <h3>📋 Informações Básicas:</h3>
    <ul>
      <li><strong>Cliente:</strong> ${data.cliente || 'Willian'}</li>
      <li><strong>Nome Artístico:</strong> ${data.nomeArtistico || 'Não informado'}</li>
      <li><strong>Área:</strong> ${data.areaAtuacao || 'Não informado'}</li>
      <li><strong>Email:</strong> ${data.emailOrcamento || 'Não informado'}</li>
      <li><strong>WhatsApp:</strong> ${data.whatsapp || 'Não informado'}</li>
    </ul>
    
    <h3>🎨 Estilo Visual:</h3>
    <ul>
      <li><strong>Vibe:</strong> ${data.vibe || 'Não informado'}</li>
      <li><strong>Cores:</strong> ${data.corPrincipal || 'Não informado'}</li>
      <li><strong>Tem Logo:</strong> ${data.temLogo || 'Não informado'}</li>
    </ul>
    
    <h3>🎬 Projetos:</h3>
    <ul>
      <li><strong>Quantidade:</strong> ${data.quantidadeProjetos || 'Não informado'}</li>
      <li><strong>Links:</strong> ${data.linksProjetos ? data.linksProjetos.substring(0, 200) + '...' : 'Não informado'}</li>
    </ul>
    
    <h3>📱 Contatos:</h3>
    <ul>
      <li><strong>Instagram:</strong> ${data.instagram || 'Não informado'}</li>
      <li><strong>WhatsApp:</strong> ${data.whatsapp || 'Não informado'}</li>
      <li><strong>Email:</strong> ${data.emailOrcamento || 'Não informado'}</li>
    </ul>
    
    <p><em>📊 Dados completos salvos na planilha: <a href="https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}">Abrir Planilha</a></em></p>
    
    <hr>
    <p><small>📅 Enviado automaticamente em ${new Date().toLocaleString('pt-BR')}</small></p>
    `;
    
    MailApp.sendEmail({
      to: CONFIG.EMAIL_NOTIFICACAO,
      subject: assunto,
      htmlBody: corpo
    });
    
    console.log('📧 Email de notificação enviado');
    
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    // Não propagar o erro - email é opcional
  }
}

// 🧪 FUNÇÃO DE TESTE
function testarScript() {
  const dadosTeste = {
    timestamp: new Date().toISOString(),
    cliente: 'Willian',
    nomeArtistico: 'Willian Films',
    areaAtuacao: 'Videomaker',
    bioDescricao: 'Teste de bio',
    vibe: 'Clean, Moderno',
    emailOrcamento: 'teste@exemplo.com',
    whatsapp: '(11) 99999-9999'
  };
  
  console.log('🧪 Iniciando teste...');
  
  try {
    const resultado = salvarNaPlanilha(dadosTeste);
    console.log('✅ Teste concluído com sucesso:', resultado);
    return resultado;
  } catch (error) {
    console.error('❌ Teste falhou:', error);
    throw error;
  }
}

// 📋 FUNÇÃO PARA LISTAR BRIEFINGS
function listarBriefings() {
  try {
    const sheet = obterOuCriarPlanilha();
    const dados = sheet.getDataRange().getValues();
    
    console.log(`📋 Total de briefings: ${dados.length - 1}`); // -1 para excluir cabeçalho
    
    return dados;
  } catch (error) {
    console.error('❌ Erro ao listar briefings:', error);
    throw error;
  }
}

// 🗑️ FUNÇÃO PARA LIMPAR DADOS DE TESTE
function limparDadosTeste() {
  try {
    const sheet = obterOuCriarPlanilha();
    const dados = sheet.getDataRange().getValues();
    
    // Manter apenas cabeçalho
    sheet.clear();
    if (dados.length > 0) {
      sheet.getRange(1, 1, 1, dados[0].length).setValues([dados[0]]);
    }
    
    console.log('🗑️ Dados de teste limpos');
  } catch (error) {
    console.error('❌ Erro ao limpar dados:', error);
    throw error;
  }
}

// 📝 INSTRUÇÕES DE USO:
//
// 1. Cole este código no Google Apps Script
// 2. Substitua CONFIG.SHEET_ID pelo ID da sua planilha
// 3. Configure CONFIG.EMAIL_NOTIFICACAO se desejar receber emails
// 4. Salve e implante como Web App
// 5. Configure as permissões necessárias
// 6. Copie a URL do Web App
// 7. Use a URL no arquivo config.js do briefing
//
// 🔧 CONFIGURAÇÃO DA PLANILHA:
// Para obter o SHEET_ID:
// 1. Abra uma planilha no Google Sheets
// 2. Copie o ID da URL: https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
// 3. Cole no CONFIG.SHEET_ID acima
//
// ✅ TESTE:
// Execute a função 'testarScript()' para verificar se tudo está funcionando 