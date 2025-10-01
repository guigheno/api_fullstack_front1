import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">E-commerce</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Produtos</Link></li>
        <li><Link to="/users">Usuários</Link></li>
        <li><Link to="/about">Sobre</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;