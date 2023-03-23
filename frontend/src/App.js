import { Route, Routes } from 'react-router-dom';
import Root from './pages/root';
import 'antd/dist/reset.css';
import Layout from './pages/layout';
import DetailArticle from './pages/detail-article';
import AddNewArticlePost from './pages/add-new-article';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Root />} />
        <Route path="article/create" element={<AddNewArticlePost />} />
        <Route path="article/:id" element={<DetailArticle />} />
        <Route path="*" element={<div>not found page</div>} />
      </Route>
    </Routes>
  );
}

export default App;
