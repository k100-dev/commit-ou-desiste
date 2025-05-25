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
    addToHistory('Transação iniciada');
  };

  const withdraw = (amount: number) => {
    if (!transactionActive) {
      addToHistory('Erro: Nenhuma transação ativa para sacar');
      return;
    }
    setPendingChanges(prev => prev - amount);
    addToHistory(`Pendente: Saque de R$${amount}`);
  };

  const deposit = (amount: number) => {
    if (!transactionActive) {
      addToHistory('Erro: Nenhuma transação ativa para depositar');
      return;
    }
    setPendingChanges(prev => prev + amount);
    addToHistory(`Pendente: Depósito de R$${amount}`);
  };

  const commit = () => {
    if (!transactionActive) {
      addToHistory('Erro: Nenhuma transação ativa para confirmar');
      return;
    }
    setBalance(prev => prev + pendingChanges);
    setTransactionActive(false);
    addToHistory(`Transação CONFIRMADA: Saldo alterado em R$${pendingChanges}`);
    setPendingChanges(0);
  };

  const rollback = () => {
    if (!transactionActive) {
      addToHistory('Erro: Nenhuma transação ativa para reverter');
      return;
    }
    addToHistory('Transação REVERTIDA: Alterações descartadas');
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
      <h3 className="text-xl font-bold mb-4 text-purple-600">Simulador COMMIT & ROLLBACK</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-6 bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Status da Conta</h4>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Saldo Atual:</p>
              <p className="text-2xl font-bold text-purple-700">R${balance.toFixed(2)}</p>
            </div>

            {transactionActive && (
              <div className="mb-4 border-t pt-4 border-purple-200">
                <p className="text-sm text-gray-600">Alterações Pendentes:</p>
                <p className={`text-xl font-bold ${pendingChanges >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {pendingChanges >= 0 ? '+' : ''}{pendingChanges.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 mt-1">Após Commit:</p>
                <p className="text-lg font-semibold">R${(balance + pendingChanges).toFixed(2)}</p>
              </div>
            )}

            <div className={`p-2 rounded-md ${transactionActive ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
              <p className="text-sm font-medium">
                {transactionActive ? 'Transação em andamento...' : 'Nenhuma transação ativa'}
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
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              } transition-colors flex items-center justify-center gap-2`}
            >
              <DatabaseBackup size={18} />
              Iniciar Transação
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
                Sacar R$100
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
                Depositar R$50
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
              Resetar Simulação
            </button>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Log da Transação</h4>
          <div className="border border-slate-200 rounded-md bg-white h-[350px] overflow-y-auto">
            {history.length === 0 ? (
              <p className="text-gray-500 p-4 text-center italic">Nenhum histórico de transações. Inicie uma transação!</p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {history.map((entry, index) => (
                  <li key={index} className="px-4 py-2 text-sm">
                    {entry.includes('CONFIRMADA') ? (
                      <span className="text-emerald-600 font-medium">{entry}</span>
                    ) : entry.includes('REVERTIDA') ? (
                      <span className="text-amber-600 font-medium">{entry}</span>
                    ) : entry.includes('Erro') ? (
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

      <div className="mt-6 bg-purple-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">O que está acontecendo?</h4>
        <p className="text-sm text-gray-700 mb-2">
          Esta simulação demonstra transações em banco de dados com operações de COMMIT e ROLLBACK:
        </p>
        <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
          <li><span className="font-medium">Iniciar Transação</span>: Começa uma nova transação onde alterações são registradas, mas não permanentes</li>
          <li><span className="font-medium">Saque/Depósito</span>: Cria alterações pendentes que ainda não afetam o saldo real</li>
          <li><span className="font-medium">COMMIT</span>: Torna todas as alterações pendentes permanentes</li>
          <li><span className="font-medium">ROLLBACK</span>: Descarta todas as alterações pendentes, voltando ao estado original</li>
        </ul>
      </div>
    </div>
  );
};
