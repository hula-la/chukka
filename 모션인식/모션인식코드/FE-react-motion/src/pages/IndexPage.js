import { Outlet } from 'react-router-dom';

const IndexPage = () => {
  return (
    <div>
      <h1>IndexPage</h1>
      <Outlet />
    </div>
  );
};

export default IndexPage;
