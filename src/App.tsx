import { HashRouter, Routes, Route } from 'react-router';
import { CardProvider } from './context/CardContext';
import { Layout } from './components/layout/Layout';
import { PracticePage } from './pages/PracticePage';
import { CardListPage } from './pages/CardListPage';

function App() {
  return (
    <CardProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<PracticePage />} />
            <Route path="cards" element={<CardListPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </CardProvider>
  );
}

export default App;
