import './App.scss';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { TeamPage } from './page/TeamPage';
import { MatchPage } from './page/MatchPage';
import { HomePage } from './page/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/team/:teamName" element={<TeamPage />} />
          <Route path="/team/:teamName/matches/:year" element={<MatchPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<HomePage />} /> {/* Wildcard route */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
