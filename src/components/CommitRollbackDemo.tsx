import React, { useState } from 'react';
import { Check, X, RotateCcw, DatabaseBackup } from 'lucide-react';

export const CommitRollbackDemo = () => {
  const initialBalance = 1000;
  const [balance, setBalance] = useState(initialBalance);
  const [pendingChanges, setPendingChanges] = useState(0);
  const [transactionActive, setTransactionActive] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  
  const startTransaction = () => {
    setTransactionActive(true);
    setPendingChanges(0);
    addToHistory('Transaction started');
  };
  
  const withdraw = (amount: number) => {
    if (!transactionActive) {
      addToHistory('Error: No active transaction to withdraw from');
      return;
    }
    setPendingChanges(prev => prev - amount);
    addToHistory(`Pending: Withdraw $${amount}`);
  };

  const deposit = (amount: number) => {
    if (!transactionActive) {
      addToHistory('Error: No active transaction to deposit to');
      return;
    }
    setPendingChanges(prev => prev + amount);
    addToHistory(`Pending: Deposit $${amount}`);
  };
  
  const commit = () => {
    if (!transactionActive) {
      addToHistory('Error: No active transaction to commit');
      return;
    }
    setBalance(prev => prev + pendingChanges);
    setTransactionActive(false);
    addToHistory(`Transaction COMMITTED: Balance changed by $${pendingChanges}`);
    setPendingChanges(0);
  };
  
  const rollback = () => {
    if (!transactionActive) {
      addToHistory('Error: No active transaction to rollback');
      return;
    }
    addToHistory('Transaction ROLLED BACK: Changes discarded');
    setTransactionActive(false);
    setPendingChanges(0);
  };
  
  const addToHistory = (message: string) => {
    setHistory(prev => [message, ...prev].slice(0, 10));
  };
  
  const resetDemo = () => {
    setBalance(initialBalance);
    setPendingChanges(0);
    setTransactionActive(false);
    setHistory([]);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4 text-blue-600">COMMIT & ROLLBACK Simulator</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Account Status</h4>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Current Balance:</p>
              <p className="text-2xl font-bold text-blue-700">${balance.toFixed(2)}</p>
            </div>
            
            {transactionActive && (
              <div className="mb-4 border-t pt-4 border-blue-200">
                <p className="text-sm text-gray-600">Pending Changes:</p>
                <p className={`text-xl font-bold ${pendingChanges >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {pendingChanges >= 0 ? '+' : ''}{pendingChanges.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 mt-1">After Commit:</p>
                <p className="text-lg font-semibold">${(balance + pendingChanges).toFixed(2)}</p>
              </div>
            )}
            
            <div className={`p-2 rounded-md ${transactionActive ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
              <p className="text-sm font-medium">
                {transactionActive ? 'Transaction in progress...' : 'No active transaction'}
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={startTransaction}
              disabled={transactionActive}
              className={`w-full py-2 px-4 rounded-md ${
                transactionActive
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } transition-colors flex items-center justify-center gap-2`}
            >
              <DatabaseBackup size={18} />
              Start Transaction
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => withdraw(100)}
                disabled={!transactionActive}
                className={`py-2 px-4 rounded-md ${
                  !transactionActive
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                } transition-colors`}
              >
                Withdraw $100
              </button>
              
              <button
                onClick={() => deposit(50)}
                disabled={!transactionActive}
                className={`py-2 px-4 rounded-md ${
                  !transactionActive
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                } transition-colors`}
              >
                Deposit $50
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={commit}
                disabled={!transactionActive}
                className={`py-2 px-4 rounded-md ${
                  !transactionActive
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                } transition-colors flex items-center justify-center gap-2`}
              >
                <Check size={18} />
                COMMIT
              </button>
              
              <button
                onClick={rollback}
                disabled={!transactionActive}
                className={`py-2 px-4 rounded-md ${
                  !transactionActive
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-amber-600 text-white hover:bg-amber-700'
                } transition-colors flex items-center justify-center gap-2`}
              >
                <X size={18} />
                ROLLBACK
              </button>
            </div>
            
            <button
              onClick={resetDemo}
              className="w-full py-2 px-4 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} />
              Reset Demo
            </button>
          </div>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Transaction Log</h4>
          <div className="border border-slate-200 rounded-md bg-white h-[350px] overflow-y-auto">
            {history.length === 0 ? (
              <p className="text-gray-500 p-4 text-center italic">No transaction history yet. Start a transaction!</p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {history.map((entry, index) => (
                  <li key={index} className="px-4 py-2 text-sm">
                    {entry.includes('COMMITTED') ? (
                      <span className="text-emerald-600 font-medium">{entry}</span>
                    ) : entry.includes('ROLLED BACK') ? (
                      <span className="text-amber-600 font-medium">{entry}</span>
                    ) : entry.includes('Error') ? (
                      <span className="text-red-600 font-medium">{entry}</span>
                    ) : (
                      <span>{entry}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">What's Happening?</h4>
        <p className="text-sm text-gray-700 mb-2">
          This simulation demonstrates database transactions with COMMIT and ROLLBACK operations:
        </p>
        <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
          <li><span className="font-medium">Start Transaction</span>: Begins a new transaction where changes are tracked but not permanent</li>
          <li><span className="font-medium">Withdraw/Deposit</span>: Creates pending changes that aren't applied to the actual balance yet</li>
          <li><span className="font-medium">COMMIT</span>: Makes all pending changes permanent</li>
          <li><span className="font-medium">ROLLBACK</span>: Discards all pending changes, reverting to the original state</li>
        </ul>
      </div>
    </div>
  );
};