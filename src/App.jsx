import { Routes, Route } from 'react-router-dom';
import ConfigPage from './pages/ConfigPage';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import SuccessPage from './pages/SuccessPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/config" element={<ConfigPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
