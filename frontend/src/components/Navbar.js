import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import useAxiosInterceptor from "../api/axiosInterceptor";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false); // For burger menu
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const axiosJWT = useAxiosInterceptor();

  const handleLogout = async () => {
    try {
      await axiosJWT.delete("/logout");
      setAuth(null);
      navigate("/login");
    } catch (error) {
      console.log("Error logging out:", error);
      setAuth(null);
      navigate("/login");
    }
  };

  return (
    <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/users" className="navbar-item has-text-weight-bold">
          Employee Management
        </Link>

        <a
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded={isActive ? "true" : "false"}
          data-target="navbarBasicExample"
          onClick={() => setIsActive(!isActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-start">
          <Link className="navbar-item" to="/users">
            <span className="icon"><i className="fas fa-users"></i></span>
            <span>Semua Karyawan</span>
          </Link>

          <Link className="navbar-item" to="/users/by-creator">
            <span className="icon"><i className="fas fa-user-friends"></i></span>
            <span>Karyawan Saya</span>
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              <span className="icon"><i className="fas fa-cog"></i></span>
              <span>Edit Manajemen</span>
            </a>
            <div className="navbar-dropdown is-boxed">
              <Link className="navbar-item" to="/departments">
                <span className="icon"><i className="fas fa-building"></i></span>
                <span>Departemen</span>
              </Link>
              <Link className="navbar-item" to="/positions">
                <span className="icon"><i className="fas fa-briefcase"></i></span>
                <span>Posisi</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {/* User photo will be added here later */}
              {auth?.username && (
                <span className="button is-static is-small">
                  <span className="icon is-small"><i className="fas fa-user"></i></span>
                  <span>{auth.username}</span>
                </span>
              )}
              <button
                className="button is-danger is-small"
                onClick={handleLogout}
                title="Logout"
              >
                <span className="icon is-small"><i className="fas fa-sign-out-alt"></i></span>
                {/* Text can be re-added if icon-only is not desired for navbar logout */}
                {/* <span>Logout</span> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 