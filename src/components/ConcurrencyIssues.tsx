import React, { useState } from "react";
import { AlertTriangle, RefreshCw, Ghost } from "lucide-react";
import { AnimatedCard } from "./AnimatedCard";

export const ConcurrencyIssues = () => {
  const [activeTab, setActiveTab] = useState("dirty-read");

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 px-4 font-medium text-sm ${
              activeTab === "dirty-read"
                ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("dirty-read")}
          >
            Leitura Suja
          </button>
          <button
            className={`flex-1 py-3 px-4 font-medium text-sm ${
              activeTab === "non-repeatable"
                ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("non-repeatable")}
          >
           Leitura Não Repetida
          </button>
          <button
            className={`flex-1 py-3 px-4 font-medium text-sm ${
              activeTab === "phantom"
                ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("phantom")}
          >
            Leitura Fantasma
          </button>
        </div>

        <div className="p-6">
          {activeTab === "dirty-read" && (
            <div className="space-y-4">
              <div className="flex items-start mb-4">
                <AlertTriangle
                  className="text-amber-500 mr-3 flex-shrink-0 mt-1"
                  size={20}
                />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Leitura Suja</h3>
                  <p className="text-gray-700">
               Uma leitura suja ocorre quando uma transação lê dados que foram modificados por outra transação, mas ainda não foram confirmados.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-md">
                <h4 className="font-medium text-amber-700 mb-2">
                  Exemplo REAL:
                </h4>
                <p className="text-sm text-gray-700">
                 Imagine que você está verificando o saldo da sua conta bancária enquanto um depósito está sendo processado. Você vê o novo saldo mais alto, mas a transação de depósito falha e é desfeita. Você acabou de experimentar uma “leitura suja” de dados que nunca foram realmente confirmados.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b border-gray-200">
                  <h4 className="font-medium text-gray-700">
                    Cenário de Leitura Suja
                  </h4>
                </div>
                <div className="p-4">
                  <div className="flex flex-col space-y-4">
                    <div className="flex space-x-6">
                      <div className="w-1/2">
                        <div className="text-center mb-2 font-medium text-blue-600">
                          Transação A
                        </div>
                        <div className="border border-blue-200 rounded-md bg-blue-50 p-3 text-sm space-y-2">
                          <div className="bg-white p-2 rounded border border-blue-100">
                            BEGIN TRANSACTION;
                          </div>
                          <div className="bg-white p-2 rounded border border-blue-100">
                            UPDATE accounts SET balance = balance - 100 WHERE id
                            = 1;
                            <span className="block text-xs text-gray-500 mt-1">
                              /* Saldo da conta agora é $900 */
                            </span>
                          </div>
                          <div className="bg-white p-2 rounded border border-blue-100 opacity-50">
                            --  Processando... --
                          </div>
                        </div>
                      </div>

                      <div className="w-1/2">
                        <div className="text-center mb-2 font-medium text-green-600">
                          Transação B
                        </div>
                        <div className="border border-green-200 rounded-md bg-green-50 p-3 text-sm space-y-2">
                          <div className="bg-white p-2 rounded border border-green-100">
                            BEGIN TRANSACTION;
                          </div>
                          <div className="bg-white p-2 rounded border border-green-100">
                            SELECT balance FROM accounts WHERE id = 1;
                            <span className="block text-xs text-gray-500 mt-1">
                              /* Lê $900 (Info suja) */
                            </span>
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
                          ROLLBACK; -- Transação A falha e da ROLLBACK
                          <span className="block text-xs text-gray-500 mt-1">
                            /* Saldo da conta é revertido $1000 */
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 p-3 rounded-md text-sm">
                      <p className="text-red-700">
                        <strong>Problema:</strong> Transação B lê e da o commit
                        de saldo de $900, mas o saldo verdadeiro é $1000 por
                        conta do ROLLBACK da Transação A.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "non-repeatable" && (
            <div className="space-y-4">
              <div className="flex items-start mb-4">
                <RefreshCw
                  className="text-amber-500 mr-3 flex-shrink-0 mt-1"
                  size={20}
                />
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                   Leitura Não Repetida
                  </h3>
                  <p className="text-gray-700">
                   Uma leitura não repetível ocorre quando uma transação lê a mesma linha duas vezes e obtém valores diferentes porque outra transação confirmada modificou os dados entre as leituras.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-md">
                <h4 className="font-medium text-amber-700 mb-2">
                  Exemplo REAL:
                </h4>
                <p className="text-sm text-gray-700">
             Imagine que você está gerando um relatório que lê os dados do mesmo cliente duas vezes. Entre essas leituras, outro usuário atualiza as informações do cliente. Seu relatório agora contém dados inconsistentes, mostrando valores diferentes para o mesmo cliente.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b border-gray-200">
                  <h4 className="font-medium text-gray-700">
                   Cenário de Leitura Não Repetida
                  </h4>
                </div>
                <div className="p-4">
                  <div className="flex flex-col space-y-4">
                    <div className="flex space-x-6">
                      <div className="w-1/2">
                        <div className="text-center mb-2 font-medium text-blue-600">
                          Transação A
                        </div>
                        <div className="border border-blue-200 rounded-md bg-blue-50 p-3 text-sm space-y-2">
                          <div className="bg-white p-2 rounded border border-blue-100">
                            BEGIN TRANSACTION;
                          </div>
                          <div className="bg-white p-2 rounded border border-blue-100">
                            SELECT price FROM products WHERE id = 101;
                            <span className="block text-xs text-gray-500 mt-1">
                              /* Lê o preço: $10.00 */
                            </span>
                          </div>
                          <div className="bg-white p-2 rounded border border-blue-100 opacity-50">
                            -- Outras Operações... --
                          </div>
                        </div>
                      </div>

                      <div className="w-1/2">
                        <div className="text-center mb-2 font-medium text-green-600">
                          Transação B
                        </div>
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
                          <span className="block text-xs text-gray-500 mt-1">
                            /* Agora lê o preço: $12.00 */
                          </span>
                        </div>
                        <div className="bg-white p-2 rounded border border-blue-100">
                          COMMIT;
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 p-3 rounded-md text-sm">
                      <p className="text-red-700">
                        <strong>Problema:</strong> Transação A lê valores
                        diferentes em uma mesma transação em andamento, o que
                        ocasiona em inconsistencias e problemas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "phantom" && (
            <div className="space-y-4">
              <div className="flex items-start mb-4">
                <Ghost
                  className="text-amber-500 mr-3 flex-shrink-0 mt-1"
                  size={20}
                />
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Leitura Fantasma
                  </h3>
                  <p className="text-gray-700">
                  Uma leitura fantasma ocorre quando uma transação executa novamente uma consulta que retorna um conjunto de linhas que satisfazem uma condição de busca e encontra que um conjunto diferente de linhas satisfaz a condição em relação à execução anterior.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-md">
                <h4 className="font-medium text-amber-700 mb-2">
                  Exemplo REAL:
                </h4>
                <p className="text-sm text-gray-700">
                 Imagine um sistema de inventário que conta quantos produtos estão em estoque dentro de uma faixa de preço. Sua transação primeiro conta 5 itens, realiza alguns cálculos, e depois conta novamente. Enquanto isso, outra transação adiciona um novo produto nessa faixa de preço. Sua segunda contagem agora mostra 6 itens, criando um "fantasma" que não estava lá antes.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b border-gray-200">
                  <h4 className="font-medium text-gray-700">
                    Cenário de Leitura Fantasma
                  </h4>
                </div>
                <div className="p-4">
                  <div className="flex flex-col space-y-4">
                    <div className="flex space-x-6">
                      <div className="w-1/2">
                        <div className="text-center mb-2 font-medium text-blue-600">
                          Transação A
                        </div>
                        <div className="border border-blue-200 rounded-md bg-blue-50 p-3 text-sm space-y-2">
                          <div className="bg-white p-2 rounded border border-blue-100">
                            BEGIN TRANSACTION;
                          </div>
                          <div className="bg-white p-2 rounded border border-blue-100">
                            SELECT COUNT(*) FROM orders WHERE order_date =
                            '2023-06-15';
                            <span className="block text-xs text-gray-500 mt-1">
                              /* Saída de 10 Pedidos */
                            </span>
                          </div>
                          <div className="bg-white p-2 rounded border border-blue-100 opacity-50">
                            -- Processa a informação se baseando em 10 pedidos... 
                          </div>
                        </div>
                      </div>

                      <div className="w-1/2">
                        <div className="text-center mb-2 font-medium text-green-600">
                          Transaction B
                        </div>
                        <div className="border border-green-200 rounded-md bg-green-50 p-3 text-sm space-y-2">
                          <div className="bg-white p-2 rounded border border-green-100">
                            BEGIN TRANSACTION;
                          </div>
                          <div className="bg-white p-2 rounded border border-green-100">
                            INSERT INTO orders (order_id, customer_id,
                            order_date) VALUES (1001, 5, '2023-06-15');
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
                          SELECT COUNT(*) FROM orders WHERE order_date =
                          '2023-06-15';
                          <span className="block text-xs text-gray-500 mt-1">
                            /* Saída de 100 pedidos */
                          </span>
                        </div>
                        <div className="bg-white p-2 rounded border border-blue-100">
                          COMMIT;
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 p-3 rounded-md text-sm">
                      <p className="text-red-700">
                        <strong>Problema:</strong> A Transação A vê conjuntos de
                        resultados diferentes para a mesma consulta dentro da
                        mesma transação, o que pode levar a erros lógicos no
                        processamento.
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
        <h3 className="font-semibold text-lg mb-3">
          Prevenindo Problemas de Concorrência com Níveis de Isolamento
        </h3>
        <p className="text-gray-700 mb-4">
          Os sistemas de banco de dados fornecem diferentes níveis de isolamento
          de transações para prevenir esses problemas de concorrência, com
          compensações entre consistência e desempenho:
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-700">
                  Nível de Isolamento
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-700">
                  Leitura Suja
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-700">
                  Leitura Não Repetível
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-700">
                  Leitura Fantasma
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-medium">
                  READ UNCOMMITTED
                </td>
                <td className="px-4 py-3 text-sm text-red-600">Possível</td>
                <td className="px-4 py-3 text-sm text-red-600">Possível</td>
                <td className="px-4 py-3 text-sm text-red-600">Possível</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">
                  READ COMMITTED
                </td>
                <td className="px-4 py-3 text-sm text-green-600">Prevenido</td>
                <td className="px-4 py-3 text-sm text-red-600">Possível</td>
                <td className="px-4 py-3 text-sm text-red-600">Possível</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">
                  REPEATABLE READ
                </td>
                <td className="px-4 py-3 text-sm text-green-600">Prevenido</td>
                <td className="px-4 py-3 text-sm text-green-600">Prevenido</td>
                <td className="px-4 py-3 text-sm text-red-600">Possível</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">SERIALIZABLE</td>
                <td className="px-4 py-3 text-sm text-green-600">Prevenido</td>
                <td className="px-4 py-3 text-sm text-green-600">Prevenido</td>
                <td className="px-4 py-3 text-sm text-green-600">Prevenido</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 mt-4">
          Níveis de isolamento mais altos oferecem mais consistência, mas podem
          reduzir a concorrência e o desempenho. O nível apropriado depende dos
          requisitos da sua aplicação.
        </p>
      </div>
    </div>
  );
};
