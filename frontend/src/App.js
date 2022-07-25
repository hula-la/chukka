import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
    </Routes>
  );
};

export default App;
