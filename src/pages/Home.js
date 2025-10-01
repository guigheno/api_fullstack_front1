import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h1>Bem-vindo ao Sistema E-commerce</h1>
      <p>Gerencie produtos e usuários do seu sistema</p>
      
      <div className="home-links">
        <Link to="/products" className="btn btn-primary">
          Gerenciar Produtos
        </Link>
        <Link to="/users" className="btn btn-secondary">
          Gerenciar Usuários
        </Link>
      </div>
    </div>
  );
}

export default Home;