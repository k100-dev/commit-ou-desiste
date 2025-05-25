import React from 'react';
import { Database, CheckCircle, Clock, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const features = [
    {
      icon: <Database className="h-6 w-6 text-purple-600" />,
      title: 'Transações',
      description: 'Aprenda como as transações oferecem uma forma confiável de agrupar operações em um banco de dados.',
      link: '/transactions'
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-emerald-600" />,
      title: 'ACID',
      description: 'Descubra as quatro propriedades essenciais que garantem o processamento confiável de bancos de dados.',
      link: '/acid'
    },
    {
      icon: <Users className="h-6 w-6 text-amber-600" />,
      title: 'Problemas de Concorrência',
      description: 'Entenda os problemas que podem ocorrer quando várias transações são executadas simultaneamente.',
      link: '/concurrency'
    },
    {
      icon: <Clock className="h-6 w-6 text-red-600" />,
      title: 'Deadlocks',
      description: 'Aprenda o que acontece quando transações ficam presas esperando umas pelas outras.',
      link: '/deadlock'
    }
  ];
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
             Entendendo as Transações de Bancos de Dados
            </h1>
            <p className="text-xl mb-8 text-purple-100">
              Uma jornada visual e interativa pelos conceitos fundamentais das transações em banco de dados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/transactions"
                className="px-6 py-3 bg-white text-purple-700 font-medium rounded-lg hover:bg-purple-50 transition-colors duration-300"
              >
                Aprenda aqui!
              </Link>
              <Link
                to="/quiz"
                className="px-6 py-3 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-400 transition-colors duration-300"
              >
                Teste seu conhecimento!
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Learn This Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Por que aprender sobre Transações?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              As transações em banco de dados são fundamentais para construir aplicações confiáveis.
              Elas garantem a integridade dos dados mesmo quando algo dá errado.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link 
                  to={feature.link}
                  className="text-purple-600 font-medium flex items-center hover:text-purple-700 transition-colors"
                >
                  Saiba mais <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Interactive Learning Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Aprendizado Interativo</h2>
                <p className="text-gray-700 mb-6">
                Nossos exemplos interativos e simulações ajudam você a entender conceitos complexos de banco de dados por meio da prática, e não apenas da teoria.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                      <span className="text-sm font-medium">1</span>
                    </div>
                    <p className="text-gray-700">Simule transações de banco de dados com nossas ferramentas visuais.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                      <span className="text-sm font-medium">2</span>
                    </div>
                    <p className="text-gray-700">Veja o que acontece durante as operações de COMMIT e ROLLBACK.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                      <span className="text-sm font-medium">3</span>
                    </div>
                    <p className="text-gray-700">Veja os deadlocks acontecendo e aprenda como evitá-los.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                      <span className="text-sm font-medium">4</span>
                    </div>
                    <p className="text-gray-700">Teste seu conhecimento com os Quizzes</p>
                  </li>
                </ul>
              </div>
              
              <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
                <div className="aspect-w-16 aspect-h-9 bg-purple-50 rounded-md p-4 flex items-center justify-center">
                  <div className="text-center">
                    <Database className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                    <p className="text-gray-700 font-medium">Simulações interativas ajudam você a entender como as transações funcionam no mundo real</p>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Link
                    to="/transactions"
                    className="py-3 px-4 bg-purple-100 text-purple-700 rounded-md font-medium text-center hover:bg-purple-200 transition-colors"
                  >
                    Teste a Demo de Transação
                  </Link>
                  <Link
                    to="/deadlock"
                    className="py-3 px-4 bg-amber-100 text-amber-700 rounded-md font-medium text-center hover:bg-amber-200 transition-colors"
                  >
                    Explore o Conceito de Deadlocks
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-12 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Pronto para masterizar os conceitos de transação?</h2>
          <Link
            to="/transactions"
            className="px-8 py-3 bg-white text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-colors inline-flex items-center"
          >
            Comece aprendendo agora! <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
