import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Create from './pages/Create';
import ReadAll from './pages/ReadAll';
import Retrieve from './pages/Retrieve';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="all" element={<ReadAll />} />
          <Route path="one" element={<Retrieve />} />
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
