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
      name: 'Transaction 1',
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
      name: 'Transaction 2',
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
    { id: 'res1', name: 'Account A', lockedBy: null, waitingTransactions: [] },
    { id: 'res2', name: 'Account B', lockedBy: null, waitingTransactions: [] }
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
        name: 'Transaction 1',
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
        name: 'Transaction 2',
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
      { id: 'res1', name: 'Account A', lockedBy: null, waitingTransactions: [] },
      { id: 'res2', name: 'Account B', lockedBy: null, waitingTransactions: [] }
    ]);
    setIsRunning(false);
    setLog([]);
    setDeadlockDetected(false);
  };
  
  const checkForDeadlock = () => {
    // Check if there's a circular wait condition
    let hasDeadlock = false;
    
    // If both transactions are waiting and each one is waiting for a resource held by the other
    const waitingTransactions = transactions.filter(tx => tx.status === 'waiting');
    
    if (waitingTransactions.length >= 2) {
      const tx1 = waitingTransactions[0];
      const tx2 = waitingTransactions[1];
      
      const tx1WaitingFor = tx1.locksWaiting[0];
      const tx2WaitingFor = tx2.locksWaiting[0];
      
      // Check if tx1 is waiting for a resource held by tx2
      const res1 = resources.find(r => r.id === tx1WaitingFor);
      // Check if tx2 is waiting for a resource held by tx1
      const res2 = resources.find(r => r.id === tx2WaitingFor);
      
      if (res1 && res2 && res1.lockedBy === tx2.id && res2.lockedBy === tx1.id) {
        hasDeadlock = true;
      }
    }
    
    if (hasDeadlock && !deadlockDetected) {
      setDeadlockDetected(true);
      addToLog('❗ DEADLOCK DETECTED: Circular wait condition found');
      
      // Mark transactions as deadlocked
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
    
    // Process each transaction
    for (let i = 0; i < newTransactions.length; i++) {
      const tx = newTransactions[i];
      
      // Skip completed or deadlocked transactions
      if (tx.status === 'completed' || tx.status === 'deadlocked') {
        continue;
      }
      
      // If transaction is waiting, check if it can acquire the resource
      if (tx.status === 'waiting') {
        const resourceId = tx.locksWaiting[0];
        const resource = newResources.find(r => r.id === resourceId);
        
        if (resource && resource.lockedBy === null) {
          // Resource is now available, acquire it
          resource.lockedBy = tx.id;
          resource.waitingTransactions = resource.waitingTransactions.filter(id => id !== tx.id);
          
          tx.locksHeld.push(resourceId);
          tx.locksWaiting = [];
          tx.status = 'running';
          
          addToLog(`${tx.name} acquired lock on ${resource.name}`);
          madeProgress = true;
        }
        continue;
      }
      
      // Transaction is running, process current step
      if (tx.currentStep < tx.steps.length) {
        const step = tx.steps[tx.currentStep];
        
        if (step.action === 'acquire') {
          const resourceId = step.resource!;
          const resource = newResources.find(r => r.id === resourceId);
          
          if (resource) {
            if (resource.lockedBy === null) {
              // Resource is available, acquire it
              resource.lockedBy = tx.id;
              tx.locksHeld.push(resourceId);
              tx.currentStep++;
              
              addToLog(`${tx.name} acquired lock on ${resource.name}`);
              madeProgress = true;
            } else {
              // Resource is locked by another transaction, wait for it
              tx.status = 'waiting';
              tx.locksWaiting.push(resourceId);
              
              if (!resource.waitingTransactions.includes(tx.id)) {
                resource.waitingTransactions.push(tx.id);
              }
              
              addToLog(`${tx.name} is waiting for ${resource.name}`);
              madeProgress = true;
            }
          }
        } else if (step.action === 'process') {
          // Simulating processing time
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
            // Release the resource
            resource.lockedBy = null;
            tx.locksHeld = tx.locksHeld.filter(id => id !== resourceId);
            tx.currentStep++;
            
            addToLog(`${tx.name} released lock on ${resource.name}`);
            madeProgress = true;
          }
        }
      } else {
        // Transaction completed all steps
        tx.status = 'completed';
        addToLog(`${tx.name} completed successfully`);
        madeProgress = true;
      }
    }
    
    setTransactions(newTransactions);
    setResources(newResources);
    
    // Check if all transactions are either completed or deadlocked
    const allDone = newTransactions.every(tx => 
      tx.status === 'completed' || tx.status === 'deadlocked'
    );
    
    if (allDone) {
      setIsRunning(false);
      if (newTransactions.some(tx => tx.status === 'deadlocked')) {
        addToLog('Simulation stopped due to deadlock');
      } else {
        addToLog('All transactions completed successfully');
      }
    }
    
    // If no transaction made progress, check for deadlock
    if (!madeProgress && isRunning) {
      checkForDeadlock();
    }
  };
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        progressTransactions();
      }, speed);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, transactions, resources, speed]);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-blue-600">Deadlock Simulator</h3>
        
        <div className="flex space-x-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            disabled={deadlockDetected || transactions.every(tx => tx.status === 'completed')}
            className={`p-2 rounded-md ${
              isRunning 
                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            } transition-colors`}
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          <button
            onClick={resetDemo}
            className="p-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>
      
      {deadlockDetected && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
          <AlertTriangle className="text-red-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="font-semibold text-red-700">Deadlock Detected!</h4>
            <p className="text-sm text-red-600">
              A circular wait condition has been detected where each transaction is waiting for a resource held by another, creating a standstill.
            </p>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-semibold mb-4">Transactions</h4>
          <div className="space-y-4">
            {transactions.map(tx => (
              <div 
                key={tx.id} 
                className={`border rounded-md p-4 ${
                  tx.status === 'deadlocked' 
                    ? 'border-red-300 bg-red-50' 
                    : tx.status === 'completed'
                    ? 'border-green-300 bg-green-50'
                    : tx.status === 'waiting'
                    ? 'border-amber-300 bg-amber-50'
                    : `border-${tx.color}-300 bg-${tx.color}-50`
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h5 className={`font-medium ${
                    tx.status === 'deadlocked' 
                      ? 'text-red-700' 
                      : tx.status === 'completed'
                      ? 'text-green-700'
                      : tx.status === 'waiting'
                      ? 'text-amber-700'
                      : `text-${tx.color}-700`
                  }`}>
                    {tx.name}
                  </h5>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    tx.status === 'deadlocked' 
                      ? 'bg-red-200 text-red-800' 
                      : tx.status === 'completed'
                      ? 'bg-green-200 text-green-800'
                      : tx.status === 'waiting'
                      ? 'bg-amber-200 text-amber-800'
                      : 'bg-blue-200 text-blue-800'
                  }`}>
                    {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                  </span>
                </div>
                
                <div className="text-sm">
                  <div className="mb-1">
                    <span className="text-gray-600">Locks held: </span>
                    {tx.locksHeld.length > 0 
                      ? tx.locksHeld.map(lockId => {
                          const resource = resources.find(r => r.id === lockId);
                          return resource ? resource.name : lockId;
                        }).join(', ')
                      : 'None'
                    }
                  </div>
                  
                  <div>
                    <span className="text-gray-600">Waiting for: </span>
                    {tx.locksWaiting.length > 0 
                      ? tx.locksWaiting.map(lockId => {
                          const resource = resources.find(r => r.id === lockId);
                          return resource ? resource.name : lockId;
                        }).join(', ')
                      : 'None'
                    }
                  </div>
                </div>
                
                {tx.status !== 'completed' && tx.status !== 'deadlocked' && tx.currentStep < tx.steps.length && (
                  <div className="mt-2">
                    <div className="text-xs text-gray-600 mb-1">
                      {tx.steps[tx.currentStep].action === 'acquire' 
                        ? `Trying to acquire ${resources.find(r => r.id === tx.steps[tx.currentStep].resource)?.name}`
                        : tx.steps[tx.currentStep].action === 'release'
                        ? `Will release ${resources.find(r => r.id === tx.steps[tx.currentStep].resource)?.name}`
                        : 'Processing data...'}
                    </div>
                    
                    {tx.steps[tx.currentStep].action === 'process' && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ 
                            width: `${(tx.position / (tx.steps[tx.currentStep].duration || 1)) * 100}%` 
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Resources</h4>
          <div className="space-y-4">
            {resources.map(resource => {
              const lockingTx = transactions.find(tx => tx.id === resource.lockedBy);
              
              return (
                <div 
                  key={resource.id} 
                  className={`border rounded-md p-4 ${
                    resource.lockedBy 
                      ? lockingTx 
                        ? `border-${lockingTx.color}-300 bg-${lockingTx.color}-50` 
                        : 'border-gray-300 bg-gray-50'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <h5 className="font-medium mb-2">{resource.name}</h5>
                  
                  <div className="text-sm">
                    <div className="mb-1">
                      <span className="text-gray-600">Status: </span>
                      {resource.lockedBy 
                        ? <span className="text-red-600 font-medium">Locked</span>
                        : <span className="text-green-600 font-medium">Available</span>
                      }
                    </div>
                    
                    {resource.lockedBy && (
                      <div className="mb-1">
                        <span className="text-gray-600">Locked by: </span>
                        <span className="font-medium">{
                          transactions.find(tx => tx.id === resource.lockedBy)?.name || resource.lockedBy
                        }</span>
                      </div>
                    )}
                    
                    {resource.waitingTransactions.length > 0 && (
                      <div>
                        <span className="text-gray-600">Waiting transactions: </span>
                        <span className="font-medium">{
                          resource.waitingTransactions.map(txId => 
                            transactions.find(tx => tx.id === txId)?.name || txId
                          ).join(', ')
                        }</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Transaction Log</h4>
            <div className="border border-gray-200 rounded-md bg-gray-50 h-[200px] overflow-y-auto">
              {log.length === 0 ? (
                <p className="text-gray-500 p-3 text-center italic">No activity yet. Start the simulation!</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {log.map((entry, index) => (
                    <li key={index} className="px-3 py-2 text-sm">
                      {entry.includes('DEADLOCK') ? (
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
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">What's Happening?</h4>
        <p className="text-sm text-gray-700 mb-2">
          This simulation demonstrates a classic deadlock scenario:
        </p>
        <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
          <li><span className="font-medium">Transaction 1</span> acquires Account A, then tries to acquire Account B</li>
          <li><span className="font-medium">Transaction 2</span> acquires Account B, then tries to acquire Account A</li>
          <li>Each transaction is holding a resource the other needs, creating a <span className="font-medium">circular wait</span> condition</li>
          <li>Without intervention, both transactions will wait indefinitely—this is a deadlock</li>
        </ul>
      </div>
    </div>
  );
};