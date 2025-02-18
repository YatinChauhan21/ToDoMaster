import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch  } from 'react-redux';
import { authActions } from '../store';
import Logo from '../assets/logo.png';
function Navbar() {
  // const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);  // ✅ Correct state access
  console.log(isLoggedIn)
  const dispatch = useDispatch();
  const logout =() =>{
    sessionStorage.clear('id')
    dispatch(authActions.logout());
  }
  return (
    <div className="container sticky-top">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
  <img src={Logo} alt="ToDo Logo" className="logo" style={{ maxHeight: '40px' }} />
  
</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/about">About</Link>
              </li>
            
          {/* <button
            className="btn btn-primary"
            onClick={() => navigate("/todo")}
          >
            ToDo
          </button> */}
        
              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="btn btn-dark m-1" to="/Signup">Signup</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-dark m-1" to="/login">Login</Link>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <li className="nav-item" onClick={logout}>
                  <button className="btn btn-dark m-1">Log Out</button>
                  
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
