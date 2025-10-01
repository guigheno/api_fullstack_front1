import React from 'react';

function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p>Nenhum produto cadastrado.</p>;
  }

  return (
    <div className="product-list">
      <h2>Lista de Produtos</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Valor (R$)</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.nome}</td>
              <td>R$ {product.valor.toFixed(2)}</td>
              <td>{product.quantidade}</td>
              <td>
                <button 
                  className="btn btn-warning"
                  onClick={() => onEdit(product)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => onDelete(product.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;