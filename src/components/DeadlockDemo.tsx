import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, AlertTriangle } from 'lucide-react';

type Transaction = {
  id: string;
  name: string;
  color: string;
  locksHeld: string[];
  locksWaiting: string[];
  status: 'running' | 'waiting' | 'deadlocked' | 'completed';
  position: number;
  steps: {
    action: 'acquire' | 'release' | 'process';
    resource?: string;
    duration?: number;
  }[];
  currentStep: number;
}

type Resource = {
  id: string;
  name: string;
  lockedBy: string | null;
  waitingTransactions: string[];
}

export const DeadlockDemo = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'tx1',
      name: 'Transação 1',
      color: 'blue',
      locksHeld: [],
      locksWaiting: [],
      status: 'running',
      position: 0,
      steps: [
        { action: 'acquire', resource: 'res1' },
        { action: 'process', duration: 2 },
        { action: 'acquire', resource: 'res2' },
        { action: 'process', duration: 3 },
        { action: 'release', resource: 'res1' },
        { action: 'release', resource: 'res2' },
      ],
      currentStep: 0
    },
    {
      id: 'tx2',
      name: 'Transação 2',
      color: 'green',
      locksHeld: [],
      locksWaiting: [],
      status: 'running',
      position: 0,
      steps: [
        { action: 'acquire', resource: 'res2' },
        { action: 'process', duration: 2 },
        { action: 'acquire', resource: 'res1' },
        { action: 'process', duration: 3 },
        { action: 'release', resource: 'res2' },
        { action: 'release', resource: 'res1' },
      ],
      currentStep: 0
    }
  ]);
  
  const [resources, setResources] = useState<Resource[]>([
    { id: 'res1', name: 'Conta A', lockedBy: null, waitingTransactions: [] },
    { id: 'res2', name: 'Conta B', lockedBy: null, waitingTransactions: [] }
  ]);
  
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [log, setLog] = useState<string[]>([]);
  const [deadlockDetected, setDeadlockDetected] = useState(false);
  
  const addToLog = (message: string) => {
    setLog(prev => [message, ...prev].slice(0, 15));
  };
  
  const resetDemo = () => {
    setTransactions([
      {
        id: 'tx1',
        name: 'Transação 1',
        color: 'blue',
        locksHeld: [],
        locksWaiting: [],
        status: 'running',
        position: 0,
        steps: [
          { action: 'acquire', resource: 'res1' },
          { action: 'process', duration: 2 },
          { action: 'acquire', resource: 'res2' },
          { action: 'process', duration: 3 },
          { action: 'release', resource: 'res1' },
          { action: 'release', resource: 'res2' },
        ],
        currentStep: 0
      },
      {
        id: 'tx2',
        name: 'Transação 2',
        color: 'green',
        locksHeld: [],
        locksWaiting: [],
        status: 'running',
        position: 0,
        steps: [
          { action: 'acquire', resource: 'res2' },
          { action: 'process', duration: 2 },
          { action: 'acquire', resource: 'res1' },
          { action: 'process', duration: 3 },
          { action: 'release', resource: 'res2' },
          { action: 'release', resource: 'res1' },
        ],
        currentStep: 0
      }
    ]);
    setResources([
      { id: 'res1', name: 'Conta A', lockedBy: null, waitingTransactions: [] },
      { id: 'res2', name: 'Conta B', lockedBy: null, waitingTransactions: [] }
    ]);
    setIsRunning(false);
    setLog([]);
    setDeadlockDetected(false);
  };
  
  const checkForDeadlock = () => {
    // Verifica se existe condição de espera circular
    let hasDeadlock = false;
    
    // Se ambas as transações estiverem esperando e cada uma estiver esperando por recurso detido pela outra
    const waitingTransactions = transactions.filter(tx => tx.status === 'waiting');
    
    if (waitingTransactions.length >= 2) {
      const tx1 = waitingTransactions[0];
      const tx2 = waitingTransactions[1];
      
      const tx1WaitingFor = tx1.locksWaiting[0];
      const tx2WaitingFor = tx2.locksWaiting[0];
      
      // Verifica se tx1 está esperando por recurso detido por tx2
      const res1 = resources.find(r => r.id === tx1WaitingFor);
      // Verifica se tx2 está esperando por recurso detido por tx1
      const res2 = resources.find(r => r.id === tx2WaitingFor);
      
      if (res1 && res2 && res1.lockedBy === tx2.id && res2.lockedBy === tx1.id) {
        hasDeadlock = true;
      }
    }
    
    if (hasDeadlock && !deadlockDetected) {
      setDeadlockDetected(true);
      addToLog('❗ DEADLOCK DETECTADO: Condição de espera circular encontrada');
      
      // Marca transações como deadlocked
      setTransactions(prev => 
        prev.map(tx => 
          tx.status === 'waiting' ? { ...tx, status: 'deadlocked' } : tx
        )
      );
      
      setIsRunning(false);
    }
    
    return hasDeadlock;
  };
  
  const progressTransactions = () => {
    let newTransactions = [...transactions];
    let newResources = [...resources];
    let madeProgress = false;
    
    // Processa cada transação
    for (let i = 0; i < newTransactions.length; i++) {
      const tx = newTransactions[i];
      
      // Pula transações concluídas ou em deadlock
      if (tx.status === 'completed' || tx.status === 'deadlocked') {
        continue;
      }
      
      // Se transação estiver esperando, verifica se pode adquirir recurso
      if (tx.status === 'waiting') {
        const resourceId = tx.locksWaiting[0];
        const resource = newResources.find(r => r.id === resourceId);
        
        if (resource && resource.lockedBy === null) {
          // Recurso disponível, adquire-o
          resource.lockedBy = tx.id;
          resource.waitingTransactions = resource.waitingTransactions.filter(id => id !== tx.id);
          
          tx.locksHeld.push(resourceId);
          tx.locksWaiting = [];
          tx.status = 'running';
          
          addToLog(`${tx.name} adquiriu bloqueio em ${resource.name}`);
          madeProgress = true;
        }
        continue;
      }
      
      // Transação está executando, processa passo atual
      if (tx.currentStep < tx.steps.length) {
        const step = tx.steps[tx.currentStep];
        
        if (step.action === 'acquire') {
          const resourceId = step.resource!;
          const resource = newResources.find(r => r.id === resourceId);
          
          if (resource) {
            if (resource.lockedBy === null) {
              // Recurso disponível, adquire-o
              resource.lockedBy = tx.id;
              tx.locksHeld.push(resourceId);
              tx.currentStep++;
              
              addToLog(`${tx.name} adquiriu bloqueio em ${resource.name}`);
              madeProgress = true;
            } else {
              // Recurso está bloqueado por outra transação, espera
              tx.status = 'waiting';
              tx.locksWaiting.push(resourceId);
              
              if (!resource.waitingTransactions.includes(tx.id)) {
                resource.waitingTransactions.push(tx.id);
              }
              
              addToLog(`${tx.name} está esperando por ${resource.name}`);
              madeProgress = true;
            }
          }
        } else if (step.action === 'process') {
          // Simulando tempo de processamento
          tx.position += 1;
          if (tx.position >= (step.duration || 1)) {
            tx.position = 0;
            tx.currentStep++;
            madeProgress = true;
          }
        } else if (step.action === 'release') {
          const resourceId = step.resource!;
          const resource = newResources.find(r => r.id === resourceId);
          
          if (resource && resource.lockedBy === tx.id) {
            // Libera o recurso
            resource.lockedBy = null;
            tx.locksHeld = tx.locksHeld.filter(id => id !== resourceId);
            tx.currentStep++;
            
            addToLog(`${tx.name} liberou bloqueio em ${resource.name}`);
            madeProgress = true;
          }
        }
      } else {
        // Passos concluídos
        tx.status = 'completed';
        addToLog(`${tx.name} terminou a transação`);
        madeProgress = true;
      }
    }
    
    setTransactions(newTransactions);
    setResources(newResources);
    
    if (!madeProgress) {
      addToLog('Nenhuma progressão possível no passo atual.');
    }
    
    checkForDeadlock();
  };
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && !deadlockDetected) {
      interval = setInterval(() => {
        progressTransactions();
      }, speed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, speed, transactions, resources, deadlockDetected]);
  
  return (
    <div className="p-4 max-w-3xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-4">Simulador de DeadLock</h1>
      <p className="mb-6">
        Esta demonstração simula duas transações que tentam adquirir bloqueios em duas contas (recursos) e mostra como pode ocorrer um deadlock.
      </p>
      
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          aria-label={isRunning ? 'Pausar simulação' : 'Iniciar simulação'}
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          {isRunning ? 'Pausar' : 'Iniciar'}
        </button>
        <button
          onClick={resetDemo}
          className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          aria-label="Resetar simulação"
        >
          <RotateCcw size={20} />
          Resetar
        </button>
        <label className="flex items-center gap-2 ml-auto">
          Velocidade:
          <input
            type="range"
            min={200}
            max={2000}
            step={100}
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            className="cursor-pointer"
            aria-label="Controle de velocidade"
          />
          <span>{(speed / 1000).toFixed(1)}s</span>
        </label>
      </div>
      
      <div className="mb-6 grid grid-cols-2 gap-6">
        {transactions.map(tx => (
          <div
            key={tx.id}
            className={`p-4 border rounded shadow ${tx.status === 'deadlocked' ? 'border-red-600 bg-red-100' : 'border-gray-300'} `}
            aria-live="polite"
          >
            <h2 className="font-semibold mb-2" style={{ color: tx.color }}>
              {tx.name} {tx.status === 'deadlocked' && <AlertTriangle size={18} className="inline text-red-600" />}
            </h2>
            <p>Status: <strong>{tx.status === 'running' ? 'Executando' : tx.status === 'waiting' ? 'Esperando' : tx.status === 'deadlocked' ? 'Deadlock' : 'Concluído'}</strong></p>
            <p>Bloqueios adquiridos: {tx.locksHeld.length > 0 ? tx.locksHeld.map(id => resources.find(r => r.id === id)?.name).join(', ') : 'Nenhum'}</p>
            <p>Bloqueios aguardando: {tx.locksWaiting.length > 0 ? tx.locksWaiting.map(id => resources.find(r => r.id === id)?.name).join(', ') : 'Nenhum'}</p>
          </div>
        ))}
      </div>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Recursos</h3>
        <ul>
          {resources.map(res => (
            <li key={res.id} className="mb-1">
              <strong>{res.name}:</strong> {res.lockedBy ? `Bloqueado por ${transactions.find(tx => tx.id === res.lockedBy)?.name}` : 'Disponível'}
              {res.waitingTransactions.length > 0 && (
                <span> (Esperando: {res.waitingTransactions.map(id => transactions.find(tx => tx.id === id)?.name).join(', ')})</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6 max-h-48 overflow-y-auto border rounded p-2 bg-gray-50">
        <h3 className="font-semibold mb-2">Log da Simulação</h3>
        <ul className="text-sm font-mono space-y-1">
          {log.map((entry, idx) => (
            <li key={idx}>{entry}</li>
          ))}
        </ul>
      </div>
      
      {deadlockDetected && (
        <div className="p-4 bg-red-100 border border-red-400 rounded text-red-700 font-semibold" role="alert" aria-live="assertive">
          ❗ Deadlock detectado! A simulação foi pausada.
        </div>
      )}
    </div>
  );
};
