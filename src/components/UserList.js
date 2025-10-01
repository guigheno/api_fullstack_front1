import React from 'react';

function UserList({ users, onEdit, onDelete }) {
  if (users.length === 0) {
    return <p>Nenhum usuário cadastrado.</p>;
  }

  return (
    <div className="user-list">
      <h2>Lista de Usuários</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nome}</td>
              <td>{user.tipo}</td>
              <td>
                <button 
                  className="btn btn-warning"
                  onClick={() => onEdit(user)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => onDelete(user.id)}
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

export default UserList;