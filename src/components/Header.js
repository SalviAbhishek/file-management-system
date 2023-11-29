import React from "react";

const Header = ({ name, logout }) => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            Welcome {name}
          </a>

          <button className="btn btn-outline-light" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};
export default Header;
