import { Global } from '@emotion/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './components/ui/Layout';
import { GlobalStyles } from './styles/theme';

// Import pages
import Dashboard from './pages/Dashboard';
import Quests from './pages/Quests';
import Categories from './pages/Categories';
import Stats from './pages/Stats';
import Settings from './pages/Settings';
import { CalendarPage } from './pages/Calendar';

function App() {
  return (
    <Router>
      <Global styles={GlobalStyles} />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/quests" element={<Quests />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  );
}

export default App;
