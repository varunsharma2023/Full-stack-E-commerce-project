import React from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check if the user is logged in based on your authentication logic
  const isLoggedIn = !!localStorage.getItem('token'); // Modify this to fit your authentication logic

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGIN_ERROR' });
    Swal.fire({
      icon: 'success',
      title: 'You have been successfully Logged Out',
    });
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Sales App
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  exact
                  to="/Addsale"
                  className="nav-link"
                  activeClassName="active"
                >
                  Add Sales
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  exact
                  to="/todays_revenue"
                  className="nav-link"
                  activeClassName="active"
                >
                  Today's Total Revenue
                </NavLink>
              </li>

              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/top5sales"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Top five Sales
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() => logOut()}>
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/login"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Login
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/register"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
