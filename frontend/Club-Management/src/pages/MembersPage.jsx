import { useEffect, useMemo, useState } from 'react';
import { createMember, deleteMember, getMembers, updateMember } from '../services/api';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  role: 'member',
  skills: '',
  joinDate: '',
};

const formatDate = (dateValue) => {
  if (!dateValue) return '—';

  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) return '—';

  return parsedDate.toLocaleDateString();
};

const normalizeMemberPayload = (formState) => ({
  name: formState.name.trim(),
  email: formState.email.trim(),
  phone: formState.phone.trim(),
  role: formState.role,
  skills: formState.skills
    .split(',')
    .map((skill) => skill.trim())
    .filter(Boolean),
  ...(formState.joinDate ? { joinDate: formState.joinDate } : {}),
});

const MembersPage = () => {
  const authUser = useMemo(() => {
    const savedUser = localStorage.getItem('club_user');
    return savedUser ? JSON.parse(savedUser) : null;
  }, []);

  const isAdmin = authUser?.role === 'admin';
  const token = authUser?.token;

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const loadMembers = async () => {
    if (!token) {
      setError('You must be logged in to view members.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await getMembers(token);
      setMembers(data);
    } catch (apiError) {
      setError(apiError.message || 'Failed to load members.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setFormError('');
  };

  const startEdit = (member) => {
    setEditingId(member._id);
    setForm({
      name: member.name || '',
      email: member.email || '',
      phone: member.phone || '',
      role: member.role || 'member',
      skills: Array.isArray(member.skills) ? member.skills.join(', ') : '',
      joinDate: member.joinDate ? String(member.joinDate).slice(0, 10) : '',
    });
    setFormError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isAdmin || !token) return;

    setSubmitting(true);
    setFormError('');

    const payload = normalizeMemberPayload(form);

    try {
      if (editingId) {
        await updateMember(token, editingId, payload);
      } else {
        await createMember(token, payload);
      }

      await loadMembers();
      resetForm();
    } catch (apiError) {
      setFormError(apiError.message || 'Failed to save member.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (member) => {
    if (!isAdmin || !token) return;

    const confirmed = window.confirm(`Delete ${member.name}? This action cannot be undone.`);
    if (!confirmed) return;

    setError('');

    try {
      await deleteMember(token, member._id);
      setMembers((prev) => prev.filter((item) => item._id !== member._id));

      if (editingId === member._id) {
        resetForm();
      }
    } catch (apiError) {
      setError(apiError.message || 'Failed to delete member.');
    }
  };

  return (
    <section>
      <h2>Members</h2>
      <p>Manage member profiles, skills, and roles.</p>

      {loading ? <p>Loading members...</p> : null}
      {error ? <p style={{ color: 'crimson' }}>{error}</p> : null}

      {!loading ? (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '1rem' }}>
            <thead>
              <tr>
                {['Name', 'Email', 'Phone', 'Role', 'Skills', 'Joined Date', isAdmin ? 'Actions' : null]
                  .filter(Boolean)
                  .map((column) => (
                    <th key={column} style={{ borderBottom: '1px solid #ccc', padding: '0.5rem', textAlign: 'left' }}>
                      {column}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {members.length ? (
                members.map((member) => (
                  <tr key={member._id}>
                    <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>{member.name}</td>
                    <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>{member.email}</td>
                    <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>{member.phone || '—'}</td>
                    <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem', textTransform: 'capitalize' }}>
                      {member.role}
                    </td>
                    <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>
                      {Array.isArray(member.skills) && member.skills.length ? member.skills.join(', ') : '—'}
                    </td>
                    <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>{formatDate(member.joinDate)}</td>
                    {isAdmin ? (
                      <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button type="button" onClick={() => startEdit(member)}>
                            Edit
                          </button>
                          <button type="button" onClick={() => handleDelete(member)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    ) : null}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={isAdmin ? 7 : 6} style={{ padding: '0.75rem' }}>
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : null}

      {isAdmin ? (
        <section style={{ marginTop: '1.5rem' }}>
          <h3>{editingId ? 'Edit member' : 'Add member'}</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem', maxWidth: 480 }}>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="member">Member</option>
              <option value="volunteer">Volunteer</option>
              <option value="admin">Admin</option>
            </select>
            <input
              name="skills"
              placeholder="Skills (comma-separated)"
              value={form.skills}
              onChange={handleChange}
            />
            <input name="joinDate" type="date" value={form.joinDate} onChange={handleChange} />

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : editingId ? 'Update Member' : 'Create Member'}
              </button>
              {editingId ? (
                <button type="button" onClick={resetForm}>
                  Cancel Edit
                </button>
              ) : null}
            </div>
          </form>
          {formError ? <p style={{ color: 'crimson' }}>{formError}</p> : null}
        </section>
      ) : (
        <p style={{ marginTop: '1rem' }}>Only admins can create, edit, or delete members.</p>
      )}
    </section>
  );
};

export default MembersPage;