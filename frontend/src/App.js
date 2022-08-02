import { Route, Routes } from 'react-router-dom';
import './App.css';

// page
import Layout from './layout/Layout';
// user
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/user/LoginPage';
import LogoutPage from './pages/user/LogoutPage';
import SignUpPage from './pages/user/SignUpPage';
import ProfilePage from './pages/user/ProfilePage';
import MyListPage from './pages/user/MyListPage';
import ChangeProfilePage from './pages/user/ChangeProfilePage';
import PasswordPage from './pages/user/PasswordPage';

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
          <Route path="mylist" element={<MyListPage />} />
          <Route path="change" element={<ChangeProfilePage />} />
          <Route path="password" element={<PasswordPage />} />
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
