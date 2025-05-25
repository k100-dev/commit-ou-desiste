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
            Understanding and preventing the circular waiting problem
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
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">What is a Deadlock?</h2>
                  <p className="text-gray-700">
                    A deadlock occurs when two or more transactions are waiting indefinitely for each other to release locks. This creates a circular dependency where none of the transactions can proceed, resulting in a standstill.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="font-semibold text-lg mb-3 text-red-700">Classic Deadlock Scenario</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-gray-700 mb-1">Transaction 1:</p>
                    <ol className="list-decimal pl-5 text-sm text-gray-700">
                      <li>Acquires a lock on resource A</li>
                      <li>Tries to acquire a lock on resource B, but must wait because Transaction 2 holds it</li>
                    </ol>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-gray-700 mb-1">Transaction 2:</p>
                    <ol className="list-decimal pl-5 text-sm text-gray-700">
                      <li>Acquires a lock on resource B</li>
                      <li>Tries to acquire a lock on resource A, but must wait because Transaction 1 holds it</li>
                    </ol>
                  </div>
                  
                  <div className="bg-red-50 p-3 rounded-md">
                    <p className="text-sm text-red-700">
                      <strong>Result:</strong> Both transactions are blocked indefinitely, waiting for resources that will never be released.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="font-semibold text-lg mb-3 text-blue-700">Four Conditions for Deadlock</h3>
                <p className="text-sm text-gray-700 mb-3">
                  All four conditions must be present for a deadlock to occur:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5">
                      <span className="text-xs font-medium">1</span>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-medium">Mutual Exclusion:</span> Resources cannot be shared simultaneously
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5">
                      <span className="text-xs font-medium">2</span>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-medium">Hold and Wait:</span> Transactions hold resources while waiting for others
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5">
                      <span className="text-xs font-medium">3</span>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-medium">No Preemption:</span> Resources cannot be forcibly taken from transactions
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5">
                      <span className="text-xs font-medium">4</span>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-medium">Circular Wait:</span> A circular chain of transactions exists, each waiting for a resource held by the next
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <RefreshCw className="mr-2 text-red-600" size={24} />
              Deadlock Simulation
            </h2>
            <DeadlockDemo />
          </section>
          
          <section className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Preventing and Handling Deadlocks</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">Deadlock Prevention Strategies</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    <span className="font-medium">Resource Ordering:</span> Always acquire locks in a consistent order across all transactions. If all transactions access resources in the same order, circular wait cannot occur.
                  </li>
                  <li>
                    <span className="font-medium">Lock Timeouts:</span> Set a maximum time a transaction will wait for a lock. If the timeout expires, the transaction is rolled back and can be retried.
                  </li>
                  <li>
                    <span className="font-medium">Lock All Resources at Once:</span> Acquire all needed locks at the beginning of a transaction to prevent the hold-and-wait condition.
                  </li>
                  <li>
                    <span className="font-medium">Deadlock Detection:</span> Implement algorithms to detect cycles in the wait-for graph and automatically resolve deadlocks by rolling back selected transactions.
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-5 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">How Database Systems Handle Deadlocks</h3>
                <p className="text-gray-700 mb-3">
                  Different database systems handle deadlocks in various ways:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    <span className="font-medium">MySQL:</span> Automatically detects deadlocks and rolls back the transaction with the fewest changes to resolve the deadlock.
                  </li>
                  <li>
                    <span className="font-medium">PostgreSQL:</span> Checks for deadlocks automatically and terminates one of the transactions involved to break the cycle.
                  </li>
                  <li>
                    <span className="font-medium">SQL Server:</span> Chooses a deadlock victim based on factors like which transaction is cheaper to roll back or transaction priority settings.
                  </li>
                  <li>
                    <span className="font-medium">Oracle:</span> Uses deadlock detection algorithms and automatically rolls back the transaction that completes the cycle.
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-5 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">Best Practices for Application Developers</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Keep transactions as short as possible to reduce the likelihood of conflicts</li>
                  <li>Access tables in the same order across all transactions</li>
                  <li>Implement retry logic for transactions that fail due to deadlocks</li>
                  <li>Monitor and log deadlock occurrences to identify problematic transaction patterns</li>
                  <li>Consider using optimistic concurrency control for frequently contended resources</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};