import React from 'react';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { TransactionsPage } from './pages/TransactionsPage';
import { AcidPage } from './pages/AcidPage';
import { ConcurrencyPage } from './pages/ConcurrencyPage';
import { DeadlockPage } from './pages/DeadlockPage';
import { QuizPage } from './pages/QuizPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/acid" element={<AcidPage />} />
          <Route path="/concurrency" element={<ConcurrencyPage />} />
          <Route path="/deadlock" element={<DeadlockPage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;