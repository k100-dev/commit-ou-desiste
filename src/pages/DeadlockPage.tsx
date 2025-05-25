import React from 'react';
import { Clock, RefreshCw } from 'lucide-react';
import { DeadlockDemo } from '../components/DeadlockDemo';

export const DeadlockPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Deadlocks</h1>
          <p className="text-xl text-gray-600">
            Entendendo e prevenindo o problema de espera circular
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-10">
          <section>
            <div className="bg-red-50 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-red-100 rounded-full p-3 mr-4">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">O que é um Deadlock?</h2>
                  <p className="text-gray-700">
                    Um deadlock ocorre quando duas ou mais transações ficam esperando indefinidamente que a outra libere recursos. Isso cria uma dependência circular onde nenhuma das transações pode prosseguir, resultando em um impasse.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="font-semibold text-lg mb-3 text-purple-700">Cenário Clássico de Deadlock</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-gray-700 mb-1">Transação 1:</p>
                    <ol className="list-decimal pl-5 text-sm text-gray-700">
                      <li>Adquire um bloqueio no recurso A</li>
                      <li>Tenta adquirir um bloqueio no recurso B, mas precisa esperar porque a Transação 2 o detém</li>
                    </ol>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-gray-700 mb-1">Transação 2:</p>
                    <ol className="list-decimal pl-5 text-sm text-gray-700">
                      <li>Adquire um bloqueio no recurso B</li>
                      <li>Tenta adquirir um bloqueio no recurso A, mas precisa esperar porque a Transação 1 o detém</li>
                    </ol>
                  </div>
                  
                  <div className="bg-purple-50 p-3 rounded-md">
                    <p className="text-sm text-black-700">
                      <strong>Resultado:</strong> Ambas as transações ficam bloqueadas indefinidamente, esperando por recursos que nunca serão liberados.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="font-semibold text-lg mb-3 text-purple-700">Quatro Condições para o Deadlock</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Todas as quatro condições devem estar presentes para que ocorra um deadlock:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2 mt-0.5">
                      <span className="text-xs font-medium">1</span>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-medium">Exclusão Mútua:</span> Recursos não podem ser compartilhados simultaneamente
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2 mt-0.5">
                      <span className="text-xs font-medium">2</span>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-medium">Manter e Esperar:</span> Transações mantêm recursos enquanto aguardam outros
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2 mt-0.5">
                      <span className="text-xs font-medium">3</span>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-medium">Sem Preempção:</span> Recursos não podem ser tomados à força das transações
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2 mt-0.5">
                      <span className="text-xs font-medium">4</span>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-medium">Espera Circular:</span> Existe uma cadeia circular de transações, cada uma esperando por um recurso detido pela próxima
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <RefreshCw className="mr-2 text-red-600" size={24} />
              Simulação de Deadlock
            </h2>
            <DeadlockDemo />
          </section>
          
          <section className="bg-purple-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Prevenção e Tratamento de Deadlocks</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-purple-700">Estratégias de Prevenção de Deadlocks</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    <span className="font-medium">Ordenação de Recursos:</span> Sempre adquira os bloqueios em uma ordem consistente entre todas as transações. Se todas acessarem os recursos na mesma ordem, a espera circular não pode ocorrer.
                  </li>
                  <li>
                    <span className="font-medium">Tempo de Espera dos Bloqueios:</span> Defina um tempo máximo que uma transação irá esperar por um bloqueio. Se o tempo expirar, a transação é desfeita e pode ser tentada novamente.
                  </li>
                  <li>
                    <span className="font-medium">Bloquear Todos os Recursos de Uma Vez:</span> Adquira todos os bloqueios necessários no início da transação para evitar a condição de manter e esperar.
                  </li>
                  <li>
                    <span className="font-medium">Detecção de Deadlocks:</span> Implemente algoritmos para detectar ciclos no grafo de espera e resolva automaticamente os deadlocks desfazendo transações selecionadas.
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-5 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-purple-700">Como os Sistemas de Banco de Dados Lidam com Deadlocks</h3>
                <p className="text-gray-700 mb-3">
                  Diferentes sistemas de banco de dados lidam com deadlocks de maneiras variadas:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    <span className="font-medium">MySQL:</span> Detecta automaticamente deadlocks e desfaz a transação com menos alterações para resolver o problema.
                  </li>
                  <li>
                    <span className="font-medium">PostgreSQL:</span> Verifica automaticamente por deadlocks e encerra uma das transações envolvidas para quebrar o ciclo.
                  </li>
                  <li>
                    <span className="font-medium">SQL Server:</span> Escolhe uma vítima de deadlock com base em fatores como qual transação é mais barata de desfazer ou a prioridade da transação.
                  </li>
                  <li>
                    <span className="font-medium">Oracle:</span> Usa algoritmos de detecção de deadlock e desfaz automaticamente a transação que completa o ciclo.
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-5 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-purple-700">Melhores Práticas para Desenvolvedores de Aplicações</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Mantenha as transações o mais curtas possível para reduzir a chance de conflitos</li>
                  <li>Acesse as tabelas na mesma ordem em todas as transações</li>
                  <li>Implemente lógica de repetição para transações que falharem devido a deadlocks</li>
                  <li>Monitore e registre ocorrências de deadlocks para identificar padrões problemáticos</li>
                  <li>Considere usar controle de concorrência otimista para recursos frequentemente disputados</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
