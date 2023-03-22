import { Route, Routes } from 'react-router-dom';
import Root from './pages/root';
import 'antd/dist/reset.css';
import Layout from './pages/layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Root />} />
        <Route path="about" element={<div>this about element comp</div>} />
        <Route path="*" element={<div>not found page</div>} />
      </Route>
    </Routes>
  );
}

export default App;
