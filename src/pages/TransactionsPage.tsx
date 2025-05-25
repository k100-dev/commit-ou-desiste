import React from 'react';
import { Database, CheckCircle, XCircle, ArrowDown } from 'lucide-react';
import { CommitRollbackDemo } from '../components/CommitRollbackDemo';
import { InteractiveDemo } from '../components/InteractiveDemo';

export const TransactionsPage = () => {
  const transactionSteps = [
    {
      title: "O que é uma Transação de Banco de Dados?",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Uma transação de banco de dados é uma unidade lógica de trabalho que contém uma ou mais operações (como inserções, atualizações ou exclusões). Transações permitem agrupar operações de forma "tudo ou nada".
          </p>
          <div className="bg-purple-50 p-4 rounded-md">
            <h4 className="font-medium text-purple-700 mb-2">Características principais:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Uma transação representa uma única unidade de trabalho</li>
              <li>Pode conter múltiplas operações no banco de dados</li>
              <li>Ou todas as operações são bem-sucedidas, ou nenhuma tem efeito</li>
              <li>Uma vez confirmadas, as mudanças se tornam permanentes</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Fluxo de uma Transação",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Uma transação típica segue os seguintes passos:
          </p>
          
          <div className="flex flex-col items-center space-y-2 py-4">
            <div className="bg-purple-100 text-purple-800 font-medium px-4 py-2 rounded-md w-48 text-center">
              INICIAR TRANSAÇÃO
            </div>
            <ArrowDown className="text-gray-400" size={20} />
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md w-48 text-center">
              Operações no Banco de Dados
            </div>
            <ArrowDown className="text-gray-400" size={20} />
            <div className="flex space-x-4">
              <div className="bg-purple-100 text-purple-800 font-medium px-4 py-2 rounded-md text-center flex items-center">
                <CheckCircle size={18} className="mr-2" />
                COMMIT
              </div>
              <div className="bg-purple-100 text-purple-800 font-medium px-4 py-2 rounded-md text-center flex items-center">
                <XCircle size={18} className="mr-2" />
                ROLLBACK
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-purple-50 p-4 rounded-md">
              <h4 className="font-medium text-purple-700 mb-2">COMMIT</h4>
              <p className="text-sm text-gray-700">
                Torna todas as alterações feitas durante a transação permanentes. Após um COMMIT, outros usuários podem ver suas alterações, e você não pode desfazer a transação.
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-md">
              <h4 className="font-medium text-purple-700 mb-2">ROLLBACK</h4>
              <p className="text-sm text-gray-700">
                Cancela todas as alterações feitas durante a transação e restaura o banco de dados ao estado anterior ao início da transação. Use ROLLBACK se ocorrer um erro ou se decidir não concluir a transação.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Exemplo SQL: Transferência Bancária",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Aqui está um exemplo simples de uma transação de transferência bancária em SQL:
          </p>
          
          <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm">
            <pre>{`-- Iniciar uma transação
BEGIN TRANSACTION;

-- Retirar $100 da Conta A
UPDATE accounts 
SET balance = balance - 100 
WHERE account_id = 'A';

-- Depositar $100 na Conta B
UPDATE accounts 
SET balance = balance + 100 
WHERE account_id = 'B';

-- Se ambas as operações forem bem-sucedidas, confirmar as alterações
COMMIT;

-- Se alguma operação falhar, desfazemos tudo
-- ROLLBACK;`}</pre>
          </div>
          
          <p className="text-gray-700">
            Esta transação garante que o dinheiro não seja criado nem destruído — apenas transferido de uma conta para outra. Se a retirada ou o depósito falhar, toda a transação é desfeita.
          </p>
        </div>
      )
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Transações de Banco de Dados</h1>
          <p className="text-xl text-gray-600">
            Compreendendo os blocos fundamentais para operações confiáveis em bancos de dados
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-10">
          <section>
            <InteractiveDemo 
              steps={transactionSteps}
              title="Transações de Banco de Dados Explicadas"
            />
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Database className="mr-2 text-purple-600" size={24} />
              Experimente: COMMIT e ROLLBACK
            </h2>
            <CommitRollbackDemo />
          </section>
          
          <section className="bg-purple-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Principais Conceitos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-purple-700">O Princípio do "Tudo ou Nada"</h3>
                <p className="text-gray-700">
                  Transações garantem que todas as operações sejam concluídas com sucesso ou que nenhuma tenha efeito no banco de dados. Isso evita atualizações parciais que podem deixar os dados inconsistentes.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-purple-700">Quando Usar Transações</h3>
                <p className="text-gray-700">
                  Use transações sempre que houver múltiplas operações relacionadas no banco de dados que devem ter sucesso ou falhar juntas. Exemplos comuns incluem transferências bancárias, processamento de pedidos ou cadastros com várias tabelas.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-purple-700">COMMIT vs. ROLLBACK</h3>
                <p className="text-gray-700">
                  COMMIT torna as alterações permanentes e visíveis para outros usuários. ROLLBACK desfaz todas as alterações feitas dentro da transação, retornando ao estado anterior. Sempre inclua tratamento de erro para usar ROLLBACK quando necessário.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-purple-700">Escopo da Transação</h3>
                <p className="text-gray-700">
                  Mantenha transações tão curtas quanto possível, sem comprometer a integridade dos dados. Transações longas podem causar problemas de desempenho, bloqueios e concorrência.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
