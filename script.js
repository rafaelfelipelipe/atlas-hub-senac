// PASSO 1: Pegar o campo de CNPJ no HTML
const campoCnpj = document.getElementById('cnpj');

// PASSO 2: Ficar "ouvindo" toda vez que o usuário digitar algo no campo
campoCnpj.addEventListener('input', function (evento) {
    let textoDigitado = evento.target.value.replace(/\D/g, '');

    if (textoDigitado.length > 14) {
        textoDigitado = textoDigitado.substring(0, 14);
    }

    // PASSO 3: Construir a máscara fatiando o texto em pedaços
    let cnpjFormatado = '';
    let tamanho = textoDigitado.length;

    if (tamanho <= 2) {
        cnpjFormatado = textoDigitado;
    }
    else if (tamanho <= 5) {
        cnpjFormatado = textoDigitado.substring(0, 2) + '.' + textoDigitado.substring(2, 5);
    }
    else if (tamanho <= 8) {
        cnpjFormatado = textoDigitado.substring(0, 2) + '.' +
            textoDigitado.substring(2, 5) + '.' +
            textoDigitado.substring(5, 8);
    }
    else if (tamanho <= 12) {
        cnpjFormatado = textoDigitado.substring(0, 2) + '.' +
            textoDigitado.substring(2, 5) + '.' +
            textoDigitado.substring(5, 8) + '/' +
            textoDigitado.substring(8, 12);
    }
    else {
        cnpjFormatado = textoDigitado.substring(0, 2) + '.' +
            textoDigitado.substring(2, 5) + '.' +
            textoDigitado.substring(5, 8) + '/' +
            textoDigitado.substring(8, 12) + '-' +
            textoDigitado.substring(12, 14);
    }

    evento.target.value = cnpjFormatado;
});

// PASSO 4: Validar antes de enviar o formulário
const formulario = document.querySelector('form');

formulario.addEventListener('submit', function (evento) {
    const apenasNumeros = campoCnpj.value.replace(/\D/g, '');

    if (apenasNumeros.length !== 14) {
        evento.preventDefault();
        alert('Atenção: O CNPJ está incompleto. Digite todos os 14 números.');
        campoCnpj.focus();
    } else {
        evento.preventDefault();
        alert('CNPJ validado com sucesso! Os dados estão prontos para ir para o Banco de Dados.');
        window.location.href = 'cadastrar-demanda.html';
    }
    }
});
