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
                ? "bg-purple-50 text-purple-600 border-b-2 border-purple-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("dirty-read")}
          >
            Leitura Suja
          </button>
          <button
            className={`flex-1 py-3 px-4 font-medium text-sm ${
              activeTab === "non-repeatable"
                ? "bg-purple-50 text-purple-600 border-b-2 border-purple-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("non-repeatable")}
          >
            Leitura Não Repetida
          </button>
          <button
            className={`flex-1 py-3 px-4 font-medium text-sm ${
              activeTab === "phantom"
                ? "bg-purple-50 text-purple-600 border-b-2 border-purple-600"
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
                    Uma leitura suja ocorre quando uma transação lê dados que
                    foram modificados por outra transação, mas ainda não foram
                    confirmados.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-md">
                <h4 className="font-medium text-amber-700 mb-2">Exemplo REAL:</h4>
                <p className="text-sm text-gray-700">
                  Imagine que você está verificando o saldo da sua conta
                  bancária enquanto um depósito está sendo processado. Você vê
                  o novo saldo mais alto, mas a transação de depósito falha e
                  é desfeita. Você acabou de experimentar uma “leitura suja” de
                  dados que nunca foram realmente confirmados.
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
                        <div className="text-center mb-2 font-medium text-purple-600">
                          Transação A
                        </div>
                        <div className="border border-purple-200 rounded-md bg-purple-50 p-3 text-sm space-y-2">
                          <div className="bg-white p-2 rounded border border-purple-100">
                            BEGIN TRANSACTION;
                          </div>
                          <div className="bg-white p-2 rounded border border-purple-100">
                            UPDATE accounts SET balance = balance - 100 WHERE id
                            = 1;
                            <span className="block text-xs text-gray-500 mt-1">
                              {/* Saldo da conta agora é $900 */}
                            </span>
                          </div>
                          <div className="bg-white p-2 rounded border border-purple-100 opacity-50">
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
                              {/* Lê $900 (Info suja) */}
                            </span>
                          </div>
                          <div className="bg-white p-2 rounded border border-green-100">
                            COMMIT;
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-1/2">
                      <div className="border border-purple-200 rounded-md bg-purple-50 p-3 text-sm space-y-2">
                        <div className="bg-white p-2 rounded border border-purple-100">
                          ROLLBACK; -- Transação A falha e da ROLLBACK
                          <span className="block text-xs text-gray-500 mt-1">
                            {/* Saldo da conta é revertido $1000 */}
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
                  <h3 className="font-semibold text-lg mb-1">Leitura Não Repetida</h3>
                  <p className="text-gray-700">
                    Uma leitura não repetível ocorre quando uma transação lê a
                    mesma linha duas vezes e obtém valores diferentes porque
                    outra transação confirmada modificou os dados entre as
                    leituras.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-md">
                <h4 className="font-medium text-amber-700 mb-2">Exemplo REAL:</h4>
                <p className="text-sm text-gray-700">
                  Imagine que você está gerando um relatório que lê os dados do
                  mesmo cliente duas vezes. Entre essas leituras, outro usuário
                  atualiza as informações do cliente. Seu relatório agora
                  contém dados inconsistentes, mostrando valores diferentes para
                  o mesmo cliente.
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
                        <div className="text-center mb-2 font-medium text-purple-600">
                          Transação A
                        </div>
                        <div className="border border-purple-200 rounded-md bg-purple-50 p-3 text-sm space-y-2">
                          <div className="bg-white p-2 rounded border border-purple-100">
                            BEGIN TRANSACTION;
                          </div>
                          <div className="bg-white p-2 rounded border border-purple-100">
                            SELECT price FROM products WHERE id = 101;
                            <span className="block text-xs text-gray-500 mt-1">
                              {/* Lê o preço: $10.00 */}
                            </span>
                          </div>
                          <div className="bg-white p-2 rounded border border-purple-100 opacity-50">
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

                    <div className="flex space-x-6">
                      <div className="w-1/2">
                        <div className="border border-purple-200 rounded-md bg-purple-50 p-3 text-sm space-y-2">
                          <div className="bg-white p-2 rounded border border-purple-100">
                            SELECT price FROM products WHERE id = 101;
                            <span className="block text-xs text-gray-500 mt-1">
                              {/* Lê o preço: $12.00 */}
                            </span>
                          </div>
                          <div className="bg-white p-2 rounded border border-purple-100">
                            COMMIT;
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 p-3 rounded-md text-sm">
                      <p className="text-red-700">
                        <strong>Problema:</strong> Transação A viu dois valores
                        diferentes para o preço do produto na mesma
                        transação.
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
                  <h3 className="font-semibold text-lg mb-1">Leitura Fantasma</h3>
                  <p className="text-gray-700">
                    Uma leitura fantasma ocorre quando uma transação executa uma
                    consulta que retorna um conjunto de linhas que muda porque
                    outra transação insere ou remove linhas durante a execução
                    da primeira.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-md">
                <h4 className="font-medium text-amber-700 mb-2">Exemplo REAL:</h4>
                <p className="text-sm text-gray-700">
                  Imagine um sistema que gera relatórios baseados em condições,
                  por exemplo, “clientes que gastaram mais de $100”. Durante a
                  geração do relatório, outro usuário insere um novo cliente
                  que atende a esse critério. Se a transação de geração não
                  estiver isolada, o relatório pode incluir ou omitir linhas
                  inesperadamente.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b border-gray-200">
                  <h4 className="font-medium text-gray-700">Cenário Fantasma</h4>
                </div>
                <div className="p-4">
                  <div className="flex flex-col space-y-4">
                    <div className="flex space-x-6">
                      <div className="w-1/2">
                        <div className="text-center mb-2 font-medium text-purple-600">
                          Transação A
                        </div>
                        <div className="border border-purple-200 rounded-md bg-purple-50 p-3 text-sm space-y-2">
                          <div className="bg-white p-2 rounded border border-purple-100">
                            BEGIN TRANSACTION;
                          </div>
                          <div className="bg-white p-2 rounded border border-purple-100">
                            SELECT * FROM orders WHERE total &gt; 100;
                            <span className="block text-xs text-gray-500 mt-1">
                              {/* Retorna 5 pedidos */}
                            </span>
                          </div>
                          <div className="bg-white p-2 rounded border border-purple-100 opacity-50">
                            -- Processando ...
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
                            INSERT INTO orders (customer_id, total) VALUES (10, 150);
                          </div>
                          <div className="bg-white p-2 rounded border border-green-100">
                            COMMIT;
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-6">
                      <div className="w-1/2">
                        <div className="border border-purple-200 rounded-md bg-purple-50 p-3 text-sm space-y-2">
                          <div className="bg-white p-2 rounded border border-purple-100">
                            SELECT * FROM orders WHERE total &gt; 100;
                            <span className="block text-xs text-gray-500 mt-1">
                              {/* Retorna 6 pedidos */}
                            </span>
                          </div>
                          <div className="bg-white p-2 rounded border border-purple-100">
                            COMMIT;
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 p-3 rounded-md text-sm">
                      <p className="text-red-700">
                        <strong>Problema:</strong> A Transação A viu um “fantasma”
                        — uma linha que apareceu inesperadamente entre as consultas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-purple-50 p-5 rounded-lg">
        <h3 className="font-semibold text-lg mb-3">
          Prevenindo Problemas de Concorrência com Níveis de Isolamento
        </h3>
        <p className="text-gray-700 mb-4">
          Os bancos de dados oferecem diferentes níveis de isolamento para controlar como e quando as alterações feitas por uma transação são visíveis para outras. Esses níveis ajudam a prevenir os problemas de concorrência acima.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-purple-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-purple-700">
                  Nível de Isolamento
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-purple-700">
                  Leitura Suja
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-purple-700">
                  Leitura Não Repetível
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-purple-700">
                  Leitura Fantasma
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                  Read Uncommitted
                </td>
                <td className="px-4 py-3 text-center text-red-600 font-semibold">
                  ✔️
                </td>
                <td className="px-4 py-3 text-center text-red-600 font-semibold">
                  ✔️
                </td>
                <td className="px-4 py-3 text-center text-red-600 font-semibold">
                  ✔️
                </td>
              </tr>
              <tr className="border-t border-gray-200 bg-purple-50">
                <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                  Read Committed
                </td>
                <td className="px-4 py-3 text-center text-green-600 font-semibold">
                  ❌
                </td>
                <td className="px-4 py-3 text-center text-red-600 font-semibold">
                  ✔️
                </td>
                <td className="px-4 py-3 text-center text-red-600 font-semibold">
                  ✔️
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                  Repeatable Read
                </td>
                <td className="px-4 py-3 text-center text-green-600 font-semibold">
                  ❌
                </td>
                <td className="px-4 py-3 text-center text-green-600 font-semibold">
                  ❌
                </td>
                <td className="px-4 py-3 text-center text-red-600 font-semibold">
                  ✔️
                </td>
              </tr>
              <tr className="border-t border-gray-200 bg-purple-50">
                <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                  Serializable
                </td>
                <td className="px-4 py-3 text-center text-green-600 font-semibold">
                  ❌
                </td>
                <td className="px-4 py-3 text-center text-green-600 font-semibold">
                  ❌
                </td>
                <td className="px-4 py-3 text-center text-green-600 font-semibold">
                  ❌
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
