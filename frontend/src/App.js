import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<div>this index element comp</div>} />
        <Route path="about" element={<div>this about element comp</div>} />
        <Route path="*" element={<div>not found page</div>} />
      </Route>
    </Routes>
  );
}

export default App;
