import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { Card, CardHeader, CardContent, Button, Input, Spinner } from '../components/ui';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <Card>
          <CardHeader>
            <h1 className="h4 mb-0 text-center">Login to your account</h1>
          </CardHeader>
          <CardContent>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <div className="d-grid">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Spinner className="me-2" style={{width: '1rem', height: '1rem'}} /> : null}
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
          <div className="card-footer text-center">
             <p className="mb-0">
                Don't have an account? <Link to="/register">Sign up</Link>
             </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;