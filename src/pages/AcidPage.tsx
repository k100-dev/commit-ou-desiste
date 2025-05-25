import React from 'react';
import { Atom, Shield, Users, Database } from 'lucide-react';
import { AcidProperties } from '../components/AcidProperties';

export const AcidPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Propriedades ACID</h1>
          <p className="text-xl text-gray-600">
            As quatro propriedades principais que garantem transações confiáveis em bancos de dados
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-10">
          <section>
            <div className="bg-purple-50 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-purple-100 rounded-full p-3 mr-4">
                  <Database className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">O que é ACID?</h2>
                  <p className="text-gray-700">
                    ACID é um acrônimo que representa as quatro propriedades essenciais que garantem o processamento confiável de transações em bancos de dados, mesmo em caso de erros, quedas de energia ou outros problemas.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-l-violet-500">
                <div className="flex items-center mb-3">
                  <Atom className="h-6 w-6 text-violet-600 mr-2" />
                  <h3 className="text-xl font-semibold text-violet-700">A - Atomicidade</h3>
                </div>
                <p className="text-gray-700">
                  Todas as operações dentro de uma transação são concluídas com sucesso ou nenhuma delas é aplicada. Não existem transações parciais. É “tudo ou nada.”
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-l-emerald-500">
                <div className="flex items-center mb-3">
                  <Shield className="h-6 w-6 text-emerald-600 mr-2" />
                  <h3 className="text-xl font-semibold text-emerald-700">C - Consistência</h3>
                </div>
                <p className="text-gray-700">
                  Uma transação só pode levar o banco de dados de um estado válido para outro, mantendo todas as regras e restrições.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-l-amber-500">
                <div className="flex items-center mb-3">
                  <Users className="h-6 w-6 text-amber-600 mr-2" />
                  <h3 className="text-xl font-semibold text-amber-700">I - Isolamento</h3>
                </div>
                <p className="text-gray-700">
                  Transações concorrentes não interferem umas nas outras, como se fossem executadas sequencialmente.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-l-purple-500">
                <div className="flex items-center mb-3">
                  <Database className="h-6 w-6 text-purple-600 mr-2" />
                  <h3 className="text-xl font-semibold text-purple-700">D - Durabilidade</h3>
                </div>
                <p className="text-gray-700">
                  Uma vez que a transação é confirmada (commit), suas alterações permanecem permanentes, mesmo que o sistema falhe logo após.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Propriedades ACID detalhadas</h2>
            <AcidProperties />
          </section>
          
          <section className="bg-purple-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Por que o ACID importa</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                As propriedades ACID fornecem garantias cruciais para aplicações onde a integridade dos dados é fundamental. Aqui estão alguns cenários reais onde a conformidade com ACID é essencial:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-5 rounded-md shadow-sm">
                  <h3 className="font-semibold text-lg mb-2 text-purple-700">Sistemas Financeiros</h3>
                  <p className="text-gray-700">
                    Aplicações bancárias precisam de total confiabilidade para transações como transferências de dinheiro. Uma transação parcial pode causar desaparecimento ou duplicação de valores.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-md shadow-sm">
                  <h3 className="font-semibold text-lg mb-2 text-purple-700">E-commerce</h3>
                  <p className="text-gray-700">
                    O processamento de pedidos envolve atualizar estoque, processar pagamentos e criar registros. ACID garante que o cliente não seja cobrado se o pedido não for concluído.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-md shadow-sm">
                  <h3 className="font-semibold text-lg mb-2 text-purple-700">Registros de Saúde</h3>
                  <p className="text-gray-700">
                    Sistemas médicos precisam assegurar que dados do paciente nunca sejam corrompidos ou atualizados parcialmente, pois registros incompletos podem causar graves consequências.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-md shadow-sm">
                  <h3 className="font-semibold text-lg mb-2 text-purple-700">Sistemas de Reservas</h3>
                  <p className="text-gray-700">
                    Sistemas de reserva de hotéis ou voos precisam garantir que as reservas sejam corretamente criadas ou canceladas, especialmente com múltiplos usuários tentando reservar o mesmo recurso.
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-md shadow-sm mt-6">
                <h3 className="font-semibold text-lg mb-2 text-purple-700">ACID vs. BASE: Modelos de Banco de Dados Diferentes</h3>
                <p className="text-gray-700 mb-3">
                  Nem todos os sistemas de banco de dados priorizam a conformidade ACID. Bancos NoSQL frequentemente seguem o modelo BASE (Basicamente Disponível, Estado Suave, Consistência Eventual), que sacrifica um pouco de consistência para garantir maior disponibilidade e tolerância a partições.
                </p>
                <p className="text-gray-700">
                  Escolha bancos ACID quando a integridade dos dados for crítica. Considere bancos BASE quando alta disponibilidade e escalabilidade forem mais importantes do que consistência estrita.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
