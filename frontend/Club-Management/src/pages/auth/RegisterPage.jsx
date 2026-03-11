import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api';

const RegisterPage = ({ onRegister }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'member' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await registerUser(form);
      onRegister(user);
      navigate('/');
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem', maxWidth: 360 }}>
        <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="member">Member</option>
          <option value="volunteer">Volunteer</option>
        </select>
        <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
      </form>
      {error ? <p style={{ color: 'crimson' }}>{error}</p> : null}
      <p>
        Already registered? <Link to="/login">Login</Link>
      </p>
    </section>
  );
};

export default RegisterPage;