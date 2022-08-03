import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { fetchAccessToken } from './features/user/userActions';

// page
import Layout from './layout/Layout';
// user
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/user/LoginPage';
import LogoutPage from './pages/user/LogoutPage';
import SignUpPage from './pages/user/SignUpPage';
import ProfilePage from './pages/user/ProfilePage';

// lectures
import LecturesPage from './pages/lecture/LecturesPage';
import LivePage from './pages/lecture/LivePage';
// snacks
import SnacksPage from './pages/snacks/SnacksPage';
// games
import GamesPage from './pages/game/GamesPage';
// admin
import AdminPage from './pages/admin/AdminPage';
// notfount
import NotFound from './pages/NotFound';
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    const userInfo = localStorage.getItem('userInfo');
    if (refreshToken && userInfo) {
      dispatch(fetchAccessToken({ refreshToken, userInfo }));
    }
  }, []);
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
          <Route path="profile" element={<ProfilePage />} />
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
        {/* admin */}
        <Route path="admin" element={<Layout />}>
          <Route path="" element={<AdminPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
