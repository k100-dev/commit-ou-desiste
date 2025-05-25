import React, { useState } from 'react';
import { AlertTriangle, RefreshCw, Ghost } from 'lucide-react';
import { AnimatedCard } from './AnimatedCard';

export const ConcurrencyIssues = () => {
  const [activeTab, setActiveTab] = useState('dirty-read');
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 px-4 font-medium text-sm ${
              activeTab === 'dirty-read'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('dirty-read')}
          >
            Dirty Read
          </button>
          <button
            className={`flex-1 py-3 px-4 font-medium text-sm ${
              activeTab === 'non-repeatable'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('non-repeatable')}
          >
            Non-Repeatable Read
          </button>
          <button
            className={`flex-1 py-3 px-4 font-medium text-sm ${
              activeTab === 'phantom'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('phantom')}
          >
            Phantom Read
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'dirty-read' && (
            <div className="space-y-4">
              <div className="flex items-start mb-4">
                <AlertTriangle className="text-amber-500 mr-3 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Dirty Read</h3>
                  <p className="text-gray-700">
                    A dirty read occurs when a transaction reads data that has been modified by another transaction but not yet committed.
                  </p>
                </div>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-md">
                <h4 className="font-medium text-amber-700 mb-2">Real-world example:</h4>
                <p className="text-sm text-gray-700">
                  Imagine you're checking your bank account balance while a deposit is being processed. You see the new higher balance, but the deposit transaction fails and is rolled back. You've just experienced a "dirty read" of data that was never actually committed.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b border-gray-200">
                  <h4 className="font-medium text-gray-700">Dirty Read Scenario</h4>
                </div>
                <div className="p-4">
                  <div className="flex flex-col space-y-4">
                    <div className="flex space-x-6">
                      <div className="w-1/2">
                        <div className="text-center mb-2 font-medium text-blue-600">Transaction A</div>
                        <div className="border border-blue-200 rounded-md bg-blue-50 p-3 text-sm space-y-2">
                          <div className="bg-white p-2 rounded border border-blue-100">
                            BEGIN TRANSACTION;
                          </div>
                          <div className="bg-white p-2 rounded border border-blue-100">
                            UPDATE accounts SET balance = balance - 100 WHERE id = 1;
                            <span className="block text-xs text-gray-500 mt-1">/* Account balance is now $900 */</span>
                          </div>
                          <div className="bg-white p-2 rounded border border-blue-100 opacity-50">
                            -- Some processing time...
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-1/2">
                        <div className="text-center mb-2 font-medium text-green-600">Transaction B</div>
                        <div className="border border-green-200 rounded-md bg-green-50 p-3 text-sm space-y-2">
                          <div className="bg-white p-2 rounded border border-green-100">
                            BEGIN TRANSACTION;
                          </div>
                          <div className="bg-white p-2 rounded border border-green-100">
                            SELECT balance FROM accounts WHERE id = 1;
                            <span className="block text-xs text-gray-500 mt-1">/* Reads $900 (dirty data) */</span>
                          </div>
                          <div className="bg-white p-2 rounded border border-green-100">
                            COMMIT;
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-1/2">
                      <div className="border border-blue-200 rounded-md bg-blue-50 p-3 text-sm space-y-2">
                        <div className="bg-white p-2 rounded border border-blue-100">
                          ROLLBACK; -- Transaction A fails and rolls back
                          <span className="block text-xs text-gray-500 mt-1">/* Account balance reverts to $1000 */</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-red-50 p-3 rounded-md text-sm">
                      <p className="text-red-700">
                        <strong>Problem:</strong> Transaction B reads and commits a balance of $900, but the actual balance is $1000 because Transaction A rolled back.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'non-repeatable' && (
            <div className="space-y-4">
              <div className="flex items-start mb-4">
                <RefreshCw className="text-amber-500 mr-3 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Non-Repeatable Read</h3>
                  <p className="text-gray-700">
                    A non-repeatable read occurs when a transaction reads the same row twice and gets different values because another committed transaction modified the data between the reads.
                  </p>
                </div>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-md">
                <h4 className="font-medium text-amber-700 mb-2">Real-world example:</h4>
                <p className="text-sm text-gray-700">
                  Imagine you're generating a report that reads the same customer's data twice. Between those reads, another user updates the customer's information. Your report now contains inconsistent data, showing different values for the same customer.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b border-gray-200">
                  <h4 className="font-medium text-gray-700">Non-Repeatable Read Scenario</h4>
                </div>
                <div className="p-4">
                  <div className="flex flex-col space-y-4">
                    <div className="flex space-x-6">
                      <div className="w-1/2">
                        <div className="text-center mb-2 font-medium text-blue-600">Transaction A</div>
                        <div className="border border-blue-200 rounded-md bg-blue-50 p-3 text-sm space-y-2">
                          <div className="bg-white p-2 rounded border border-blue-100">
                            BEGIN TRANSACTION;
                          </div>
                          <div className="bg-white p-2 rounded border border-blue-100">
                            SELECT price FROM products WHERE id = 101;
                            <span className="block text-xs text-gray-500 mt-1">/* Reads price: $10.00 */</span>
                          </div>
                          <div className="bg-white p-2 rounded border border-blue-100 opacity-50">
                            -- Other operations...
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-1/2">
                        <div className="text-center mb-2 font-medium text-green-600">Transaction B</div>
                        <div className="border border-green-200 rounded-md bg-green-50 p-3 text-sm space-y-2">
                          <div className="bg-white p-2 rounded border border-green-100">
                            BEGIN TRANSACTION;
                          </div>
                          <div className="bg-white p-2 rounded border border-green-100">
                            UPDATE products SET price = 12.00 WHERE id = 101;
                          </div>
                          <div className="bg-white p-2 rounded border border-green-100">
                            COMMIT;
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-1/2">
                      <div className="border border-blue-200 rounded-md bg-blue-50 p-3 text-sm space-y-2">
                        <div className="bg-white p-2 rounded border border-blue-100">
                          SELECT price FROM products WHERE id = 101;
                          <span className="block text-xs text-gray-500 mt-1">/* Now reads price: $12.00 */</span>
                        </div>
                        <div className="bg-white p-2 rounded border border-blue-100">
                          COMMIT;
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-red-50 p-3 rounded-md text-sm">
                      <p className="text-red-700">
                        <strong>Problem:</strong> Transaction A reads different values for the same row in a single transaction, which can lead to inconsistencies in reports or calculations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'phantom' && (
            <div className="space-y-4">
              <div className="flex items-start mb-4">
                <Ghost className="text-amber-500 mr-3 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Phantom Read</h3>
                  <p className="text-gray-700">
                    A phantom read occurs when a transaction re-executes a query returning a set of rows that satisfy a search condition and finds that a different set of rows satisfy the condition than before—some rows have appeared or disappeared.
                  </p>
                </div>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-md">
                <h4 className="font-medium text-amber-700 mb-2">Real-world example:</h4>
                <p className="text-sm text-gray-700">
                  Imagine an inventory system that counts how many products are in stock within a price range. Your transaction first counts 5 items, performs some calculations, then counts again. Meanwhile, another transaction adds a new product in that price range. Your second count now shows 6 items, creating a "phantom" that wasn't there before.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b border-gray-200">
                  <h4 className="font-medium text-gray-700">Phantom Read Scenario</h4>
                </div>
                <div className="p-4">
                  <div className="flex flex-col space-y-4">
                    <div className="flex space-x-6">
                      <div className="w-1/2">
                        <div className="text-center mb-2 font-medium text-blue-600">Transaction A</div>
                        <div className="border border-blue-200 rounded-md bg-blue-50 p-3 text-sm space-y-2">
                          <div className="bg-white p-2 rounded border border-blue-100">
                            BEGIN TRANSACTION;
                          </div>
                          <div className="bg-white p-2 rounded border border-blue-100">
                            SELECT COUNT(*) FROM orders WHERE order_date = '2023-06-15';
                            <span className="block text-xs text-gray-500 mt-1">/* Returns 10 orders */</span>
                          </div>
                          <div className="bg-white p-2 rounded border border-blue-100 opacity-50">
                            -- Process based on having 10 orders...
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-1/2">
                        <div className="text-center mb-2 font-medium text-green-600">Transaction B</div>
                        <div className="border border-green-200 rounded-md bg-green-50 p-3 text-sm space-y-2">
                          <div className="bg-white p-2 rounded border border-green-100">
                            BEGIN TRANSACTION;
                          </div>
                          <div className="bg-white p-2 rounded border border-green-100">
                            INSERT INTO orders (order_id, customer_id, order_date)
                            VALUES (1001, 5, '2023-06-15');
                          </div>
                          <div className="bg-white p-2 rounded border border-green-100">
                            COMMIT;
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-1/2">
                      <div className="border border-blue-200 rounded-md bg-blue-50 p-3 text-sm space-y-2">
                        <div className="bg-white p-2 rounded border border-blue-100">
                          SELECT COUNT(*) FROM orders WHERE order_date = '2023-06-15';
                          <span className="block text-xs text-gray-500 mt-1">/* Now returns 11 orders */</span>
                        </div>
                        <div className="bg-white p-2 rounded border border-blue-100">
                          COMMIT;
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-red-50 p-3 rounded-md text-sm">
                      <p className="text-red-700">
                        <strong>Problem:</strong> Transaction A sees different result sets for the same query within the same transaction, which can lead to logical errors in processing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-blue-50 p-5 rounded-lg">
        <h3 className="font-semibold text-lg mb-3">Preventing Concurrency Issues with Isolation Levels</h3>
        <p className="text-gray-700 mb-4">
          Database systems provide different transaction isolation levels to prevent these concurrency problems, with trade-offs between consistency and performance:
        </p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-700">Isolation Level</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-700">Dirty Read</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-700">Non-Repeatable Read</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-700">Phantom Read</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-medium">READ UNCOMMITTED</td>
                <td className="px-4 py-3 text-sm text-red-600">Possible</td>
                <td className="px-4 py-3 text-sm text-red-600">Possible</td>
                <td className="px-4 py-3 text-sm text-red-600">Possible</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">READ COMMITTED</td>
                <td className="px-4 py-3 text-sm text-green-600">Prevented</td>
                <td className="px-4 py-3 text-sm text-red-600">Possible</td>
                <td className="px-4 py-3 text-sm text-red-600">Possible</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">REPEATABLE READ</td>
                <td className="px-4 py-3 text-sm text-green-600">Prevented</td>
                <td className="px-4 py-3 text-sm text-green-600">Prevented</td>
                <td className="px-4 py-3 text-sm text-red-600">Possible</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">SERIALIZABLE</td>
                <td className="px-4 py-3 text-sm text-green-600">Prevented</td>
                <td className="px-4 py-3 text-sm text-green-600">Prevented</td>
                <td className="px-4 py-3 text-sm text-green-600">Prevented</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p className="text-sm text-gray-600 mt-4">
          Higher isolation levels provide more consistency but may reduce concurrency and performance. The appropriate level depends on your application's requirements.
        </p>
      </div>
    </div>
  );
};