import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { LinkIcon } from './ui';
import AboutModal from './AboutModal';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center fs-4 fw-bold text-primary"
        >
          <LinkIcon className="me-2" style={{ width: '2rem', height: '2rem' }} />
          <span>Lolu's</span>
        </Link>

        <nav className="d-flex align-items-center gap-2">
          {user ? (
            <div className="d-flex align-items-center gap-2">
              <span className="navbar-text">{user.email}</span>

              {/* Botón Acerca a la derecha del email */}
              <button
                type="button"
                className="btn btn-outline-success btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#aboutModal"
                title="Acerca del proyecto"
              >
                Acerca
              </button>

              <button
                onClick={logout}
                className="btn btn-outline-primary btn-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <Link to="/login" className="btn btn-primary btn-sm">
                Login
              </Link>

              {/* También visible aunque no haya login */}
              <button
                type="button"
                className="btn btn-outline-success btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#aboutModal"
                title="Acerca del proyecto"
              >
                Acerca
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* Modal montado fuera del flujo */}
      <AboutModal />
    </header>
  );
};

export default Navbar;
