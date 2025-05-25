import React from 'react';
import { 
  Atom, Shield, Users, Database, Check, X, 
  Zap, RadioTower, ShieldAlert, ShieldCheck 
} from 'lucide-react';
import { AnimatedCard } from './AnimatedCard';

export const AcidProperties = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatedCard
          title="Atomicity"
          icon={<Atom size={24} />}
          className="border-l-4 border-l-violet-500"
        >
          <div className="space-y-4">
            <p className="text-gray-700">
              Atomicity ensures that a transaction is treated as a single, indivisible unit, which either completes entirely or doesn't happen at all.
            </p>
            
            <div className="bg-violet-50 p-4 rounded-md">
              <h4 className="font-medium text-violet-700 mb-2">Real-world example:</h4>
              <p className="text-sm text-gray-700">
                Think of an ATM withdrawal: either you get your money and your account is debited, or neither happens. You never get a situation where you're charged but don't receive cash.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-green-50 p-3 rounded-md">
                <div className="flex items-center mb-2">
                  <Check className="text-green-600 mr-2" size={18} />
                  <h5 className="font-medium text-green-700">Success</h5>
                </div>
                <p className="text-xs text-gray-700">
                  All operations complete successfully, and changes are committed.
                </p>
              </div>
              
              <div className="bg-red-50 p-3 rounded-md">
                <div className="flex items-center mb-2">
                  <X className="text-red-600 mr-2" size={18} />
                  <h5 className="font-medium text-red-700">Failure</h5>
                </div>
                <p className="text-xs text-gray-700">
                  If any operation fails, all changes are rolled back, leaving the database unchanged.
                </p>
              </div>
            </div>
          </div>
        </AnimatedCard>
        
        <AnimatedCard
          title="Consistency"
          icon={<ShieldCheck size={24} />}
          className="border-l-4 border-l-emerald-500"
        >
          <div className="space-y-4">
            <p className="text-gray-700">
              Consistency ensures that a transaction can only bring the database from one valid state to another, maintaining all predefined rules and constraints.
            </p>
            
            <div className="bg-emerald-50 p-4 rounded-md">
              <h4 className="font-medium text-emerald-700 mb-2">Real-world example:</h4>
              <p className="text-sm text-gray-700">
                When transferring money between two bank accounts, the total amount across both accounts must remain the same before and after the transaction—money can't be created or destroyed.
              </p>
            </div>
            
            <div className="flex items-center justify-center p-4">
              <div className="flex flex-col items-center text-center">
                <Shield size={24} className="text-emerald-600 mb-2" />
                <p className="text-sm text-gray-700 max-w-xs">
                  Consistency protects the integrity of your data by enforcing business rules, constraints, and relationships between data elements.
                </p>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatedCard
          title="Isolation"
          icon={<Users size={24} />}
          className="border-l-4 border-l-amber-500"
        >
          <div className="space-y-4">
            <p className="text-gray-700">
              Isolation ensures that concurrent transactions execute as if they were running one after another in sequence, preventing them from interfering with each other.
            </p>
            
            <div className="bg-amber-50 p-4 rounded-md">
              <h4 className="font-medium text-amber-700 mb-2">Real-world example:</h4>
              <p className="text-sm text-gray-700">
                Imagine two people trying to book the last seat on a flight simultaneously. Isolation ensures only one person gets the seat, while the other receives a "sold out" message.
              </p>
            </div>
            
            <div className="p-4 flex justify-center">
              <div className="relative">
                <div className="flex space-x-2 mb-1">
                  <div className="w-24 h-8 bg-blue-100 rounded-md border border-blue-200 flex items-center justify-center text-xs font-medium text-blue-700">
                    Transaction A
                  </div>
                  <div className="w-24 h-8 bg-green-100 rounded-md border border-green-200 flex items-center justify-center text-xs font-medium text-green-700">
                    Transaction B
                  </div>
                </div>
                
                <RadioTower size={20} className="text-amber-600 absolute -left-6 top-12" />
                
                <div className="pl-6 space-y-2 mt-4">
                  <div className="h-1 w-full bg-blue-200 rounded"></div>
                  <div className="h-1 w-full bg-green-200 rounded"></div>
                </div>
                
                <p className="text-xs text-center mt-2 text-gray-600">
                  Transactions run concurrently but with the same result as if they ran sequentially
                </p>
              </div>
            </div>
          </div>
        </AnimatedCard>
        
        <AnimatedCard
          title="Durability"
          icon={<Database size={24} />}
          className="border-l-4 border-l-blue-500"
        >
          <div className="space-y-4">
            <p className="text-gray-700">
              Durability guarantees that once a transaction has been committed, it will remain committed even in the case of system failure, such as a power outage or crash.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium text-blue-700 mb-2">Real-world example:</h4>
              <p className="text-sm text-gray-700">
                When you make an online purchase and see "Order Confirmed," your order information will persist even if the website crashes immediately afterward.
              </p>
            </div>
            
            <div className="flex items-center justify-center p-4">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="flex items-center">
                  <Zap size={20} className="text-yellow-500 mr-1" />
                  <ShieldAlert size={24} className="text-blue-600" />
                </div>
                <p className="text-sm text-gray-700 max-w-xs">
                  Even in case of system failures, committed transactions are permanently stored in non-volatile memory (like hard drives) and can be recovered.
                </p>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};