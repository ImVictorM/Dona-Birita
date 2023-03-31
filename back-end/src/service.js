// colocar const nas mensagens

// eslint-disable-next-line complexity
const validarCpf = (cpf) => {
   if (cpf.length !== 11) return false;
   // Validacao do primeiro digito verificador
   let somaPrimeiroDigito = 0;
   cpf.split('', 9).forEach((num, index) => {
      somaPrimeiroDigito += Number(num) * (10 - index);
   });
   let restoPrimeiroDigito = Math.abs((somaPrimeiroDigito % 11) - 11);
   if (restoPrimeiroDigito > 10) restoPrimeiroDigito = 0;
   if (restoPrimeiroDigito !== cpf[9]) return false;

   // Validacao do segundo digito verificador
   let somaSegundoDigito = 0;
   cpf.split('', 10).forEach((num, index) => {
      somaSegundoDigito += Number(num) * (11 - index);
   });
   let restoSegundoDigito = Math.abs((somaSegundoDigito % 11) - 11);
   if (restoSegundoDigito > 10) restoSegundoDigito = 0;
   return (restoSegundoDigito === cpf[10]);
};
const agruparCpf = (lancamentos) => {
   const cpfsAgrupados = {};
   lancamentos.forEach((lancamento) => {
      if (lancamento.cpf) {
         if (!cpfsAgrupados[lancamento.cpf]) {
            cpfsAgrupados[lancamento.cpf] = [];
         }
         if (cpfsAgrupados.prototype.hasOwnProperty.call(lancamento.cpf)) {
            cpfsAgrupados[lancamento.cpf].push(lancamento);
         }
      }
   });

   return cpfsAgrupados;
}


// eslint-disable-next-line complexity
const validarEntradaDeDados = (lancamento) => {
   const { cpf, valor } = lancamento;

   if (Number.isNaN(cpf)) return 'CPF deve conter apenas caracteres numéricos.';
   if (Number.isNaN(valor) || !valor) return 'Valor deve ser numérico.';

   if (valor > 15000.00) return 'Valor não pode ser superior a 15000,00.';
   if (valor < -2000.00) return 'Valor não pode ser inferior a -2000,00.';

   if (validarCpf(cpf) === false) return 'Os dígitos verificadores do CPF devem ser válido.';

   return null;
};

// recuperarSaldosPorConta([{cpf:123,valor:3},{cpf:1234,valor:5},{cpf:1234,valor:15},{cpf:12345,valor:15},{cpf:12345,valor:10},{cpf:123456,valor:15}])
const recuperarSaldosPorConta = (lancamentos) => {
   // const cpfsAgrupados = {};
   // lancamentos.forEach((lancamento) => {
   //    if (lancamento.cpf) {
   //       if (!cpfsAgrupados[lancamento.cpf]) {
   //          cpfsAgrupados[lancamento.cpf] = [];
   //       }
   //       if (cpfsAgrupados.prototype.hasOwnProperty.call(lancamento.cpf)) {
   //          cpfsAgrupados[lancamento.cpf].push(lancamento);
   //       }
   //    }
   // });
   const cpfsAgrupados = agruparCpf(lancamentos);

   const saldoPorCpf = Object.keys(cpfsAgrupados).map((cpf) => {
      const valor = cpfsAgrupados[cpf].reduce((acc, lancamento) => acc + lancamento.valor, 0);
      return { cpf, valor };
   });

   return saldoPorCpf;
};

// recuperarMaiorMenorLancamentos(1234,[{cpf:123,valor:3},{cpf:1234,valor:5},{cpf:1234,valor:15},{cpf:12345,valor:15},{cpf:12345,valor:10},{cpf:123456,valor:15}])
// eslint-disable-next-line max-lines-per-function
const recuperarMaiorMenorLancamentos = (cpf, lancamentos) => {
   let lancMin = { cpf: '', valor: 0 };
   let lancMax = { cpf: '', valor: 0 };
   // eslint-disable-next-line complexity
   lancamentos.forEach((lancamento) => {
      if (lancamento.cpf === cpf) {
         if (lancamento.valor < lancMin.valor || !lancMin.cpf) {
            lancMin.cpf = cpf;
            lancMin.valor = lancamento.valor;
         }

         if (lancamento.valor > lancMax.valor || !lancMax.cpf) {
            lancMax.cpf = cpf;
            lancMax.valor = lancamento.valor;
         }
      }
   });

   if (!lancMin.cpf) lancMin = lancMax;
   if (!lancMax.cpf) lancMax = lancMin;
   if (!lancMax.cpf && !lancMin.cpf) return [];

   return [lancMin, lancMax];
};

// recuperarMaioresSaldos([{cpf:123,valor:3},{cpf:1234,valor:5},{cpf:1234,valor:15},{cpf:12345,valor:15},{cpf:12345,valor:10},{cpf:123456,valor:15}])
// eslint-disable-next-line max-lines-per-function
const recuperarMaioresSaldos = (lancamentos) => {
   const cpfsAgrupados = {};
   lancamentos.((lancamento) => {
      if (lancamento.cpf) {
         if (!cpfsAgrupados[lancamento.cpf]) {
            cpfsAgrupados[lancamento.cpf] = [];
         }
         if (cpfsAgrupados.prototype.hasOwnProperty.call(lancamento.cpf)) {
            cpfsAgrupados[lancamento.cpf].push(lancamento);
         }
      }
   });
   
   const saldoPorCpf = Object.keys(cpfsAgrupados).map((cpf) => {
      const valor = cpfsAgrupados[cpf].reduce((acc, lancamento) => acc + lancamento.valor, 0);
      return { cpf, valor };
   });
   saldoPorCpf.sort((a, b) => {
      if (a.valor > b.valor) {
         return -1;
      }
      if (a.valor < b.valor) {
         return 1;
      }

      return 0;
   }).splice(3, saldoPorCpf.length);
   return saldoPorCpf;
};

// recuperarMaioresMedias([{cpf:123,valor:3},{cpf:1234,valor:5},{cpf:1234,valor:15},{cpf:12345,valor:15},{cpf:12345,valor:10},{cpf:123456,valor:15}])
// eslint-disable-next-line max-lines-per-function
const recuperarMaioresMedias = (lancamentos) => {
   const cpfsAgrupados = {};
   lancamentos.forEach((lancamento) => {
      if (lancamento.cpf) {
         if (!cpfsAgrupados[lancamento.cpf]) {
            cpfsAgrupados[lancamento.cpf] = [];
         }
         if (cpfsAgrupados.prototype.hasOwnProperty.call(lancamento.cpf)) {
            cpfsAgrupados[lancamento.cpf].push(lancamento);
         }
      }
   });

   const mediaPorCpf = Object.keys(cpfsAgrupados).map((cpf) => {
      const soma = cpfsAgrupados[cpf].reduce((acc, lancamento) => acc + lancamento.valor, 0);
      const valor = (soma / cpfsAgrupados[cpf].length);
      return { cpf, valor };
   });

   mediaPorCpf.sort((a, b) => {
      if (a.valor > b.valor) {
         return -1;
      }
      if (a.valor < b.valor) {
         return 1;
      }
      return 0;
   }).splice(3, mediaPorCpf.length);
   return mediaPorCpf;
};