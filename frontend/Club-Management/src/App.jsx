import { Link, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import MembersPage from './pages/MembersPage';
import EventsPage from './pages/EventsPage';
import VolunteerPage from './pages/VolunteerPage.jsx';

const App = () => {
  return (
    <div style={{ fontFamily: 'sans-serif', margin: '2rem auto', maxWidth: 960 }}>
      <h1>Club Management</h1>
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <Link to="/">Dashboard</Link>
        <Link to="/members">Members</Link>
        <Link to="/events">Events</Link>
        <Link to="/volunteer">Volunteer</Link>
      </nav>

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
      </Routes>
    </div>
  );
};

export default App;