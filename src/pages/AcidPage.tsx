import React from 'react';
import { Atom, Shield, Users, Database } from 'lucide-react';
import { AcidProperties } from '../components/AcidProperties';

export const AcidPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">ACID Properties</h1>
          <p className="text-xl text-gray-600">
            The four key properties that ensure reliable database transactions
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-10">
          <section>
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-3 mr-4">
                  <Database className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">What is ACID?</h2>
                  <p className="text-gray-700">
                    ACID is an acronym that represents the four essential properties that guarantee reliable processing of database transactions, even in the event of errors, power failures, or other issues.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-l-violet-500">
                <div className="flex items-center mb-3">
                  <Atom className="h-6 w-6 text-violet-600 mr-2" />
                  <h3 className="text-xl font-semibold text-violet-700">A - Atomicity</h3>
                </div>
                <p className="text-gray-700">
                  All operations in a transaction succeed or all fail. There are no partial transactions. It's "all or nothing."
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-l-emerald-500">
                <div className="flex items-center mb-3">
                  <Shield className="h-6 w-6 text-emerald-600 mr-2" />
                  <h3 className="text-xl font-semibold text-emerald-700">C - Consistency</h3>
                </div>
                <p className="text-gray-700">
                  A transaction can only bring the database from one valid state to another, maintaining all rules and constraints.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-l-amber-500">
                <div className="flex items-center mb-3">
                  <Users className="h-6 w-6 text-amber-600 mr-2" />
                  <h3 className="text-xl font-semibold text-amber-700">I - Isolation</h3>
                </div>
                <p className="text-gray-700">
                  Concurrent transactions do not interfere with each other, as if they were executed sequentially.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-l-blue-500">
                <div className="flex items-center mb-3">
                  <Database className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-blue-700">D - Durability</h3>
                </div>
                <p className="text-gray-700">
                  Once a transaction is committed, its changes remain permanent, even if the system crashes immediately afterward.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Detailed ACID Properties</h2>
            <AcidProperties />
          </section>
          
          <section className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Why ACID Matters</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                ACID properties provide crucial guarantees for applications where data integrity is critical. Here are some real-world scenarios where ACID compliance is essential:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-5 rounded-md shadow-sm">
                  <h3 className="font-semibold text-lg mb-2 text-blue-700">Financial Systems</h3>
                  <p className="text-gray-700">
                    Banking applications need absolute reliability for transactions like money transfers. A partial transaction could result in money disappearing or being duplicated.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-md shadow-sm">
                  <h3 className="font-semibold text-lg mb-2 text-blue-700">E-commerce</h3>
                  <p className="text-gray-700">
                    Order processing involves updating inventory, processing payments, and creating order records. ACID ensures that a customer isn't charged if the order fails to complete.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-md shadow-sm">
                  <h3 className="font-semibold text-lg mb-2 text-blue-700">Healthcare Records</h3>
                  <p className="text-gray-700">
                    Medical systems need to ensure patient data is never corrupted or partially updated, as incomplete or inconsistent medical records can lead to serious consequences.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-md shadow-sm">
                  <h3 className="font-semibold text-lg mb-2 text-blue-700">Reservation Systems</h3>
                  <p className="text-gray-700">
                    Hotel or airline booking systems need to ensure that reservations are properly created or cancelled, especially when multiple users are trying to book the same resource.
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-md shadow-sm mt-6">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">ACID vs. BASE: Different Database Models</h3>
                <p className="text-gray-700 mb-3">
                  Not all database systems prioritize ACID compliance. NoSQL databases often follow the BASE model (Basically Available, Soft state, Eventually consistent) which sacrifices some consistency for better availability and partition tolerance.
                </p>
                <p className="text-gray-700">
                  Choose ACID-compliant databases when data integrity is critical. Consider BASE databases when high availability and scalability are more important than strict consistency.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};