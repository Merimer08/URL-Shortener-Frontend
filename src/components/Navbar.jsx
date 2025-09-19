import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { LinkIcon } from './ui';

const Navbar = () => {
  const { token, logout, user } = useAuth();

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center fs-4 fw-bold text-primary">
            <LinkIcon className="me-2" style={{width: '2rem', height: '2rem'}}/>
            <span>Shorty</span>
        </Link>
        <nav>
          {token ? (
            <div className="d-flex align-items-center">
              <span className="navbar-text me-3">{user?.email}</span>
              <button onClick={logout} className="btn btn-outline-primary btn-sm">Logout</button>
            </div>
          ) : (
             <span className="navbar-text">Please log in</span>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;