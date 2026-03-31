import { HashRouter, Routes, Route } from 'react-router';
import { CardProvider } from './context/CardContext';
import { Layout } from './components/layout/Layout';
import { PracticePage } from './pages/PracticePage';
import { CardListPage } from './pages/CardListPage';
import { ConjugatePage } from './pages/ConjugatePage';
import { TypeQuizPage } from './pages/TypeQuizPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <CardProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<PracticePage />} />
            <Route path="conjugate" element={<ConjugatePage />} />
            <Route path="type-quiz" element={<TypeQuizPage />} />
            <Route path="cards" element={<CardListPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </CardProvider>
  );
}

export default App;
