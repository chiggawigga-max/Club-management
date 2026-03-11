import { useMemo, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import MembersPage from './pages/MembersPage';
import EventsPage from './pages/EventsPage';
import VolunteerPage from './pages/VolunteerPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

const App = () => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('club_user');
    return saved ? JSON.parse(saved) : null;
  });

  const saveUser = (authUser) => {
    localStorage.setItem('club_user', JSON.stringify(authUser));
    setUser(authUser);
  };

  const logout = () => {
    localStorage.removeItem('club_user');
    setUser(null);
  };

  const navLinks = useMemo(
    () => [
      { label: 'Dashboard', path: '/' },
      { label: 'Members', path: '/members' },
      { label: 'Events', path: '/events' },
      { label: 'Volunteer', path: '/volunteer' },
    ],
    []
  );

  return (
    <div style={{ fontFamily: 'sans-serif', margin: '2rem auto', maxWidth: 960 }}>
      <h1>Club Management</h1>
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {user?.token
          ? navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                {link.label}
              </Link>
            ))
          : null}

        {!user?.token ? <Link to="/login">Login</Link> : null}
        {!user?.token ? <Link to="/register">Register</Link> : null}
        {user?.token ? <button onClick={logout}>Logout</button> : null}
      </nav>

      {user?.token ? <p>Welcome, {user.name} ({user.role})</p> : <p>Please login to access dashboard pages.</p>}

      <Routes>
        <Route path="/login" element={<LoginPage onLogin={saveUser} />} />
        <Route path="/register" element={<RegisterPage onRegister={saveUser} />} />

        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;