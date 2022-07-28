import { Route, Routes } from 'react-router-dom';
import './App.css';

// page
import Layout from './layout/Layout';
// accounts
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/accounts/LoginPage';
import LogoutPage from './pages/accounts/LogoutPage';
import SignUpPage from './pages/accounts/SignUpPage';
// lectures
import LecturesPage from './pages/lectures/LecturesPage';
import LivePage from './pages/lectures/LivePage';
// snacks
import SnacksPage from './pages/snacks/SnacksPage';
// games
import GamesPage from './pages/games/GamesPage';
// notfount
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <div className="App">
      <Routes>
        {/* Index */}
        <Route path="" element={<Layout />}>
          <Route path="" element={<IndexPage />} />
        </Route>
        {/* accounts */}
        <Route path="accounts" element={<Layout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="profile" element={<LoginPage />} />
        </Route>
        {/* lectures */}
        <Route path="lectures" element={<Layout />}>
          <Route path="" element={<LecturesPage />} />
          <Route path="live" element={<LivePage />} />
        </Route>
        {/* snacks */}
        <Route path="snacks" element={<Layout />}>
          <Route path="" element={<SnacksPage />} />
        </Route>
        {/* games */}
        <Route path="games" element={<Layout />}>
          <Route path="" element={<GamesPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
