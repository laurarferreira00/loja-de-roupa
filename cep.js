function consultarCEP() {
    const cepInput = document.getElementById('cepInput');
    const resultado = document.getElementById('resultado');

    resultado.innerHTML = '';

    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length !== 8) { //Diferente que 8 digitos
        resultado.innerHTML = '<p>CEP não encontrado. Digite 8 dígitos.</p>';
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                resultado.innerHTML = '<p>CEP não encontrado, tente novamente.</p>';
            } else {
                resultado.innerHTML = `
                    <p>CEP: ${data.cep}</p>
                    <p>Logradouro: ${data.logradouro}</p>
                    <p>Bairro: ${data.bairro}</p>
                    <p>Cidade: ${data.localidade}</p>
                    <p>Estado: ${data.uf}</p>
                `;

                calcularFrete(data.uf, data.localidade);
            }
        })
        .catch(error => {
            resultado.innerHTML = '<p>Ocorreu um erro ao buscar o CEP. Tente novamente mais tarde.</p>';
            console.error(error);
        });

    function calcularFrete(estado, cidade) {
        var freteInfo = document.getElementById("freteInfo");

        // Remova os espaços em branco 
        //cidade = cidade.trim();

        // Verifique se a cidade é "Mogi das Cruzes"
        if (cidade === 'Mogi das Cruzes') {
            freteInfo.innerHTML = "O frete será de graça";
            return;
        }
        // O resto do seu código para calcular o frete com base no estado
        else if (estado === 'SP' || estado === 'RJ' || estado === 'ES' || estado === 'MG') {
            freteInfo.innerHTML = "O frete será de: R$ 5.00";
            return;
        }
        // Frete para região NORTE if e else
        else if ((estado === 'AC' || estado === 'AP' || estado === 'AM' || estado === 'PA') ||
            (estado === 'RO' || estado === 'RR' || estado === 'TO')) {
            freteInfo.innerHTML = "O frete será de: R$ 20.00";
            return;
        }
        // Frete NORDESTE
        else if ((estado === 'MA' || estado === 'PI' || estado === 'CE' || estado === 'RN') ||
            (estado === 'PB' || estado === 'PE' || estado === 'AL' || estado === 'SE' || estado === 'BA')) {
            freteInfo.innerHTML = "O frete será de: R$ 18.00";
            return;
        }
        // Frete CENTRO-OESTE
        else if ((estado === 'DF' || estado === 'GO' || estado === 'MT' || estado === 'MS')) {
            freteInfo.innerHTML = "O frete será de: R$ 15.00";
            return;
        }
        // Frete SUL
        else if ((estado === 'PR' || estado === 'SC' || estado === 'RS')) {
            freteInfo.innerHTML = "O frete será de: R$ 20.00";
            return;
        } else {
            freteInfo.innerHTML = "O frete não está disponível para este estado.";
            return;
        }
    }
}
