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
          title="Atomicidade"
          icon={<Atom size={24} aria-label="Atomicidade" />}
          className="border-l-4 border-l--500"
        >
          <div className="space-y-4">
            <p className="text-gray-700">
              Atomicidade garante que uma transação seja tratada como uma única unidade indivisível, que ou completa totalmente ou não acontece.
            </p>
            
            <div className="bg-violet-50 p-4 rounded-md">
              <h4 className="font-medium text-violet-700 mb-2">Exemplo no mundo real:</h4>
              <p className="text-sm text-gray-700">
                Pense em um saque de caixa eletrônico: ou você recebe o dinheiro e sua conta é debitada, ou nada acontece. Você nunca fica na situação de ser cobrado e não receber o dinheiro.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-green-50 p-3 rounded-md">
                <div className="flex items-center mb-2">
                  <Check className="text-green-600 mr-2" size={18} />
                  <h5 className="font-medium text-green-700">Sucesso</h5>
                </div>
                <p className="text-xs text-gray-700">
                  Todas as operações completam com sucesso, e as alterações são confirmadas.
                </p>
              </div>
              
              <div className="bg-red-50 p-3 rounded-md">
                <div className="flex items-center mb-2">
                  <X className="text-red-600 mr-2" size={18} />
                  <h5 className="font-medium text-red-700">Falha</h5>
                </div>
                <p className="text-xs text-gray-700">
                  Se alguma operação falhar, todas as alterações são revertidas, deixando o banco de dados inalterado.
                </p>
              </div>
            </div>
          </div>
        </AnimatedCard>
        
        <AnimatedCard
          title="Consistência"
          icon={<ShieldCheck size={24} aria-label="Consistência" />}
          className="border-l-4 border-l--500"
        >
          <div className="space-y-4">
            <p className="text-gray-700">
              Consistência garante que uma transação só possa levar o banco de dados de um estado válido para outro, mantendo todas as regras e restrições definidas.
            </p>
            
            <div className="bg-emerald-50 p-4 rounded-md">
              <h4 className="font-medium text-emerald-700 mb-2">Exemplo no mundo real:</h4>
              <p className="text-sm text-gray-700">
                Ao transferir dinheiro entre duas contas bancárias, o valor total entre ambas deve permanecer o mesmo antes e depois da transação — dinheiro não pode ser criado nem destruído.
              </p>
            </div>
            
            <div className="flex items-center justify-center p-4">
              <div className="flex flex-col items-center text-center">
                <Shield size={24} className="text-emerald-600 mb-2" aria-label="Escudo de consistência" />
                <p className="text-sm text-gray-700 max-w-xs">
                  A consistência protege a integridade dos seus dados, aplicando regras de negócio, restrições e relacionamentos entre os dados.
                </p>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatedCard
          title="Isolamento"
          icon={<Users size={24} aria-label="Isolamento" />}
          className="border-l-4 border-l--500"
        >
          <div className="space-y-4">
            <p className="text-gray-700">
              Isolamento garante que transações concorrentes sejam executadas como se fossem uma após a outra, impedindo que interfiram umas nas outras.
            </p>
            
            <div className="bg-amber-50 p-4 rounded-md">
              <h4 className="font-medium text-amber-700 mb-2">Exemplo no mundo real:</h4>
              <p className="text-sm text-gray-700">
                Imagine duas pessoas tentando reservar o último assento de um voo ao mesmo tempo. O isolamento garante que apenas uma pessoa consiga o assento, enquanto a outra recebe uma mensagem de "esgotado".
              </p>
            </div>
            
            <div className="p-4 flex justify-center">
              <div className="relative">
                <div className="flex space-x-2 mb-1">
                  <div className="w-24 h-8 bg-purple-100 rounded-md border border-purple-200 flex items-center justify-center text-xs font-medium text-purple-700">
                    Transação A
                  </div>
                  <div className="w-24 h-8 bg-green-100 rounded-md border border-green-200 flex items-center justify-center text-xs font-medium text-green-700">
                    Transação B
                  </div>
                </div>
                
                <RadioTower size={20} className="text-amber-600 absolute -left-6 top-12" aria-label="Transmissão de rádio" />
                
                <div className="pl-6 space-y-2 mt-4">
                  <div className="h-1 w-full bg-purple-200 rounded"></div>
                  <div className="h-1 w-full bg-green-200 rounded"></div>
                </div>
                
                <p className="text-xs text-center mt-2 text-gray-600">
                  Transações rodam simultaneamente, mas com o mesmo resultado como se fossem sequenciais.
                </p>
              </div>
            </div>
          </div>
        </AnimatedCard>
        
        <AnimatedCard
          title="Durabilidade"
          icon={<Database size={24} aria-label="Durabilidade" />}
          className="border-l-4 border-l--500"
        >
          <div className="space-y-4">
            <p className="text-gray-700">
              Durabilidade garante que, uma vez que uma transação tenha sido confirmada, ela permanecerá confirmada mesmo em caso de falha no sistema, como queda de energia ou travamento.
            </p>
            
            <div className="bg-purple-50 p-4 rounded-md">
              <h4 className="font-medium text-purple-700 mb-2">Exemplo no mundo real:</h4>
              <p className="text-sm text-gray-700">
                Quando você faz uma compra online e vê "Pedido Confirmado," as informações do pedido persistem mesmo que o site trave imediatamente após.
              </p>
            </div>
            
            <div className="flex items-center justify-center p-4">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="flex items-center">
                  <Zap size={20} className="text-yellow-500 mr-1" aria-label="Raio" />
                  <ShieldAlert size={24} className="text-blue-600" aria-label="Escudo de alerta" />
                </div>
                <p className="text-sm text-gray-700 max-w-xs">
                  Mesmo em caso de falhas do sistema, transações confirmadas são armazenadas permanentemente em memória não volátil (como discos rígidos) e podem ser recuperadas.
                </p>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};
