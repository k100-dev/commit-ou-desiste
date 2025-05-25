import React from 'react';
import { Database, CheckCircle, XCircle, ArrowDown } from 'lucide-react';
import { CommitRollbackDemo } from '../components/CommitRollbackDemo';
import { InteractiveDemo } from '../components/InteractiveDemo';

export const TransactionsPage = () => {
  const transactionSteps = [
    {
      title: "What is a Database Transaction?",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            A database transaction is a logical unit of work that contains one or more database operations (such as inserts, updates, or deletes). Transactions provide a way to group operations together in an "all-or-nothing" manner.
          </p>
          <div className="bg-blue-50 p-4 rounded-md">
            <h4 className="font-medium text-blue-700 mb-2">Key characteristics:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>A transaction represents a single unit of work</li>
              <li>It may consist of multiple database operations</li>
              <li>Either all operations succeed, or none of them take effect</li>
              <li>Once committed, changes become permanent</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Transaction Workflow",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            A typical transaction follows these steps:
          </p>
          
          <div className="flex flex-col items-center space-y-2 py-4">
            <div className="bg-blue-100 text-blue-800 font-medium px-4 py-2 rounded-md w-48 text-center">
              BEGIN TRANSACTION
            </div>
            <ArrowDown className="text-gray-400" size={20} />
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md w-48 text-center">
              Database Operations
            </div>
            <ArrowDown className="text-gray-400" size={20} />
            <div className="flex space-x-4">
              <div className="bg-green-100 text-green-800 font-medium px-4 py-2 rounded-md text-center flex items-center">
                <CheckCircle size={18} className="mr-2" />
                COMMIT
              </div>
              <div className="bg-red-100 text-red-800 font-medium px-4 py-2 rounded-md text-center flex items-center">
                <XCircle size={18} className="mr-2" />
                ROLLBACK
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-green-50 p-4 rounded-md">
              <h4 className="font-medium text-green-700 mb-2">COMMIT</h4>
              <p className="text-sm text-gray-700">
                Makes all changes made during the transaction permanent. After a COMMIT, other users can see your changes, and you cannot roll back the transaction.
              </p>
            </div>
            
            <div className="bg-red-50 p-4 rounded-md">
              <h4 className="font-medium text-red-700 mb-2">ROLLBACK</h4>
              <p className="text-sm text-gray-700">
                Cancels all changes made during the transaction and restores the database to its state before the transaction began. Use ROLLBACK if an error occurs or you decide not to complete the transaction.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "SQL Example: Bank Transfer",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Here's a simple SQL example of a bank transfer transaction:
          </p>
          
          <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm">
            <pre>{`-- Start a transaction
BEGIN TRANSACTION;

-- Withdraw $100 from Account A
UPDATE accounts 
SET balance = balance - 100 
WHERE account_id = 'A';

-- Deposit $100 to Account B
UPDATE accounts 
SET balance = balance + 100 
WHERE account_id = 'B';

-- If both operations succeeded, commit the changes
COMMIT;

-- If any operation failed, we would roll back
-- ROLLBACK;`}</pre>
          </div>
          
          <p className="text-gray-700">
            This transaction ensures that money is neither created nor destroyed—it's simply moved from one account to another. If either the withdrawal or deposit fails, the entire transaction is rolled back.
          </p>
        </div>
      )
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Database Transactions</h1>
          <p className="text-xl text-gray-600">
            Understanding the fundamental building blocks of reliable database operations
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-10">
          <section>
            <InteractiveDemo 
              steps={transactionSteps}
              title="Database Transactions Explained"
            />
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Database className="mr-2 text-blue-600" size={24} />
              Try It Yourself: COMMIT and ROLLBACK
            </h2>
            <CommitRollbackDemo />
          </section>
          
          <section className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Takeaways</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">The "All or Nothing" Principle</h3>
                <p className="text-gray-700">
                  Transactions ensure that either all of the operations complete successfully, or none of them have any effect on the database. This prevents partial updates that could leave your data in an inconsistent state.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">When to Use Transactions</h3>
                <p className="text-gray-700">
                  Use transactions whenever you have multiple related database operations that must succeed or fail as a group. Common examples include transferring money between accounts, processing an order with inventory updates, or user registration with multiple tables.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">COMMIT vs. ROLLBACK</h3>
                <p className="text-gray-700">
                  COMMIT makes changes permanent and visible to other users. ROLLBACK undoes all changes made within the transaction, returning the database to its previous state. Always include error handling to ROLLBACK when problems occur.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">Transaction Scope</h3>
                <p className="text-gray-700">
                  Keep transactions as short as possible while still maintaining data integrity. Long-running transactions can lead to performance issues, lock contention, and concurrency problems.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};