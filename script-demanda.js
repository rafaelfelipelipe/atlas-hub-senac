// PASSO 1: Selecionar os elementos do HTML que vamos manipular
const campoDescricao = document.getElementById('descricao');
const contadorTexto = document.getElementById('contador');
const campoTitulo = document.getElementById('titulo');
const formularioDemanda = document.querySelector('form');

// Define o limite máximo que o banco de dados vai aceitar
const limiteMaximo = 500;

// PASSO 2: Criar o Contador Dinâmico em tempo real
campoDescricao.addEventListener('input', function (evento) {
    // Pega o tamanho atual do texto digitado
    let tamanhoAtual = evento.target.value.length;

    // Se passar do limite, corta o texto (impede de digitar mais)
    if (tamanhoAtual > limiteMaximo) {
        evento.target.value = evento.target.value.substring(0, limiteMaximo);
        tamanhoAtual = limiteMaximo; // Trava o número no visual
    }

    // Atualiza o texto pequeno embaixo da caixa
    contadorTexto.textContent = tamanhoAtual + " / " + limiteMaximo + " caracteres.";

    // Feedback visual de aviso: Se chegar perto do limite, fica laranja
    if (tamanhoAtual > 450) {
        contadorTexto.style.color = '#ff751f';
    } else {
        contadorTexto.style.color = '#888888';
    }
});

// PASSO 3: Validação de Qualidade ao tentar enviar o formulário
formularioDemanda.addEventListener('submit', function (evento) {

    // Pega os textos limpando os espaços em branco das pontas (trim)
    const textoTitulo = campoTitulo.value.trim();
    const textoDescricao = campoDescricao.value.trim();

    // Regra 1: Título tem que ser explicativo (mínimo 10 letras)
    if (textoTitulo.length < 10) {
        evento.preventDefault(); // Trava o envio
        alert('ERRO: O Título do desafio é muito curto. Seja mais específico.');
        campoTitulo.focus();
        return; // Para a execução do código aqui
    }

    // Regra 2: Descrição não pode ser vaga (mínimo 50 letras)
    if (textoDescricao.length < 50) {
        evento.preventDefault(); // Trava o envio
        alert('ERRO: A Descrição do problema está muito vaga. Forneça mais detalhes técnicos para os alunos (mínimo de 50 caracteres).');
        campoDescricao.focus();
        return;
    }

    // Se passar por todas as regras
    evento.preventDefault(); // (Trava só porque ainda não temos o MVC C#)
    alert('Demanda validada com sucesso! Qualidade técnica aprovada.');
});