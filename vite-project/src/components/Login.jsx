import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [currentError, setCurrentError] = useState('');
  const { loginUser, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) {
      setCurrentError('Email is required!');
    } else if (!formData.password) {
      setCurrentError('Password is required!');
    } else {
      setCurrentError('');
      loginUser(formData.email, formData.password, navigate, location);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Login</h2>
      {currentError && <p className="text-danger">{currentError}</p>}
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="mt-3">
        Don{"'"}t have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
