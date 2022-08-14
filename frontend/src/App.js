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
import PayConfrim from './pages/user/PayConfirmPage';

// lectures
import LecturesPage from './pages/lecture/LecturesPage';
import LivePage from './pages/lecture/LivePage';
import VideoLecturePage from './pages/lecture/VideoLecturePage';
import LectureClassPage from './pages/lecture/LectureClassPage';
import LectureDetailpage from './pages/lecture/LectureDetailpage';
// snacks
import SnacksPage from './pages/snacks/SnacksPage';
import DetailSnacksPage from './pages/snacks/DetailSnacksPage';
import UploadPage from './pages/snacks/UploadPage';
// games
import MainPage from './pages/game/MainPage';
import GamesPage from './pages/game/GamesPage';
// admin
import AdminPage from './pages/admin/AdminPage';
import AdminInsProfile from './pages/admin/AdminInsProfile';
import AddLiveLecture from './pages/admin/AddLiveLecture';
import AddRecordLecture from './pages/admin/AddRecordLecture';
import DetailLectue from './pages/admin/DetailLectue';
import AddSection from './pages/admin/AddSection';
// notfount
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <div
      className="App"
      // onContextMenu={(e) => e.preventDefault()}
    >
      <Routes>
        {/* Index */}
        {/* <Route path="" element={<Layout />}> */}
        <Route path="" element={<IndexPage />} />
        {/* </Route> */}
        {/* accounts */}
        <Route path="accounts" element={<Layout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="profile/:nickName" element={<ProfilePage />} />
          <Route path="password" element={<FindPwPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="pay" element={<PayConfrim />} />
        </Route>
        {/* lectures */}
        <Route path="lectures" element={<Layout />}>
          <Route path="" element={<LecturesPage />} />
          <Route path=":lectureId" element={<LectureDetailpage />} />
          <Route path="class/:lectureId" element={<LectureClassPage />} />
        </Route>
        <Route
          path="lectures/:lectureId/section/:sectionIdx"
          element={<VideoLecturePage />}
        />
        <Route path="lectures/live" element={<LivePage />} />
        {/* snacks */}
        <Route path="snacks/" element={<Layout />}>
          <Route path="" element={<SnacksPage />} />
          <Route path=":snacksId" element={<DetailSnacksPage />} />
          <Route path="upload" element={<UploadPage />} />
        </Route>
        {/* games */}
        <Route path="games" element={<Layout />}>
          <Route path="" element={<MainPage />} />
        </Route>
        <Route path="game" element={<GamesPage />} />
        {/* admin */}
        <Route path="admin" element={<Layout />}>
          <Route path="" element={<AdminPage />} />
          <Route path="ins" element={<AdminInsProfile />} />
          <Route path="lecture/record" element={<AddRecordLecture />} />
          <Route path="lecture/live" element={<AddLiveLecture />} />
          <Route path=":lecId" element={<DetailLectue />} />
          <Route path="section/:lecId" element={<AddSection />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
