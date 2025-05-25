import React from 'react';
import { BadgeCheck } from 'lucide-react';
import { QuizComponent } from '../components/QuizComponent';

export const QuizPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Test Your Knowledge</h1>
          <p className="text-xl text-gray-600">
            Take this quiz to check your understanding of database transaction concepts
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
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Database Transactions Quiz</h2>
                  <p className="text-gray-700">
                    This quiz covers the main concepts we've explored, including transactions, ACID properties, concurrency issues, and deadlocks. Try your best to answer each question!
                  </p>
                </div>
              </div>
            </div>
            
            <QuizComponent />
          </section>
          
          <section className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h2>
            <p className="text-gray-700 mb-6">
              Database transactions are a foundational concept in database systems. To deepen your understanding, explore these related topics:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">Advanced Concepts</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Two-Phase Commit Protocol</li>
                  <li>Optimistic vs. Pessimistic Concurrency Control</li>
                  <li>Multi-Version Concurrency Control (MVCC)</li>
                  <li>Distributed Transactions</li>
                  <li>Transaction Isolation in NoSQL Databases</li>
                </ul>
              </div>
              
              <div className="bg-white p-5 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">Recommended Resources</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Database System Concepts (Silberschatz, Korth, Sudarshan)</li>
                  <li>Transaction Processing: Concepts and Techniques (Gray, Reuter)</li>
                  <li>Your database system's official documentation</li>
                  <li>Online courses on database management systems</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-md mt-6">
              <h3 className="font-semibold text-lg mb-2 text-green-700">Congratulations!</h3>
              <p className="text-gray-700">
                By understanding database transactions and ACID properties, you've mastered one of the most important concepts in database systems. This knowledge is invaluable for building reliable and robust applications.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};