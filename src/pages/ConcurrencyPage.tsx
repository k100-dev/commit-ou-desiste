import React from 'react';
import { AlertTriangle, Share2 } from 'lucide-react';
import { ConcurrencyIssues } from '../components/ConcurrencyIssues';

export const ConcurrencyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Problemas de Concorrência</h1>
          <p className="text-xl text-gray-600">
            Compreendendo os desafios quando múltiplas transações executam simultaneamente
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-10">
          <section>
            <div className="bg-amber-50 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-amber-100 rounded-full p-3 mr-4">
                  <Share2 className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">O que é Concorrência?</h2>
                  <p className="text-gray-700">
                    Concorrência em banco de dados refere-se a múltiplas transações acessando e modificando os mesmos dados simultaneamente. Embora a concorrência melhore a performance permitindo que várias operações avancem em paralelo, ela pode causar diversos problemas de consistência de dados se não for gerenciada adequadamente.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-start mb-4">
                <AlertTriangle className="text-amber-500 mr-3 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Por que Problemas de Concorrência Importam</h3>
                  <p className="text-gray-700">
                    Sem um controle de concorrência adequado, seu banco de dados pode acabar com:
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-red-50 p-4 rounded-md">
                  <h4 className="font-medium text-red-700 mb-2">Atualizações Perdidas</h4>
                  <p className="text-sm text-gray-700">
                    Quando duas transações leem e atualizam os mesmos dados, as mudanças de uma podem sobrescrever as da outra sem que nenhuma das duas perceba.
                  </p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-md">
                  <h4 className="font-medium text-red-700 mb-2">Análise Inconsistente</h4>
                  <p className="text-sm text-gray-700">
                    Uma transação lê dados relacionados que estão sendo modificados por outra transação, resultando em uma análise baseada em dados inconsistentes.
                  </p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-md">
                  <h4 className="font-medium text-red-700 mb-2">Cálculos Incorretos</h4>
                  <p className="text-sm text-gray-700">
                    A lógica de negócio que depende de leituras consistentes do banco de dados pode gerar resultados incorretos quando os dados mudam no meio da transação.
                  </p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-md">
                  <h4 className="font-medium text-red-700 mb-2">Corrupção de Dados</h4>
                  <p className="text-sm text-gray-700">
                    Em casos severos, atualizações inconsistentes podem levar à corrupção do banco, violando regras de integridade ou regras de negócio.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Problemas Comuns de Concorrência</h2>
            <ConcurrencyIssues />
          </section>
          
          <section className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Como Lidar com Problemas de Concorrência</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">1. Escolha o Nível de Isolamento Adequado</h3>
                <p className="text-gray-700">
                  Selecione um nível de isolamento de transação apropriado às necessidades da sua aplicação, equilibrando requisitos de consistência com considerações de performance. Níveis de isolamento mais altos previnem mais problemas de concorrência, mas podem reduzir a taxa de transferência.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">2. Use Mecanismos de Bloqueio</h3>
                <p className="text-gray-700 mb-3">
                  Sistemas de banco de dados fornecem vários mecanismos de bloqueio para controlar o acesso concorrente:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li><span className="font-medium">Bloqueios compartilhados</span> permitem que múltiplas transações leiam dados simultaneamente</li>
                  <li><span className="font-medium">Bloqueios exclusivos</span> impedem que outras transações leiam ou escrevam enquanto uma transação está modificando dados</li>
                  <li><span className="font-medium">Bloqueios a nível de linha</span> são mais granulares e permitem maior concorrência do que bloqueios a nível de tabela</li>
                </ul>
              </div>
              
              <div className="bg-white p-5 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">3. Implemente Controle Otimista de Concorrência</h3>
                <p className="text-gray-700">
                  Ao invés de bloquear recursos, o controle otimista de concorrência permite que as transações prossigam sem bloqueios, mas verifica na hora do commit se outra transação modificou os dados. Se forem detectados conflitos, a transação pode ser repetida ou rejeitada.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">4. Projete para Concorrência</h3>
                <p className="text-gray-700 mb-3">
                  Ajuste o design da sua aplicação para minimizar problemas de concorrência:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Mantenha as transações curtas e focadas</li>
                  <li>Acesse recursos em uma ordem consistente para evitar deadlocks</li>
                  <li>Use colunas de versão ou timestamps para detectar conflitos</li>
                  <li>Considere desnormalização para dados acessados frequentemente para reduzir contenção</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
