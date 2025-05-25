import React from 'react';
import { BadgeCheck } from 'lucide-react';
import { QuizComponent } from '../components/QuizComponent';

export const QuizPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Teste Seus Conhecimentos</h1>
          <p className="text-xl text-gray-600">
            Faça este quiz para verificar seu entendimento sobre conceitos de transações em banco de dados
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-10">
          <section>
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-3 mr-4">
                  <BadgeCheck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz de Transações em Banco de Dados</h2>
                  <p className="text-gray-700">
                    Este quiz aborda os principais conceitos que exploramos, incluindo transações, propriedades ACID, problemas de concorrência e deadlocks. Faça o seu melhor para responder cada pergunta!
                  </p>
                </div>
              </div>
            </div>
            
            <QuizComponent />
          </section>
          
          <section className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Continue Aprendendo</h2>
            <p className="text-gray-700 mb-6">
              Transações em banco de dados são um conceito fundamental em sistemas de banco de dados. Para aprofundar seu entendimento, explore os seguintes tópicos relacionados:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">Conceitos Avançados</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Protocolo de Commit em Duas Fases</li>
                  <li>Controle de Concorrência Otimista vs. Pessimista</li>
                  <li>Controle de Concorrência Multi-Versão (MVCC)</li>
                  <li>Transações Distribuídas</li>
                  <li>Isolamento de Transações em Bancos de Dados NoSQL</li>
                </ul>
              </div>
              
              <div className="bg-white p-5 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">Recursos Recomendados</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Database System Concepts (Silberschatz, Korth, Sudarshan)</li>
                  <li>Transaction Processing: Concepts and Techniques (Gray, Reuter)</li>
                  <li>Documentação oficial do seu sistema de banco de dados</li>
                  <li>Cursos online sobre sistemas de gerenciamento de banco de dados</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-md mt-6">
              <h3 className="font-semibold text-lg mb-2 text-green-700">Parabéns!</h3>
              <p className="text-gray-700">
                Ao compreender transações em banco de dados e as propriedades ACID, você dominou um dos conceitos mais importantes em sistemas de banco de dados. Esse conhecimento é inestimável para construir aplicações confiáveis e robustas.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
