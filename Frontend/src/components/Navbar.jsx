import React from 'react'

function Navbar({ activePage, setActivePage }) {
  const navLinks = [
    { name: 'Home', page: 'landing' },
    { name: 'My Tasks', page: 'todo' },
    { name: 'Services', page: 'auth' },
    { name: 'Contact', page: 'contact' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="#" className="logo" onClick={() => setActivePage('landing')}>
          TODO App
        </a>
        <div className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.page}
              href="#"
              className={`nav-link ${activePage === link.page ? 'active' : ''}`}
              onClick={() => setActivePage(link.page)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;