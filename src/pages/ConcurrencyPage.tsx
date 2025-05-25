import React from 'react';
import { AlertTriangle, Share2 } from 'lucide-react';
import { ConcurrencyIssues } from '../components/ConcurrencyIssues';

export const ConcurrencyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Concurrency Problems</h1>
          <p className="text-xl text-gray-600">
            Understanding the challenges when multiple transactions run simultaneously
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
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">What is Concurrency?</h2>
                  <p className="text-gray-700">
                    Database concurrency refers to multiple transactions accessing and modifying the same data simultaneously. While concurrency improves performance by allowing multiple operations to proceed in parallel, it can also lead to several data consistency issues if not managed properly.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-start mb-4">
                <AlertTriangle className="text-amber-500 mr-3 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Why Concurrency Problems Matter</h3>
                  <p className="text-gray-700">
                    Without proper concurrency control, your database could end up with:
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-red-50 p-4 rounded-md">
                  <h4 className="font-medium text-red-700 mb-2">Lost Updates</h4>
                  <p className="text-sm text-gray-700">
                    When two transactions read and update the same data, one transaction's changes might overwrite the other's without either transaction being aware.
                  </p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-md">
                  <h4 className="font-medium text-red-700 mb-2">Inconsistent Analysis</h4>
                  <p className="text-sm text-gray-700">
                    A transaction reads related data that's being modified by another transaction, resulting in an analysis based on inconsistent data.
                  </p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-md">
                  <h4 className="font-medium text-red-700 mb-2">Incorrect Calculations</h4>
                  <p className="text-sm text-gray-700">
                    Business logic that depends on consistent database reads might produce incorrect results when data changes mid-transaction.
                  </p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-md">
                  <h4 className="font-medium text-red-700 mb-2">Data Corruption</h4>
                  <p className="text-sm text-gray-700">
                    In severe cases, inconsistent updates can lead to database corruption, violating integrity constraints or business rules.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Common Concurrency Problems</h2>
            <ConcurrencyIssues />
          </section>
          
          <section className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Handle Concurrency Issues</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">1. Choose the Right Isolation Level</h3>
                <p className="text-gray-700">
                  Select an appropriate transaction isolation level based on your application's needs, balancing consistency requirements with performance considerations. Higher isolation levels prevent more concurrency issues but may reduce throughput.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">2. Use Locking Mechanisms</h3>
                <p className="text-gray-700 mb-3">
                  Database systems provide various locking mechanisms to control concurrent access:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li><span className="font-medium">Shared locks</span> allow multiple transactions to read data simultaneously</li>
                  <li><span className="font-medium">Exclusive locks</span> prevent other transactions from reading or writing while a transaction is modifying data</li>
                  <li><span className="font-medium">Row-level locks</span> are more granular and allow higher concurrency than table-level locks</li>
                </ul>
              </div>
              
              <div className="bg-white p-5 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">3. Implement Optimistic Concurrency Control</h3>
                <p className="text-gray-700">
                  Instead of locking resources, optimistic concurrency control allows transactions to proceed without locks, but verifies at commit time that no other transaction has modified the data. If conflicts are detected, the transaction can be retried or rejected.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">4. Design for Concurrency</h3>
                <p className="text-gray-700 mb-3">
                  Adjust your application design to minimize concurrency issues:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Keep transactions short and focused</li>
                  <li>Access resources in a consistent order to prevent deadlocks</li>
                  <li>Use version columns or timestamps to detect conflicts</li>
                  <li>Consider denormalization for frequently accessed data to reduce contention</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};