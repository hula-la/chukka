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
import FindPwPage from './pages/user/FindPwPage';
import CartPage from './pages/user/CartPage';
import PayConfirmPage from './pages/user/PayConfirmPage';

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
import LectureDetailpage from './pages/lecture/LectureDetailpage';

import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
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
          <Route path="profile/:nickName" element={<ProfilePage />} />
          <Route path="password" element={<FindPwPage />} />
          <Route path="profile/:nickname" element={<ProfilePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="pay" element={<PayConfirmPage />} />
        </Route>
        {/* lectures */}
        <Route path="lectures" element={<Layout />}>
          <Route path="" element={<LecturesPage />} />
          <Route path=":lectureId" element={<LectureDetailpage />} />
        </Route>
        <Route
          path="lectures/live"
          element={
            <LivePage
              navigate={() => {
                navigate(-1);
              }}
            />
          }
        />
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
